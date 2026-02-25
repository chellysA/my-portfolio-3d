import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/interface";
import ScrollManager from "./components/ScrollManager";
import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Menu from "./components/Menu";

function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);
  return (
    <>
      <MotionConfig
        transition={{
          type: "spring",
          mass: 5,
          stiffness: 500,
          damping: 50,
          restDelta: 0.0001,
        }}
      >
        <Canvas shadows camera={{ position: [0, 1.5, 7], fov: 42 }}>
          <color attach="background" args={["#ececec"]} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChage={setSection} />
            <Scroll>
              <Experience section={section} />
            </Scroll>
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          setSection={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
      </MotionConfig>
    </>
  );
}

export default App;
