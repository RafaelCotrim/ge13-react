import { OrthographicCamera, Stars as StarBg, Text } from "@react-three/drei";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Depth, LayerMaterial } from "lamina";
import { useMemo, useState } from "react";
import { AddEquation, ColorRepresentation, CustomBlending, DstAlphaFactor, SrcAlphaFactor } from "three";
import { Star } from "../../models/Star";

export default function StarComparison( {star} : {star: Star}) {

  return (
    <Canvas className="bg-black rounded-lg my-auto" style={{ height: "650px" }}>
      <StarBg count={50000} />

      <ambientLight intensity={0.5} color="white" />
      <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={20} />

      <Text color="white" position={[-8, 0.5 + Star.sol.getRadius(), 0]} anchorX="center" anchorY="middle" fontSize={1}>
        Sun
      </Text>

      <Text color="white" position={[8, 0.5 + star.getRadius(), 0]} anchorX="center" anchorY="middle" fontSize={1}>
        {star.name}
      </Text>

      <StarDisplay star={Star.sol} position={[-8, 0, 0]} />
      <StarDisplay position={[8, 0, 0]} star={star} />
    </Canvas>
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
      {/* <Glow scale={star.getRadius() * 1.5} near={-25} color={color} /> */}
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


