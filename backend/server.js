const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io  = require('socket.io')(httpServer,{
    cors: {
        
        origin:'*',
        methods: ['GET','POST'],
    }
});

const ChatModel = require('./Model/ChatModel');

const botName = 'ADMIN';

app.get('/',(req,res) =>
{
    res.send('From Server');
});

app.get('/getHistory', async(req,res)=>
{
    let data =  await ChatModel.find(req.body);
    res.send(data);
});

//#region ChatSystem
io.on('connection',(socket)=>
{
    console.log('User Connected',socket.id);

    socket.on('disconnect',()=>
    {
        console.log('User Disconnected',socket.id);
    });

    socket.on('leave',(userObject)=>
    {
        socket.leave();
        userObject.userMsg = `User [${userObject.userName}] left room [${userObject.roomName}]`;
        userObject.userName = botName;
        // console.log('UserObject On Leave', userObject);
        io.to(userObject.roomName).emit('msgFromServer',userObject);
        // console.log(`${userObject.userName} Left Room Name :${userObject.roomName}`);
    });

    socket.on('join',(userObject)=>
    {
        socket.join(userObject.roomName);
        let returningObject= {

            userName:botName,
            roomName: userObject.roomName,
            userMsg: `[${userObject.userName}] Joined Room ${userObject.roomName}`
        };
      io.to(userObject.roomName).emit('msgFromServer',returningObject);
        console.log(socket.id + " Joined UserObject:",userObject);
    });

    socket.on('msgFromUser', async (userName,roomName,usermsg,msgTime,sessionId)=>
    {
        console.log('Time Type ',typeof msgTime);
        let chatObject = {
            userName:userName,
            roomName: roomName,
            userMsg: usermsg,
            msgTime: msgTime,
            sessionId:sessionId,
        }
        io.to(roomName).emit('msgFromServer',chatObject);

        let model = new ChatModel(
            {
                roomName:roomName,
                chatObject:{
                    userName:userName,
                    userMsg: usermsg,
                    msgTime: msgTime,
                    sessionId:sessionId,        
                },
            }
        );
        
        let data = await model.save();
       
        console.log('date:',data);
        // console.log(`User ${userName} in Room Name: ${roomName} Chat Is: ${usermsg} and time is ${msgTime}`);
    });


});
//#endregion


httpServer.listen(5500,()=>
{
    console.log('Server is Up and Running on Port 5500');
});