import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
export const Background = () => {
  const color = useRef({
    color: "#ffffff",
  });
  const data = useScroll();
  const { gl } = useThree();

  const tl = useRef();

  useFrame(() => {
    if (!tl.current) return;
    // Map scroll (0..1) -> páginas (0..pages-1)
    const currentPage = data.scroll.current * (data.pages - 1);
    // 5 bloques de color, uno por sección (0..4)
    const maxColorPage = 4;
    const clampedPage = Math.min(currentPage, maxColorPage);
    const progress = maxColorPage === 0 ? 0 : clampedPage / maxColorPage;

    tl.current.progress(progress);
    gl.setClearColor(new THREE.Color(color.current.color));
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, {
      // Sección 0: rosa pastel suave
      color: "#e9dfe6",
    });
    tl.current.to(color.current, {
      // Sección 1: lila claro
      color: "#ffffff",
    });
    tl.current.to(color.current, {
      // Sección 2: rosa muy suave (Projects)
      color: "#ffffff",
    });
    tl.current.to(color.current, {
      // Sección 3: otro tono rosa/lila (Certifications)
      color: "#fffeee",
    });
    tl.current.to(color.current, {
      // Sección 4: blanco puro (Contact)
      color: "#d2beef",
    });
  }, []);

  return null;
};
