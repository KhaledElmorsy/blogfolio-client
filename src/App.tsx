import {
  Layout,
  Login,
  Logout,
  Signup,
  Home,
  LoggedUserPosts,
  UserPosts,
  UserLayout,
  ProtectedRoute,
  NewPost,
  ShowPost,
  EditPost,
  PortfolioDashboard,
  UserPortfolio,
  AccountDashboard,
  ExplorePosts
} from './components/';
import { Routes, Route, Navigate } from 'react-router-dom';
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
              <Route index element={<Home />} />
              <Route path="explore" element={<ExplorePosts />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="signup" element={<Signup />} />
              <Route path="users/:username" element={<UserLayout />}>
                <Route index element={<Navigate to="posts" />} />
                <Route path="portfolio" element={<UserPortfolio />} />
                <Route path="posts" element={<UserPosts />} />
                <Route path="posts/:slug" element={<ShowPost />} />
                <Route path="posts/:slug/edit" element={<EditPost />} />
              </Route>
              <Route element={<ProtectedRoute to="/login" />}>
                <Route path="posts" element={<LoggedUserPosts />} />
                <Route path="posts/new" element={<NewPost />} />
                <Route path="portfolio" element={<PortfolioDashboard />} />
                <Route path="account" element={<AccountDashboard />} />
              </Route>
            </Route>
          </Routes>
        </EmoteProvider>
      </UserProvider>
    </>
  );
}

export default App;
