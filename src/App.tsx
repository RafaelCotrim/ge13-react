import { Outlet } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { SystemProvider } from './providers/SystemProvider';

export default function App() {

  return (
    <SystemProvider>
      <div className='w-full min-h-screen bg-shade-900  text-white '>
        <Outlet />
      </div>
    </SystemProvider>
  );
}