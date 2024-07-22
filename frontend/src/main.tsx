import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
import store from './store.ts'
import { Provider } from "react-redux";
import PrivateRoutes from "../components/PrivateRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
