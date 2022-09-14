import { ChevronDown } from "heroicons-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
    options: string[],
    text?: string
    default?: number
    className?: string
    onSelect?: (i: number) => void
}

export function Dropdown(props: DropdownProps) {

    const [selected, set_selected] = useState(props.default ?? 0);

    return (
        <div className={twMerge("text-white [&:focus-within>ul]:block [&:hover>ul]:block relative", props.className)}>
            <button className="w-full h-full bg-slate-700 rounded-lg px-2 md:px-4 py-2 flex flex-row justify-between align-middle"
                type="button">
                <span className="my-auto">{props.text}</span>
                <ChevronDown className="inline-block my-auto" />
            </button>

            <ul className="w-full options hidden mt-0.5 absolute rounded-lg overflow-auto">
                {props.options.map((x, i) => (
                    <li key={i}
                        className={(i == selected ? "bg-blue-600" : "bg-slate-600 hover:bg-slate-500") + " px-2 py-1 cursor-pointer"}
                        onClick={(e) => { set_selected(i); props.onSelect?.(i) }}>{x}</li>
                ))}
            </ul>
        </div>
    );
}


