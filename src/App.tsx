import { Layout, Login, Logout, Signup } from './components/';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import './scss/App.scss';
import { EmoteProvider } from './contexts/EmoteContext';

function App() {
  return (
    <>
      <UserProvider>
        <EmoteProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </EmoteProvider>
      </UserProvider>
    </>
  );
}

export default App;
