import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScrollManager = (props) => {
  const { section, onSectionChage } = props;
  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  });

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }
    const currSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > lastScroll.current && currSection === 0) {
      onSectionChage(1);
    }
    if (
      data.scroll.current < lastScroll.current &&
      data.scroll.current < 1 / (data.pages - 1)
    ) {
      onSectionChage(0);
    }
    lastScroll.current = data.scroll.current;
  });
  return null;
};

export default ScrollManager;
