import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Sphere = () => {
  const meshRef = useRef();
  let ySpeed = 0.02;

  useFrame(() => {
    if (meshRef.current.position.y > 1.5 || meshRef.current.position.y < -1.5) {
      ySpeed = -ySpeed;
    }
    meshRef.current.position.y += ySpeed;
  });

  return (
    <mesh ref={meshRef} position={[3, 1, 0]}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial  color="black" />
    </mesh>
  );
};

export default Sphere;
