import { ChangeEventHandler, HTMLInputTypeAttribute, LegacyRef } from "react";

interface InputProps {
    id?: string,
    type?: HTMLInputTypeAttribute,
    defaultValue?: string | number | ReadonlyArray<string>,
    min?: number | string,
    max?: number | string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    ref?: LegacyRef<HTMLInputElement>,
    width?: string
}

export function Input(props: InputProps) {
    return (
        <input
            id={props.id}
            ref={props.ref}
            type={props.type}
            defaultValue={props.defaultValue}
            min={props.min}
            max={props.max}
            onChange={props.onChange}
            className={(props.width ? props.width : "w-20") + " mx-2 rounded-lg no-arrows bg-slate-700 p-2 focus:outline-none"}
        ></input>
    );
}
