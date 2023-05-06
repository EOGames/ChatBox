import { useState } from "react";
import ChatBox from "./ChatBox";

const Middlebox = ({ socket }) => {
    const [joinedChat, setJoinedChat] = useState(false);
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');


    socket.on('chatReceived', (chat) => {
        console.log('chat Received', chat);
    });

    // socket.off('msgFromServer').on('msgFromServer', (userObject) => {
    //     console.log(`Server MSG: ${userObject.userName}:${userObject.usermsg}`);
    // });

    const handleToggle = () => {
        if (joinedChat) {
            let userObject = {
                userName: userName,
                roomName: roomName
            }
            socket.emit('leave', userObject);
            setJoinedChat(false);
        }
         else
         {
            socket.on('connect', () => 
            {
                console.log('connected To server');
            });
            console.log(`UserName: ${userName} RoomName: ${roomName}`);
            let userObject = {
                userName: userName,
                roomName: roomName
            }
            socket.emit('join', userObject);
            setJoinedChat(true);
        }
    }
    return (
        <div className="middleBox_outer">
            {
                joinedChat ? <div className="discconnect_menu">
                     Welcome: 
                     <span className="userName">{'  '+userName }
                     </span>
                      <br />
                     Active Room:
                     <span className="roomName">{' '+roomName}</span> 
                     <br />
                    <button className="btn_toggle_connect_disconnect" onClick={handleToggle}>Disconnect</button>  
                    <div className="middlebox">
                        <ChatBox socket ={socket} name ={userName} room= {roomName}/>
                    </div>
                </div> :
                <div className="fourm_supporter">
                    <div className="join_fourm">
                        <input className="input_box"  onChange={(e) => setUserName(e.target.value)} type="text" placeholder="User Name" />
                        <input className="input_box" onChange={(e) => setRoomName(e.target.value)} type="text" placeholder="Room Name" />
                        <button className="btn_toggle_connect_disconnect" onClick={handleToggle}>Connect</button>
                    </div>  
                </div>

            }
        </div>
    );
}
export default Middlebox;