import { Outlet } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { SystemProvider } from './providers/SystemProvider';

function App() {
  
  return (
    <SystemProvider>
      <div className='bg-shade-900 min-h-screen flex text-white'>
        <div className='w-full'>
          {/* <Navbar /> */}
          <Outlet />
          
        </div>
      </div>
    </SystemProvider>

  );
}

export default App;
