import { OrthographicCamera, Stars as StarBg, Text } from "@react-three/drei";
import { Canvas, MeshProps, ReactThreeFiber } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Vector3 } from "three";
import { Star } from "../../models/Star";

const textSpacing = 1;
const translationFactor = 0.3;
const scalingDenominator = 650;

export default function StarComparison({ star, className }: { star: Star, className?: string }) {

  const [screenWidth, setScreenWidth] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))

  useEffect(() => window.addEventListener('resize', () => {
    setScreenWidth(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
  }), []);

  var sunPos: Vector3;
  var starPos: Vector3;
  var scale = screenWidth > scalingDenominator ? 1 : screenWidth / scalingDenominator;

  if (screenWidth <= 900) {
    sunPos = new Vector3(0, 13, 0);
    starPos = new Vector3(0, -6, 0);
  } else {
    sunPos = new Vector3(-8 - translationFactor * star.getRadius(), 0, 0);
    starPos = new Vector3(8 - translationFactor * star.getRadius(), 0, 0);
  }

  return (
    <Canvas className={twMerge("bg-black rounded-lg my-auto", className)}>
      <StarBg count={50000} />

      <ambientLight intensity={0.5} color="white" />
      <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={20} />

      <Text color="white" position={[sunPos.x, sunPos.y + textSpacing + Star.sol.getRadius() * scale, sunPos.z]} anchorX="center" anchorY="middle" fontSize={1}>
        Sun
      </Text>

      <Text color="white" position={[starPos.x, starPos.y + textSpacing + star.getRadius() * scale, starPos.z]} anchorX="center" anchorY="middle" fontSize={1}>
        {star.name}
      </Text>

      <StarDisplay star={Star.sol} position={sunPos} scale={scale} />
      <StarDisplay position={starPos} star={star} scale={scale} />
    </Canvas>
  );
}

interface StarDisplayProps extends MeshProps {
  star: Star,
  scale: number
}

function StarDisplay({ star, scale, ...props }: StarDisplayProps) {

  const color = star.getColor();

  return (
    <mesh {...props}>
      <sphereGeometry args={[star.getRadius() * scale]} />
      <meshStandardMaterial roughness={0} color={color} emissive={color} envMapIntensity={0.2} />
      {/* <Glow scale={star.getRadius() * 1.5} near={-25} color={color} /> */}
    </mesh>
  );
}

// interface GlowProps {
//   color: ColorRepresentation
//   scale?: number
//   near?: number
//   far?: number
// }

// function Glow({ color, scale = 0.5, near = -2, far = 1.4 }: GlowProps) {
//   return (
//     <mesh>
//       <circleGeometry args={[2 * scale, 16]} />
//       <LayerMaterial
//         transparent
//         depthWrite={false}
//         blending={CustomBlending}
//         blendEquation={AddEquation}
//         blendSrc={SrcAlphaFactor}
//         blendDst={DstAlphaFactor}>
//         <Depth colorA={color} colorB="black" alpha={1} mode="normal" near={near * scale} far={far * scale} origin={[0, 0, 0]} />
//         <Depth colorA={color} colorB="black" alpha={0.5} mode="add" near={-40 * scale} far={far * 1.2 * scale} origin={[0, 0, 0]} />
//         <Depth colorA={color} colorB="black" alpha={1} mode="add" near={-15 * scale} far={far * 0.7 * scale} origin={[0, 0, 0]} />
//         <Depth colorA={color} colorB="black" alpha={1} mode="add" near={-10 * scale} far={far * 0.68 * scale} origin={[0, 0, 0]} />
//       </LayerMaterial>
//     </mesh>
//   );
// }


