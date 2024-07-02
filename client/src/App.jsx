import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import PostProperty from "./pages/PostProperty";
import PropertyList from "./pages/PropertyList";
import UpdateProperty from "./pages/UpdateProperty";
import PropertyView from "./pages/PropertyView";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/propertyView/:propertyId" element={<PropertyView />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/postproperty" element={<PostProperty />} />
          <Route path="/PropertyList" element={<PropertyList />} />
          <Route
            path="/updateproperty/:propertyid"
            element={<UpdateProperty />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
