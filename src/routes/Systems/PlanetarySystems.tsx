import { OrthographicCamera, Stars as StarBg, Text } from "@react-three/drei";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Depth, LayerMaterial } from "lamina";
import { ChangeEvent, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AddEquation, ColorRepresentation, CustomBlending, DstAlphaFactor, SrcAlphaFactor } from "three";
import { SciNotation } from "../../components/SciNotation";
import { Cell, Row } from "../../components/Table";
import { Star } from "../../models/Star";
import { SystemContext } from "../../providers/SystemProvider";
import { round } from "../../utils/Math";
import { AnyUnit, convert, unitName } from "../../utils/Units";
import Orbits from "./Orbits";
import StarComparison from "./StarComparison";
import StarProperties from "./StarProperties";

interface PlanetarySystemProps{
  mass: number,
  setMass: (newUnit: number) => void
}

export function PlanetarySystem() {

  const errorBox = useRef<HTMLDivElement>(null);

  const [star, setStar] = useState(new Star(1, "Your Star"));

  return (
    <>
      <h1 className='text-center text-5xl max-w-lg mx-auto font-bold text-white m-5'>Planetary Systems</h1>

      <div className="flex flex-row gap-5">
        <StarProperties star={star} setStar={(star) => setStar(star)}/>
        <StarComparison star={star}/>
      </div>

      <Orbits star={star}/>
    </>
  );
}

