import { useRef, useState } from "react";

let chatList = [];
const ChatBox = ({socket,name,room})=>
{
    const [chats,setChats] = useState([]);
    const msg_box = document.getElementById('msg_box');

    const sessionId = sessionStorage.getItem('activeSession');
    
    const scrollToBottom = ()=>
    {
        setTimeout(()=>
        {
            const chat_Container = document.getElementById('chat_Container');
            if (chat_Container)
            {
                chat_Container.scrollTop = chat_Container.scrollHeight *4;
               // console.log('Scroll '+ chat_Container.scrollTop);
            }

        },100)
    }

    socket.on('msgFromServer',(userObject)=>
    {
        console.log(`${userObject.userName}:${userObject.usermsg}`);  
        chatList = [];
        chatList.push(userObject);
        setChats([...chats,...chatList]);
        scrollToBottom();
    });

    const curMsg = useRef('');
    const sendMsg = ()=>
    {
        let userMsg = curMsg.current.value;
        if (userMsg.length>0 && userMsg.trim().length >0)
        {
            console.log('Active Id : ',sessionId);
            socket.emit('msgFromUser',name,room,userMsg,new Date().toUTCString(),sessionId);
            msg_box.value = '';
        }else
        {
            console.log("User Msg Is Empty");
        }

    }
    
    return(
        <div className="chatBox">
            <h2 className="chatBox_title">Chato Chat</h2>

                <div id="chat_Container" className="chatContainer">
                    {console.log('Chats Received For Rendering',chats)}
                    {
                        
                        chats.map((c,index)=>
                        
                        <div>
                             <span className="timeStamp">{c.msgTime}</span>
                            <div className={c.userName === 'ADMIN' ? 'bg_three': name===c.userName ?'bg_one':'bg_two'} key={'chat_'+index}>{<span className={c.userName=== 'ADMIN' ? 'admin' : name===c.userName ? 'activeUser': 'otherUser'} >{c.userName}</span>}{c.userMsg}
                            </div>
                        </div>
                        )                       
                        
                    }
                </div>
            <div className="bottomBar">
                <input ref={curMsg} id="msg_box"  className="msgBox" type="text" placeholder="Chat" />
                <button onClick={sendMsg} className="msgBox_btn" type="button">Send</button>
            </div>
        </div>
    );
}
export default ChatBox;