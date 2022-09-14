import { twMerge } from "tailwind-merge";


export default function Card({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={twMerge("p-4 bg-shade-800 rounded-md", className)}>
        {props.children}
    </div>
  );
}
