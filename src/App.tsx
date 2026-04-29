// Screens
import { HomeScreen } from "./components/screens/HomeScreen";
import { BlogScreen } from "./components/screens/BlogScreen";
import { AccountProfileScreen } from "./components/screens/AccountProfileScreen";
import { AccountSettingsScreen } from "./components/screens/AccountSettingsScreen";
import { CreatePostScreen } from "./components/screens/CreatePostScreen";
import { PageNotFoundScreen } from "./components/screens/PageNotFoundScreen";

// Components
import { Navbar } from "./components/navbar/navbar";
import { TooltipProvider } from "./components/ui/tooltip";

import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  
  return (
    <TooltipProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomeScreen/> } />
        <Route path="/blog/:id" element={ <BlogScreen /> } />
        <Route path="/profile/:userId" element={ <AccountProfileScreen /> } />
        <Route path="/settings/:userId" element={ <AccountSettingsScreen /> } />
        <Route path="/create" element={ <CreatePostScreen /> } />
        <Route path="/*" element={ <PageNotFoundScreen /> } />
      </Routes>
    </TooltipProvider>
  )
}

export default App;
