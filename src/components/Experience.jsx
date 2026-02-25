import { MyRoom } from "./MyRoom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Experience = ({ section }) => {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        y: section === 0 ? 0 : -0.4,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [section]);

  return (
    <>
      <ambientLight intensity={1} />
      <group
        ref={groupRef}
        position={[1, 1.9, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <MyRoom section={section} />
      </group>
    </>
  );
};
