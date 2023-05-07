import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Middlebox from './components/Middlebox';
import ChatHistory from './pages/ChatHistory';
import io from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';

function App() 
{
  const socket =  io('http://localhost:5500');

  
  return (
    <div className="App">
     <Topbar />
      <div className='layout'>

        <Sidebar />

        <Routes>
            <Route path='/' element={<Middlebox socket={socket} />} ></Route>
            <Route path='/history' element={<ChatHistory />} ></Route>
           
        </Routes>
      </div>
    </div>
  );
}

export default App;
