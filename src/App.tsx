import { Layout, Login, Logout, Signup } from './components/';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import './scss/App.scss';

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
