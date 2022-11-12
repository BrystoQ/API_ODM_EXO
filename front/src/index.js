import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Footer } from "./components/footer";
import Error from "./pages/404.js";
import { Navbar } from "./components/navbar";
import "./index.css";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "",
    errorElement: <Error />,
    children: [
      { path: "/", element: <App /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/posts", element: <Posts /> },
      { path: "/newPost", element: <newPost /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />
    <div className="container">
      <RouterProvider router={router} />
    </div>
    <Footer />
  </React.StrictMode>
);
