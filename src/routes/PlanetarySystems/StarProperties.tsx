import { ChangeEvent, useCallback, useContext, useRef, useState } from "react";
import Card from "../../components/Card";
import { Input } from "../../components/Input";
import { SciNotation } from "../../components/SciNotation";
import { Cell, Row, Table } from "../../components/Table";
import UnitSelector from "../../components/UnitSelector";
import { Star } from "../../models/Star";
import { SystemContext } from "../../providers/SystemProvider";
import { round } from "../../utils/Math";
import { AnyUnit, convert, unitName } from "../../utils/Units";


export default function StarProperties({ star, setStar, className }: { star: Star, setStar: (star: Star) => void, className?: string }) {

    const errorBox = useRef<HTMLDivElement>(null);
    const [starName,] = useState("Your Star");

    const [, , checkSystem] = useContext(SystemContext)

    const checkMass = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        function showMassError() {
            errorBox.current?.classList?.remove("h-0");
            errorBox.current?.classList?.add("h-14", "border");
        }

        function hideMassError() {
            errorBox.current?.classList?.add("h-0");
            errorBox.current?.classList?.remove("h-14", "border");
        }

        e.preventDefault();

        if (e.target.value.trim().length === 0) {
            setStar(new Star(0, star.name));
            showMassError();
            return;
        }

        var val = parseFloat(e.target.value);

        if (isNaN(val)) {
            setStar(new Star(0, star.name));
            showMassError();
        } else if (val < 0.075 || val > 100) {
            setStar(new Star(0, star.name));
            showMassError();
        } else {
            setStar(new Star(val, star.name));
            hideMassError();
        }
    }, []);

    var data: QuantityRowProps[] = [
        { name: "Radius", value: star.getRadius(), unit: "sr", to: checkSystem<AnyUnit>("sr", "km", "mi") },
        { name: "Luminosity", value: star.getLuminosity(), unit: "sl", to: checkSystem<AnyUnit>("sl", "w") },
        { name: "Life Expectancy", value: star.getLifeExpectancy(), unit: "gyr", precision: 4 },
        { name: "Temperature", value: star.getTemperature(), unit: "k", to: checkSystem<AnyUnit>("k", "c", "f"), precision: 0, cutoff: 10 },
        { name: "Density", value: star.getDensity(), unit: "sd", to: checkSystem<AnyUnit>("sd", "kg/m3", "lbs/ft3") }
    ];

    return (
        <Card className={className}>
            <div className="flex flex-row gap-2 mb-2 ">
                <UnitSelector />
                <div ref={errorBox} className="flex flex-col justify-center h-0 w-full text-red-500 border-red-500 rounded-lg overflow-hidden duration-700">
                    <span className="mx-auto ">Mass must be a number between 0.075 and 100 solar masses</span>
                </div>
            </div>

            <Table full headers={["Property", "Value", "Unit"]} bodyCss="[&>tr>td:nth-child(2)]:text-center">
                <Row>
                    <Cell>
                        <label htmlFor="nameInput">Name</label>
                    </Cell>
                    <Cell>
                        <Input id="nameInput" type="text" className="w-20 md:w-32" onChange={(e) => setStar(new Star(star.mass, e.target.value))} defaultValue={starName} />
                    </Cell>
                    <Cell></Cell>
                </Row>
                <Row>
                    <Cell>
                        <label htmlFor="massInput">Mass</label>
                    </Cell>
                    <Cell>
                        <Input id="massInput" type="number" className="w-20" min={0.075} max={100} defaultValue={1} onChange={(e) => checkMass(e)} />
                    </Cell>
                    <Cell>Solar Masses</Cell>
                </Row>
                <Row>
                    <Cell>
                        Stellar Class
                    </Cell>
                    <Cell>
                        {star.getClassification()}
                    </Cell>
                    <Cell></Cell>
                </Row>
                {data.map(x => (
                    <QuantityRow {...x} showValue={star.mass !== 0} />
                ))}
                <Row>
                    <Cell>
                        Goldilocks Zone
                    </Cell>
                    <Cell>
                        {
                            star.mass === 0 ? "-" : (
                                <>
                                    <SciNotation value={convert(star.getHabitableZoneStart()).from("au").to(checkSystem("au", "km", "mi")).value} precision={checkSystem(3, 0)} /> - <SciNotation value={convert(star.getHabitableZoneEnd()).from("au").to(checkSystem("au", "km", "mi")).value} precision={checkSystem(3, 0)} />
                                </>
                            )
                        }
                    </Cell>
                    <Cell>
                        {unitName(checkSystem("au", "km", "mi"))}
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        Color
                    </Cell>
                    <Cell>
                        {
                            star.mass === 0 ? (
                                <ColorCircle color={"#000000"} />
                            ) : (
                                <span className="inline-flex items-center gap-2"><ColorCircle color={star.getColor()} /> <span>{star.getColor()}</span></span>
                            )
                        }
                    </Cell>
                    <Cell></Cell>
                </Row>
            </Table>
        </Card>
    );
}


interface QuantityRowProps {
    name: string,
    value: number,
    unit: AnyUnit,
    to?: AnyUnit
    showValue?: boolean,
    precision?: number
    cutoff?: number
}

function QuantityRow({ name, value, unit, to, showValue = true, precision = 3, cutoff = 4 }: QuantityRowProps) {

    var finalValue;

    if (showValue) {
        var computedValue = 0;

        if (to != null) {
            computedValue = round(convert(value).from(unit).to(to).value, precision);
        } else {
            computedValue = round(value, precision);
        }

        finalValue = <SciNotation value={computedValue} precision={precision} cutoff={cutoff} />
    } else {
        finalValue = "-"
    }

    var finalUnit = to === undefined ? unitName(unit) : unitName(to);

    return (
        <Row>
            <Cell>{name}</Cell>
            <Cell>{finalValue}</Cell>
            <Cell>{finalUnit}</Cell>
        </Row>
    );
}

function ColorCircle({ color }: { color: string }) {
    return (
        <div className="inline-block border border-slate-700 w-10 h-10 rounded-full" style={{ backgroundColor: color }} />
    );
}