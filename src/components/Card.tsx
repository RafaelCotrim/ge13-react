import { ReactNode } from "react";



interface CardProps{
    children: ReactNode
}

export default function Card(props: CardProps) {
  return (
    <div className="p-4 bg-shade-800 rounded-md">
        {props.children}
    </div>
  );
}
