// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Profile = lazy(() => import("./pages/Profile"));
const PropertyList = lazy(() => import("./pages/PropertyList"));
const PropertyView = lazy(() => import("./pages/PropertyView"));
const PostProperty = lazy(() => import("./pages/PostProperty/PostProperty"));
const UpdateProperty = lazy(() =>
  import("./pages/UpdateProperty/UpdateProperty")
);
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SearchPage = lazy(() => import("./pages/SearchPage/SearchPage"));

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Routes>
          {!currentUser && (
            <Route path="/" element={<Navigate to="/signin" />} />
          )}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/propertyView/:propertyId" element={<PropertyView />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            element={
              <PrivateRoute allowedRoles={["buyer", "seller", "tenant"]} />
            }
          >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["seller"]} />}>
            <Route path="/postproperty" element={<PostProperty />} />
            <Route path="/propertyList" element={<PropertyList />} />
            <Route
              path="/updateproperty/:propertyId"
              element={<UpdateProperty />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
