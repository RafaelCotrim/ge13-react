import { useCallback, useContext } from "react";
import { SystemContext } from "../providers/SystemProvider";
import { Dropdown } from "./Dropdown";

export default function UnitSelector() {

    const [_, setSystem] = useContext(SystemContext)

    const changeUnit = useCallback((selection: number) => {
        if (selection === 0) {
            setSystem("default");
        } else if (selection === 1) {
            setSystem("metric");
        } else {
            setSystem("imperial");
        }
    }, [setSystem]);

    return (
        <Dropdown className="inline-block w-28 h-14 text-lg" text="Units" options={["Default", "Metric", "Imperial"]} onSelect={changeUnit} />
    );
}