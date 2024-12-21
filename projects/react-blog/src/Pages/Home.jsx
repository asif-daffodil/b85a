import Slider from "../Components/HomeComponents/Slider";
import About from "./About";
import { Blogs } from "./Blogs";
import Contact from "./Contact";

const Home = () => {
    return (
        <div>
           <Slider />
           <About />
           <Blogs />
           <Contact />
        </div>
    );
};

export default Home;