import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './Pages/About.jsx';
import MainLayout from './Layouts/MainLayout.jsx';
import 'flowbite/dist/flowbite.min.js';
import Home from './Pages/Home.jsx';
import { Blogs } from './Pages/Blogs.jsx';
import Contact from './Pages/Contact.jsx';
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
