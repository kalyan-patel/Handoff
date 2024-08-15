
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

import NewListing from './pages/NewListing'
import Messages from './pages/Messages'
import MyListings from './pages/MyListings'
import ItemPage from './pages/ItemPage'

import './index.css'


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listings/:id" element={<ItemPage />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/newlisting" element={<NewListing />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/mylistings" element={<MyListings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
