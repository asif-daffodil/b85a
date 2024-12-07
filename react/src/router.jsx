import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/about",
            element: <About />,
        }
      ],
    },
  ]);

export default router;