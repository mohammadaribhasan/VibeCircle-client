import React from "react";
import ReactDOM from "react-dom/client";  // Import from react-dom/client
import { RouterProvider } from "react-router";
import router from './Router/Router';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));  // createRoot
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
