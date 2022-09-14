import { ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import placeholder from "../assets/images/placeholder.png"

interface FeatureCardProps{
    title: string
    image?: string
    link?: string
    children?: ReactNode
    status?: "done" | "wip"
}

export default function FeatureCard({ title, image, link, children, status = "done" }: FeatureCardProps) {
    return (
        <Card>
            <img src={image ?? placeholder} className="w-full max-h-56 object-cover  rounded-md" />
            <h3 className="pt-2 text-xl text-center font-bold">
                {title}
            </h3>
            <p className="py-2">
                {children}
            </p>
            {status == "done" ? (
                <Link to={link!}>
                <button className="block mx-auto bg-green-500 font-bold py-2 px-4 rounded-md">
                    Get Started
                </button>
            </Link>
            ) : (
                <button className="block mx-auto bg-gray-500 font-bold py-2 px-4 rounded-md">
                    Coming soon
                </button>
            )}
        </Card>
    );
}
