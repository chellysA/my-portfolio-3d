import { useFrame, useThree } from "@react-three/fiber";
import { certifications } from "../constants/certifications";
import { Image, Text } from "@react-three/drei";
import { atom, useAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const MAX_TITLE_LENGTH = 16;

const truncateTitle = (title) => {
  const t = title.toUpperCase();
  return t.length > MAX_TITLE_LENGTH ? t.slice(0, MAX_TITLE_LENGTH) + "…" : t;
};

const OPACITY_NORMAL = 0.35;
const OPACITY_HIGHLIGHTED = 0.85;

const HEX_PINK_PASTEL = 0xffb7ce;
const HEX_HIGHLIGHTED_PASTEL = 0xbf91e7;

const CertificationCard = (props) => {
  const { item, highlighted } = props;
  const background = useRef();
  const bgOpacityRef = useRef({
    value: highlighted ? OPACITY_HIGHLIGHTED : OPACITY_NORMAL,
  });
  const bgColorHexRef = useRef({
    value: highlighted ? HEX_HIGHLIGHTED_PASTEL : HEX_PINK_PASTEL,
  });

  useEffect(() => {
    const opacity = highlighted ? OPACITY_HIGHLIGHTED : OPACITY_NORMAL;
    const colorHex = highlighted ? HEX_HIGHLIGHTED_PASTEL : HEX_PINK_PASTEL;
    bgOpacityRef.current.value = opacity;
    bgColorHexRef.current.value = colorHex;
  }, [highlighted]);

  const material = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: highlighted ? OPACITY_HIGHLIGHTED : OPACITY_NORMAL,
      color: new THREE.Color(
        highlighted ? HEX_HIGHLIGHTED_PASTEL : HEX_PINK_PASTEL,
      ),
    });
    return m;
  }, []);

  useFrame(() => {
    if (material) {
      material.opacity = bgOpacityRef.current.value;
      material.color.setHex(bgColorHexRef.current.value);
    }
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.003}
        onClick={() => window.open(item.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <primitive object={material} attach="material" />
      </mesh>
      <Image
        url={item.img}
        scale={[2, 1.2, 1]}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2.1}
        anchorX="left"
        anchorY="top"
        fontSize={0.18}
        fontWeight="bold"
        position={[-1.05, -0.42, 0]}
        color="black"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {truncateTitle(item.title)}
      </Text>
      <Text
        maxWidth={2.1}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        lineHeight={1.2}
        position={[-1.05, -0.72, 0]}
        color="black"
      >
        {item.desc}
      </Text>
    </group>
  );
};

export const currentCertificationAtom = atom(
  Math.floor(certifications.length / 2),
);

const Certifications = () => {
  const { viewport } = useThree();
  const [currentCertification, setCurrentCertification] = useAtom(
    currentCertificationAtom,
  );
  const groupRefs = useRef([]);

  useEffect(() => {
    groupRefs.current.forEach((group, index) => {
      if (!group) return;
      const isHighlighted = currentCertification === index;
      gsap.to(group.position, {
        x: 0 + (index - currentCertification) * 2.5,
        y: isHighlighted ? 0 : -0.1,
        z: isHighlighted ? -2 : -3,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(group.rotation, {
        x: isHighlighted ? 0 : -Math.PI / 3,
        z: isHighlighted ? 0 : -0.1 * Math.PI,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }, [currentCertification]);

  return (
    <group position-y={-viewport.height * 3 - 0.3}>
      {certifications.map((item, index) => (
        <group
          key={"certification_" + index}
          ref={(el) => (groupRefs.current[index] = el)}
          position={[index * 2.5, 0, -3]}
        >
          <CertificationCard
            item={item}
            highlighted={index === currentCertification}
          />
        </group>
      ))}
    </group>
  );
};

export default Certifications;

