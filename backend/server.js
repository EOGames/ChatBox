const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);

const botName = 'ADMIN';
const corsOptions = {
    
    origin:'*',
    methods: ['GET','POST'],
  };


const io  = require('socket.io')(httpServer,{
    cors: corsOptions
});
// const cors = require('cors');


// app.use(cors(corsOptions));
app.get('/',(req,res) =>
{
    res.send('From Server');
});


io.on('connection',(socket)=>
{
    console.log('User Connected',socket.id);

    socket.on('disconnect',()=>
    {
        console.log('User Disconnected',socket.id);
    });

    socket.on('leave',(userObject)=>
    {
        socket.leave
        io.to(userObject.roomName).emit('msgFromServer',`${botName} User ${userObject.userName}left room ${userObject.roomName}`);
        console.log(`${userObject.userName} Left Room Name :${userObject.roomName}`);
    });

    socket.on('join',(userObject)=>
    {
        socket.join(userObject.roomName);
        let returningObject= {

            userName:botName,
            roomName: userObject.roomName,
            usermsg: `[${userObject.userName}] Joined Room ${userObject.roomName}`
        };
      io.to(userObject.roomName).emit('msgFromServer',returningObject);
        console.log(socket.id + " Joined UserObject:",userObject);
    });

    socket.on('msgFromUser',(userName,roomName,usermsg)=>
    {
        let chatObject = {
            userName:userName,
            roomName: roomName,
            usermsg: usermsg
        }
        io.to(roomName).emit('msgFromServer',chatObject);
        console.log(`User ${userName} in Room Name: ${roomName} Chat Is: ${usermsg}`);
    });


});

httpServer.listen(5500,()=>
{
    console.log('Server is Up and Running on Port 5500');
});