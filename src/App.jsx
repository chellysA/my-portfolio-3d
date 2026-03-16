import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Menu from "./components/Menu";
import { Leva } from "leva";
import { framerMotionConfig } from "./config";
import { Interface } from "./components/Interface";
import ScrollManager from "./components/ScrollManager";

function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="h-16 w-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 1.5, 7], fov: 42 }}
          onCreated={() => setIsLoading(false)}
        >
          <ScrollControls pages={5} damping={0.1}>
            <ScrollManager
              section={section}
              onSectionChage={setSection}
              menuOpened={menuOpened}
            />
            <Scroll>
              <Experience section={section} menuOpened={menuOpened} />
            </Scroll>
            <Scroll html>
              <Interface setSection={setSection} />
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          setSection={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
      </MotionConfig>
      <Leva hidden />
    </>
  );
}

export default App;
