import { Outlet } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { SystemProvider } from './providers/SystemProvider';

function App() {
  
  return (
    <SystemProvider>
      <div className=' bg-gray-900 min-h-screen flex text-gray-300'>
        <div className='w-full'>
          <Navbar />
          <div className='m-5'>
            <Outlet />
          </div>
        </div>
      </div>
    </SystemProvider>

  );
}

export default App;
