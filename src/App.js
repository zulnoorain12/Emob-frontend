import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './Components/Loading';
import Welcome from './Components/Welcome';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import EmbedCode from './Components/EmbedCode';
import Customization from './Components/Customization';
import ChatDemo from './Components/ChatDemo';
import Subscription from './Components/Subscription';
import Documentation from './Components/Documentation';
import ContactUs from './Components/ContactUs';
import Profile from './Components/Profile';
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/embed" element={<EmbedCode />} />
        <Route path="/dashboard/customization" element={<Customization />} />
        <Route path="/dashboard/chat" element={<ChatDemo />} />
        <Route path="/dashboard/subscription" element={<Subscription />} />
        <Route path="/dashboard/documentation" element={<Documentation />} />
        <Route path="/dashboard/contact" element={<ContactUs />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
