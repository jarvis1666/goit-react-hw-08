import "../App/App.module.css";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks";
import { refreshUser } from "../../redux/auth/operations";
import { Toaster } from "react-hot-toast";
import { Layout } from "../Layout/Layout";

//npm install react-redux
//npm install redux-persist
//npm install @reduxjs/toolkit
//npm install @reduxjs/toolkit react-redux
//npm install react-router-dom
//npm install react-loader-spinner
// npm install react-helmet-async
// npm install react-hot-toast
//npm install --save react-modal
// npm install axios
// npm install react-icons --save

const HomePage = lazy(() => import("../../pages/Home"));
const RegisterPage = lazy(() => import("../../pages/Register"));
const LoginPage = lazy(() => import("../../pages/Login"));
const ContactsPage = lazy(() => import("../../pages/Contacts"));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      {/* <NavBar/> */}
      {/* <Suspense fallback={ <Loader/>}> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="contacts"
                component={<RegisterPage />}
              />
            }
          ></Route>

          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          ></Route>

          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          ></Route>
        </Route>
      </Routes>
      <Toaster />
      {/* </Suspense> */}
    </>
  );
}

export default App;
