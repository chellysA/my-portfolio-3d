import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScrollManager = (props) => {
  const { section, onSectionChage, menuOpened } = props;
  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  // Evitar scroll (rueda y touch) cuando el menú está abierto
  useEffect(() => {
    const el = data.el;
    if (!el) return;
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    if (menuOpened) {
      el.addEventListener("wheel", preventScroll, { passive: false });
      el.addEventListener("touchmove", preventScroll, { passive: false });
    }
    return () => {
      el.removeEventListener("wheel", preventScroll);
      el.removeEventListener("touchmove", preventScroll);
    };
  }, [menuOpened, data.el]);

  useEffect(() => {
    if (!data.el) return;
    isAnimating.current = true;
    const targetScrollTop = section * data.el.clientHeight;
    gsap.to(data.el, {
      scrollTop: targetScrollTop,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current || menuOpened) {
      lastScroll.current = data.scroll.current;
      return;
    }
    // Histéresis: evita cambiar de sección en el límite (evita parpadeo Falling)
    const raw = data.scroll.current * data.pages;
    const bias = 0.12; // solo cambiamos cuando hemos entrado ~12% en la nueva página
    const currSection = Math.min(
      data.pages - 1,
      Math.max(0, Math.floor(raw + bias)),
    );
    if (currSection !== section) {
      onSectionChage(currSection);
    }
    lastScroll.current = data.scroll.current;
  });
  return null;
};

export default ScrollManager;
