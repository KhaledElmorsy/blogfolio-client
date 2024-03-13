import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import './scss/App.scss';

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
