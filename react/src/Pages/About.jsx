
const About = () => {
    return (
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 my-12">
            <div className="col-span-4 text-center text-2xl lg:text-4xl mb-3 animate-pulse">
                About Us
            </div>
            <div className="text-blue-600 hover:bg-blue-100 border border-blue-600 p-3 rounded shadow-lg shadow-blue-600 relative">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur temporibus quis voluptatum distinctio sapiente voluptas sunt accusamus, vitae quae asperiores sit. Ad ipsum dolorem aliquam, pariatur vel incidunt at doloremque?
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
            </div>
            <div className="text-red-600 hover:bg-red-100 border border-red-600 p-3 rounded shadow-lg shadow-red-600 hover:-translate-y-5 transition-all duration-[500ms] ease-in-out delay-75">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dignissimos expedita cum voluptatum ut necessitatibus possimus minus velit dolores optio repellendus, non quia cupiditate similique, sint quis dicta fugit placeat?
            </div>
            <div className="text-green-600 hover:bg-green-900 border border-green-600 p-3 rounded shadow-lg shadow-green-600 group">
                <p className="group-hover:text-white">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas tenetur animi aperiam voluptatum porro fugiat cupiditate obcaecati, cum doloremque temporibus nisi incidunt deleniti ullam dolore, rem voluptas reprehenderit quaerat ab.
                </p>
                <p className="group-hover:text-white">
                    <span className="group-hover:text-red-600">Click here</span> to know more
                </p>
            </div>
            <div className="text-orange-600 hover:bg-orange-100 border border-orange-600 p-3 rounded shadow-lg shadow-orange-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non debitis illo harum suscipit cum repellendus ipsa quam quis a aliquam aliquid dolorem, earum laboriosam eveniet ad exercitationem excepturi deserunt. Laudantium?
            </div>
            <div className="col-span-4 p-5 bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500 animate-bounce text-white text-center text-2xl uppercase tracking-[3px]">
                Bangladesh
            </div>
        </div>
    );
};

export default About;