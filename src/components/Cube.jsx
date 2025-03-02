import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = () => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="black" wireframe />
    </mesh>
  );
};

export default Cube;
