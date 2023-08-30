import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import TextEditor from "./components/TextEditor";
import SignUp from "./components/Signup";
import Dashboard from "./components/Dashboard";
import SignIn from './components/Signin';
import { Routes  , Route} from "react-router-dom";
import EditUser from "./components/EditProfile";
import NotesList from "./components/NotesList";
// import UserProfile from "./components/UserProfile";
import UserNotes from "./components/UserNotes";
import AllUsers from "./components/AllUsers";
import ShowNotesPage from "./components/ShowNotes";
import AdminEdit from "./components/AdminEdit";
import Admindash from "./components/AdminDash";
import AdSignIn from "./components/AdSignin";
import AdSignUp from "./components/AdSignup";
import AdRoute from "./components/AdRoute";
import AddUsers from "./components/AddUsers";
import ProfilePage from "./components/ProfilePage";

function App() {


  return (
    <div id="wrapper">
      
        
        
        <Routes>
             
              <Route path="/signup" element={<SignUp />} />

              
              <Route path="/signin" element={<SignIn />} />
              <Route path="/texteditor/:id" element={<TextEditor/>}/>
              <Route path="/adminEdit/:id" element={<AdminEdit/>}/>
              
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/admindash" element={<Admindash/>}/>
              <Route path="/editUsers/:id" element={<EditUser/>}/>

              <Route path="/noteslist" element={<NotesList/>}/>
              <Route path="/adsignin" element={<AdSignIn/>}/>
              <Route path="/adsignup" element={<AdSignUp/>}/>
              <Route path="/adroute" element={<AdRoute/>}/>

              <Route path="/addusers" element={<AddUsers/>}/>
               
              <Route path="/user/:email/notes" element={<UserNotes/>}/>

              <Route path="/shownotes/:email" element={<ShowNotesPage/>}/>

              <Route path="/allusers" element={<AllUsers/>}/>

              <Route path="/profilepage/:id" element={<ProfilePage/>}/>
              
             
            </Routes>

        
      
    </div>
  );

  }
export default App ;
