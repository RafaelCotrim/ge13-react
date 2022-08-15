import { ReactNode } from "react";



interface PanelProps{
    prose?: boolean,
    children: ReactNode
}

export function Panel(props: PanelProps) {
  return (
    <div className={(props.prose ? "max-w-prose w-prose min-w-prose" : "") +  " text-lg bg-slate-800 drop-shadow-md rounded-lg p-4 panel"}>
        {props.children}
    </div>
  );
}
