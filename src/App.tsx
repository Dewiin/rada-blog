// Screens
import { LandingScreen } from "./components/screens/HomeScreen";
import { SignupScreen } from "./components/screens/SignupScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { BlogScreen } from "./components/screens/BlogScreen";

// Components
import { Navbar } from "./components/ui/navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={ <LandingScreen/> } />
          <Route path="/signup" element={ <SignupScreen /> } />
          <Route path="/login" element={ <LoginScreen /> } />
          <Route path="/blog/:id" element={ <BlogScreen /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
