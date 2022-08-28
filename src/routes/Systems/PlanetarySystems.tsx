import { OrthographicCamera, Stars as StarBg, Text } from "@react-three/drei";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Depth, LayerMaterial } from "lamina";
import { ChangeEvent, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AddEquation, ColorRepresentation, CustomBlending, DstAlphaFactor, SrcAlphaFactor } from "three";
import { Dropdown } from "../../components/Dropdown";
import { Input } from "../../components/Input";
import { Panel } from "../../components/Panel";
import { SciNotation } from "../../components/SciNotation";
import { Cell, Row, Table } from "../../components/Table";
import UnitSelector from "../../components/UnitSelector";
import { Star } from "../../models/Star";
import { SystemContext } from "../../providers/SystemProvider";
import { round } from "../../utils/Math";
import { AnyUnit, convert, unitName } from "../../utils/Units";
import Orbits from "./Orbits";

interface PlanetarySystemProps{
  mass: number,
  setMass: (newUnit: number) => void
}

export function PlanetarySystem() {

  const errorBox = useRef<HTMLDivElement>(null);

  const [system, _] = useContext(SystemContext)
  const [mass, setMass] = useState(1);
  const [starName, setName] = useState("Your Star");

  const star = useMemo(() => {
    return new Star(mass);
  }, [mass]);

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
      setMass(0);
      showMassError();
      return;
    }

    var val = parseFloat(e.target.value);

    if (isNaN(val)) {
      setMass(0);
      showMassError();
    } else if (val < 0.075 || val > 100) {
      setMass(0);
      showMassError();
    } else {
      setMass(val);
      hideMassError();
    }
  }, []);

  const checkSystem = useCallback(<T,>(astro: T, metric: T, imperial?: T) => {
    if (system === "default") {
      return astro;
    } else if (system === "metric" || imperial === undefined) {
      return metric;
    } else {
      return imperial;
    }

  }, [system]);

  var data: QuantityRowProps[] = [
    { name: "Radius", value: star.getRadius(), unit: "sr", to: checkSystem<AnyUnit>("sr", "km", "mi") },
    { name: "Luminosity", value: star.getLuminosity(), unit: "sl", to: checkSystem<AnyUnit>("sl", "w") },
    { name: "Life Expectancy", value: star.getLifeExpectancy(), unit: "gyr", precision: 4 },
    { name: "Temperature", value: star.getTemperature(), unit: "k", to: checkSystem<AnyUnit>("k", "c", "f"), precision: 0, cutoff: 10 },
    { name: "Density", value: star.getDensity(), unit: "sd", to: checkSystem<AnyUnit>("sd", "kg/m3", "lbs/ft3") }
  ];

  return (
    <>
      <h1 className='text-center text-5xl max-w-lg mx-auto font-bold text-white m-5'>Star Systems</h1>

      <div className="flex flex-row gap-5">
        <Panel prose>

          <div className=" flex flex-row gap-2 mb-2 ">
            <UnitSelector />
            <div ref={errorBox} className="flex flex-col justify-center h-0 w-full text-red-500 border-red-500 rounded-lg overflow-hidden duration-700">
              <span className="mx-auto">Mass must be a number between 0.075 and 100 solar masses</span>
            </div>
          </div>

          <Table full headers={["Property", "Value", "Unit"]} bodyCss="[&>tr>td:nth-child(2)]:text-center">
            <Row>
              <Cell>
                <label htmlFor="nameInput">Name</label>
              </Cell>
              <Cell>
                <Input id="nameInput" type="text" className="w-32" onChange={(e) => setName(e.target.value)} defaultValue={starName} />
              </Cell>
              <Cell></Cell>
            </Row>
            <Row>
              <Cell>
                <label htmlFor="massInput">Mass</label>
              </Cell>
              <Cell>
                <Input id="massInput" type="number" min={0.075} max={100} defaultValue={1} onChange={(e) => checkMass(e)} />
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
              <QuantityRow {...x} showValue={mass !== 0} />
            ))}
            <Row>
              <Cell>
                Goldilocks Zone
              </Cell>
              <Cell>
                {
                  mass === 0 ? "-" : (
                    <>
                      <SciNotation value={convert(star.getHabitableZoneStart()).from("au").to(checkSystem("au", "km", "mi")).value} precision={checkSystem(3, 0)} /> - <SciNotation value={convert(star.getHabitableZoneEnd()).from("au").to(checkSystem("au", "km", "mi")).value} precision={checkSystem(3, 0)}/>
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
                  mass === 0 ? (
                    <ColorCircle color={"#000000"} />
                  ) : (
                    <span className="inline-flex items-center gap-2"><ColorCircle color={star.getColor()} /> <span>{star.getColor()}</span></span>
                  )
                }
              </Cell>
              <Cell></Cell>
            </Row>
          </Table>

        </Panel>

        <Canvas className="bg-black rounded-lg my-auto" style={{ height: "650px" }}>
          <StarBg count={50000} />

          <ambientLight intensity={0.5} color="white" />
          <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={20} />

          <Text color="white" position={[-8, 0.5 + Star.sol.getRadius(), 0]} anchorX="center" anchorY="middle" fontSize={1}>
            Sun
          </Text>

          <Text color="white" position={[8, 0.5 + star.getRadius(), 0]} anchorX="center" anchorY="middle" fontSize={1}>
            {starName}
          </Text>

          <StarDisplay star={Star.sol} position={[-8, 0, 0]} />
          <StarDisplay position={[8, 0, 0]} star={star} />
        </Canvas>
      </div>

      <Orbits/>
    </>
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

interface StarDisplayProps extends MeshProps {
  star: Star
}

function StarDisplay({ star, ...props }: StarDisplayProps) {

  const color = star.getColor();

  return (
    <mesh {...props}>
      <sphereGeometry args={[star.getRadius()]} />
      <meshStandardMaterial roughness={0} color={color} emissive={color} envMapIntensity={0.2} />
      <Glow scale={star.getRadius() * 1.5} near={-25} color={color} />
    </mesh>
  );
}

interface GlowProps {
  color: ColorRepresentation
  scale?: number
  near?: number
  far?: number
}

function Glow({ color, scale = 0.5, near = -2, far = 1.4 }: GlowProps) {
  return (
    <mesh>
      <circleGeometry args={[2 * scale, 16]} />
      <LayerMaterial
        transparent
        depthWrite={false}
        blending={CustomBlending}
        blendEquation={AddEquation}
        blendSrc={SrcAlphaFactor}
        blendDst={DstAlphaFactor}>
        <Depth colorA={color} colorB="black" alpha={1} mode="normal" near={near * scale} far={far * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={0.5} mode="add" near={-40 * scale} far={far * 1.2 * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={1} mode="add" near={-15 * scale} far={far * 0.7 * scale} origin={[0, 0, 0]} />
        <Depth colorA={color} colorB="black" alpha={1} mode="add" near={-10 * scale} far={far * 0.68 * scale} origin={[0, 0, 0]} />
      </LayerMaterial>
    </mesh>
  );
}


