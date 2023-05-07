import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";

const Middlebox = ({ socket }) => {
    const [joinedChat, setJoinedChat] = useState(false);
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');

    const [activeSessionId, setActiveSessionId] = useState('');


    useEffect(() => {
        //getting old saved sesion id
        if (sessionStorage.getItem('activeSession')) {

            let id = sessionStorage.getItem('activeSession');
            setActiveSessionId(id);

            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

            setUserName(userInfo.userName);
            setRoomName(userInfo.roomName);



            setJoinedChat(true);


            // socket.emit('join', userInfo);

            console.log(`Restoring Previous Session: UserName: ${userInfo.userName} RoomName: ${userInfo.roomName}`);
        }

    }, []);

    const handleToggle = () => {
        if (!userName.length > 0 || !userName.trim().length > 0 || !roomName.length > 0 || !roomName.trim().length > 0) {
            alert("User Name Or Room Name empty Can't Log in");
            return;
        }

        if (joinedChat) {
            let userObject = {
                userName: userName,
                roomName: roomName
            }
            socket.emit('leave', userObject);

            sessionStorage.removeItem('activeSession');
            sessionStorage.removeItem('userInfo');
            setUserName('');
            setRoomName('');
            setActiveSessionId('');
            setJoinedChat(false);
        }
        else {

            if (activeSessionId === '') {
                let id = CreateUniqeId();
                sessionStorage.setItem('activeSession', id);

                let userInfo =
                {
                    userName: userName,
                    roomName: roomName,
                }
                // saving user info to session storage
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

                console.log(`UserName: ${userName} RoomName: ${roomName}`);



                socket.emit('join', userInfo);
                setJoinedChat(true);
            }
            else {
                console.log('%c Its Here And WHy its here..?', ' color:red');
            }
        }
    }

    const CreateUniqeId = () => {
        let curTime = new Date().toLocaleTimeString();
        // console.log('Cur Time', curTime);
        let randomNum = Math.random() * 100;
        let hexTime = curTime.toString(16).replaceAll(":", "");
        let hexNum = randomNum.toString(16);
        let id = `Id${hexTime}${hexNum}.${roomName}`;
        console.log('%c ID Created ' + id, ' color:red');
        return id;
    }
    return (
        <div className="middleBox_outer">
            {
                joinedChat ? 
                <>
                <div className="discconnect_menu">
                    <div className="userName leftRightMargin">
                    <span style={{color:'white'}}> Welcome:</span> {'   ' + userName}
                    </div>
                    
                    <div className="roomName leftRightMargin">
                    <span style={{color:'white'}}>Active Room:</span> {' ' + roomName}
                    </div>
                    
                    <button className="btn_toggle_connect_disconnect" onClick={handleToggle}>Disconnect</button>
                </div>

                <div className="middlebox">
                        <ChatBox socket={socket} name={userName} room={roomName} />
                </div>
                </>
                 :
                    <div className="fourm_supporter">
                        <div className="join_fourm">
                            <div>
                                <input className="input_box" onChange={(e) => setUserName(e.target.value)} type="text" placeholder="User Name" />
                            </div>
                            <div>
                                <input className="input_box" onChange={(e) => setRoomName(e.target.value)} type="text" placeholder="Room Name" />
                            </div>
                            <button className="btn_toggle_connect_disconnect" onClick={handleToggle}>Connect</button>
                        </div>
                    </div>

            }
        </div>
    );
}
export default Middlebox;