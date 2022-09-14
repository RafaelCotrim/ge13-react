import { Link } from "react-router-dom";
import hero from "../assets/images/hero.jpg"
import placeholder from "../assets/images/placeholder.png";
import sunPicture from "../assets/images/sun.jpg";
import Card from "../components/Card";
import FeatureCard from "../components/FeatureCard";
import { Navbar } from "../components/Navbar";
import { range } from "../utils/Math";

export function Home({ }) {
    return (
        <>
            <div className="bg-hero-pattern">
                <img className="hidden md:block absolute right-0 hero max-w-1/2 max-h-screen" src={hero} alt="" />
                <div className="flex flex-col gap-5 max-w-prose justify-center text-center mx-4 min-h-screen sm:mx-auto md:ml-20 md:text-left">

                    <h1 className=' text-4xl sm:text-7xl font-bold z-10'>
                        Powerfull <span className='text-transparent bg-clip-text bg-gradient-to-r  from-red-600 to-yellow-400'>tools</span> for the modern <i className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-green-400'>worldbuilder</i>!
                    </h1>

                    <p className="text-xl z-10">
                        Build more cohesive worlds by getting inspiration from astronomy
                    </p>

                    <Link to="/stars">
                        <button className="bg-green-500 font-bold py-2 px-4 rounded-md">
                            Start creating
                        </button>
                    </Link>
                </div>
            </div>
            <div className="min-h-[10vh] py-10 bg-gradient-to-b from-black to-shade-900">

            </div>
            <h2 className="text-3xl font-bold text-center py-5">Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-4/5 max-w-6xl mx-auto gap-5 pb-5">
                <FeatureCard title="Stellar Calculator" image={sunPicture} link="/stars">
                    Determine the properties of main sequence stars based on their mass. You can discover their size, class, color, life expectancy and much more!
                </FeatureCard>
                <FeatureCard title="Orbit builder" status="wip">
                    Build the orbits of your solar system, considering the habitable zone of each star, their frost line and much more. Just edit the values and look at the preview!
                </FeatureCard>
                <FeatureCard title="Planetary Editor" status="wip">
                    Edit the properties of planets to see what is possible! Derived information such as composition and mean surface temperature will be calculated automatically.
                </FeatureCard>
            </div>
        </>
    );
}
