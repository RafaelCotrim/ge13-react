import { twMerge } from "tailwind-merge";

export function Input({className, ...props}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={twMerge("w-20 mx-2 rounded-lg no-arrows bg-slate-700 p-2 focus:outline-none", className)}
        ></input>
    );
}
