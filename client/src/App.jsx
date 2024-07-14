// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp/SignUp";

import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

import PropertyList from "./pages/PropertyList";

import PropertyView from "./pages/PropertyView";
import SearchPage from "./pages/SearchPage";
import PostProperty from "./pages/PostProperty/PostProperty";
import UpdateProperty from "./pages/UpdateProperty/UpdateProperty";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/propertyView/:propertyId" element={<PropertyView />} />
        <Route path="/search" element={<SearchPage />} />
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
