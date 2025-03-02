import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Torus = () => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={meshRef} position={[-3, 0, 0]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="black" wireframe />
    </mesh>
  );
};

export default Torus;
