import { Plus } from "heroicons-react";
import { ReactNode, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../../components/Input";
import { Panel } from "../../components/Panel";
import { Cell, Row, Table } from "../../components/Table";
import { Star } from "../../models/Star";
import { round } from "../../utils/Math";


const baseOrbit = 0.4;
const spacing = 0.3;

export default function Orbits({star} : {star: Star}) {

    var orbits = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(x => round(baseOrbit + spacing * Math.pow(2, x), 2));

    const mapArea = useCallback<(distance: number) => Area>((distance: number) => {
        if(distance >= star.getHabitableZoneStart() && distance <= star.getHabitableZoneEnd()){
            return "habitable";
        } else if (distance < star.getFrostLine()){
            return "rocky";
        }
        return "gass";
    }, [star]);

    return (
        <div className="mt-4">
            <Panel prose>
                <Table full headers={["Name", "Distance (AU)", "Type"]} bodyCss="[&>tr>td:nth-child(2)]:text-center">
                    {orbits.map((x, i) => (
                        <OrbitRow name={"Orbit " + i} distance={x} area={mapArea(x)}/>
                    ))}
                    <Row>
                        <Cell></Cell>
                        <Cell><Button><Plus/></Button></Cell>
                        <Cell></Cell>
                    </Row>
                </Table>
            </Panel>
        </div>
    );
}

type Area = "rocky" | "habitable" | "gass";

interface OrbitRowProps {
    name: string,
    distance: number,
    area?: Area
}

function OrbitRow({ name, distance, area }: OrbitRowProps) {

    var className;

    if(area === "rocky"){
        className = " outline outline-blue-500"
    } else if (area === "habitable"){
        className = " outline outline-green-500"
    } else {
        className = " outline outline-orange-500"
    }

    className += " focus:outline";
    
    return (
        <Row>
            <Cell><Input defaultValue={name} /></Cell>
            <Cell><Input className={className} defaultValue={distance} /></Cell>
            <Cell>
                <OptionButton options={["Planet", "Asteroid Belt", "Empty"]} />
            </Cell>
        </Row>
    );
}

interface OptionButtonProps {
    options: string[]
}

function OptionButton({ options }: OptionButtonProps) {

    const [selected, setSelected] = useState(0)

    return (
        <Button className=" w-full" onClick={() => setSelected((selected + 1) % options.length)}>
            {options[selected]}
        </Button>
    );
}

function Button({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={twMerge("bg-slate-700 hover:bg-slate-600 rounded-lg px-4 py-2 text-center", className)}>
            {children}
        </button>
    );
}
