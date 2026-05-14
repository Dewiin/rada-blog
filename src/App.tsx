import { Routes, Route } from "react-router-dom";
import './App.css'

// components
import { Navbar } from "./components/navbar/navbar";
import { TooltipProvider } from "./components/ui/tooltip";

// screens
import { HomeScreen } from "./components/screens/HomeScreen";
import { PostScreen } from "./components/screens/PostScreen";
import { AccountProfileScreen } from "./components/screens/AccountProfileScreen";
import { CreatePostScreen } from "./components/screens/CreatePostScreen";
import { PageNotFoundScreen } from "./components/screens/PageNotFoundScreen";

function App() {
  
  return (
    <TooltipProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomeScreen/> } />
        <Route path="/post/:id" element={ <PostScreen /> } />
        <Route path="/profile/:userId" element={ <AccountProfileScreen /> } />
        <Route path="/create" element={ <CreatePostScreen /> } />
        <Route path="/*" element={ <PageNotFoundScreen /> } />
      </Routes>
    </TooltipProvider>
  )
}

export default App;
