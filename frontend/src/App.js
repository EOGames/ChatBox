import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Middlebox from './components/Middlebox';
import io from 'socket.io-client';
import { useEffect } from 'react';

function App() 
{
  const socket =  io('http://localhost:5500');

  
  return (
    <div className="App">
     <Topbar />
      <div className='layout'>

        <Sidebar />
        <Middlebox socket={socket} />
      </div>
    </div>
  );
}

export default App;
