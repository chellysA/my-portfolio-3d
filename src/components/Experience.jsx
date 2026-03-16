import { MyRoom } from "./MyRoom";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sparkles,
} from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useFrame, useThree } from "@react-three/fiber";
import Projects from "./Projects";
import Certifications from "./Certifications";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Background } from "./Background";

// Centro del grupo habitación+avatar (target del orbit)
const ROOM_TARGET = new THREE.Vector3(1, 1.9, 3);

// Desplazamiento vertical del grupo principal por sección
const GROUP_Y_BY_SECTION = [0, -0.4, -0.8, -0.8, -1.2];

export const Experience = ({ section, menuOpened }) => {
  const groupRef = useRef();
  const roomOrbitGroupRef = useRef();
  const bgRef = useRef();
  const avatarContainerRef = useRef();
  const { viewport, gl, size } = useThree();
  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  const prevMenuOpenedRef = useRef(menuOpened);
  const prevSectionRef = useRef(0);
  const cameraRef = useRef({ x: 0, lookAtX: 0 });
  const orbitControlsRef = useRef(null);
  const dummyCameraRef = useRef(null);
  const bgScaleAnimatedRef = useRef(false);
  const orbitEnabled = section === 0 && !menuOpened;
  const isMobile = useMemo(() => size.width < 768, [size.width]);
  const responsiveRatio = viewport.width / 12;
  const myRoomScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const dummyCamera = useMemo(() => {
    const cam = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
    cam.position.copy(ROOM_TARGET).add(new THREE.Vector3(0, 0, 5));
    cam.lookAt(ROOM_TARGET);
    return cam;
  }, []);

  useEffect(() => {
    gsap.to(cameraRef.current, {
      x: menuOpened ? -2 : 0,
      lookAtX: menuOpened ? 3 : 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, [menuOpened]);

  useEffect(() => {
    if (!orbitEnabled) {
      if (orbitControlsRef.current) {
        orbitControlsRef.current.dispose();
        orbitControlsRef.current = null;
      }

      return;
    }
    dummyCamera.position.copy(ROOM_TARGET).add(new THREE.Vector3(0, 0, 5));
    dummyCamera.lookAt(ROOM_TARGET);
    if (roomOrbitGroupRef.current) {
      roomOrbitGroupRef.current.rotation.set(0, 0, 0);
      roomOrbitGroupRef.current.scale.set(1, 1, 1);
    }

    const controls = new OrbitControls(dummyCamera, document.body);
    controls.target.copy(ROOM_TARGET);
    // Desactivamos el zoom nativo para no romper el scroll
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 10;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minAzimuthAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 2;
    orbitControlsRef.current = controls;
    dummyCameraRef.current = dummyCamera;

    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    return () => {
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      controls.dispose();
      orbitControlsRef.current = null;
    };
  }, [orbitEnabled, gl.domElement, dummyCamera]);

  useFrame((state, delta) => {
    state.camera.position.x = cameraRef.current.x;
    state.camera.lookAt(cameraRef.current.lookAtX, 0, 0);
    const g = roomOrbitGroupRef.current;
    if (orbitEnabled && orbitControlsRef.current && g) {
      orbitControlsRef.current.update(delta);
      const cam = dummyCameraRef.current;
      if (cam) {
        const v = new THREE.Vector3().subVectors(cam.position, ROOM_TARGET);
        const radius = v.length();
        if (radius > 0.001) {
          const theta = Math.atan2(v.x, v.z);
          const phi = Math.acos(Math.max(-1, Math.min(1, v.y / radius)));
          g.rotation.y = -theta;
          g.rotation.x = -(phi - Math.PI / 2);
        }
        g.scale.set(1, 1, 1);
      }
    } else if (g) {
      g.rotation.set(0, 0, 0);
      g.scale.set(1, 1, 1);
    }
  });

  useEffect(() => {
    const prevMenuOpened = prevMenuOpenedRef.current;
    prevMenuOpenedRef.current = menuOpened;
    const prevSection = prevSectionRef.current;
    prevSectionRef.current = section;

    const finalAnimation =
      section === 0
        ? "Typing"
        : section === 1
          ? "StandingGreeting"
          : section === 2 || section === 3
            ? "Standing"
            : "Thankful";

    // 1) Acabamos de abrir el menú:
    //    - en sección 0: mantener Typing
    //    - en otras secciones: StandingIdle
    if (menuOpened && !prevMenuOpened) {
      if (section === 0) {
        setCharacterAnimation("Typing");
      } else {
        setCharacterAnimation("StandingIdle");
      }
      return;
    }

    // 2) Acabamos de cerrar el menú: ajustar a la animación de la sección actual
    if (!menuOpened && prevMenuOpened) {
      if (characterAnimation !== finalAnimation) {
        setCharacterAnimation(finalAnimation);
      }
      return;
    }

    // 3) Cambio de sección con el menú cerrado: aplicar la animación de destino solo entonces
    if (!menuOpened && section !== prevSection) {
      if (characterAnimation !== finalAnimation) {
        setCharacterAnimation(finalAnimation);
      }
    }
  }, [section, menuOpened, characterAnimation]);

  useEffect(() => {
    if (groupRef.current) {
      const groupY = GROUP_Y_BY_SECTION[section] ?? 0;
      gsap.to(groupRef.current.position, {
        y: groupY,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: menuOpened ? 0 : -0.003,
        y: menuOpened ? -Math.PI / 3 : -Math.PI / 4,
        z: menuOpened ? 0 : -0.07,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (bgRef.current) {
      const bg = bgRef.current;

      // Posición por sección (el grupo ya nace a la izquierda, así evitamos que arranque en el centro)
      gsap.to(bg.position, {
        x: section === 0 ? -viewport.width * 1.3 : 0,
        z: section === 1 ? 0 : -10,
        y: section === 1 ? -viewport.height : -1.5,
        duration: 0.8,
        ease: "power2.out",
      });

      // Primera vez: solo hacemos scale in desde 0 → 1
      if (!bgScaleAnimatedRef.current) {
        bgScaleAnimatedRef.current = true;
        bg.scale.set(0, 0, 0);
        gsap.to(bg.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
        });
      }
    }

    // avatarContainerRef: transición por sección (pos, rot, scale)
    if (avatarContainerRef.current) {
      const g = avatarContainerRef.current;
      const duration = 0.6;
      const ease = "power2.out";

      const avatarConfigs = [
        {
          position: { x: -0.75, y: 0.15, z: -0.2 },
          rotation: { x: 0, y: (12 * Math.PI) / 8, z: 0 },
          scale: { x: 0.868, y: 0.868, z: 0.868 },
        },
        {
          position: {
            x: 0,
            y: isMobile ? -viewport.height + 0.4 : -viewport.height - 0.8,
            z: isMobile ? 2 : 3,
          },
          rotation: { x: 0, y: 0, z: 0 },
          scale: {
            x: isMobile ? 1 : 1.5,
            y: isMobile ? 1 : 1.5,
            z: isMobile ? 1 : 1.5,
          },
        },
        {
          position: {
            x: isMobile ? 1.2 : 2,
            y: isMobile
              ? -viewport.height * 2 + -2.1
              : -viewport.height * 2 + -1.5,
            z: isMobile ? -0.2 : 1,
          },
          rotation: { x: 0, y: -1.2, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
        {
          position: {
            x: isMobile ? -0.8 : -3,
            y: isMobile ? -viewport.height * 3.2 : -viewport.height * 3.3,
            z: 2,
          },
          rotation: { x: 0, y: 2.5, z: 0 },
          scale: {
            x: isMobile ? 0.8 : 1.5,
            y: isMobile ? 0.8 : 1.5,
            z: isMobile ? 0.8 : 1.5,
          },
        },
        {
          position: {
            x: isMobile ? 0.7 : 1,
            y: isMobile
              ? -viewport.height * 4 - 2.9
              : -viewport.height * 4 - 1.7,
            z: isMobile ? 1 : 1.5,
          },
          rotation: { x: 0, y: -0.1, z: 0 },
          scale: {
            x: isMobile ? 1.8 : 2.2,
            y: isMobile ? 1.8 : 2.2,
            z: isMobile ? 1.8 : 2.2,
          },
        },
      ];

      const cfg = avatarConfigs[section];
      if (cfg) {
        const { position, rotation, scale } = cfg;
        gsap.to(g.position, { ...position, duration, ease });
        gsap.to(g.rotation, { ...rotation, duration, ease });
        gsap.to(g.scale, { ...scale, duration, ease });
      }
    }
  }, [section, menuOpened, viewport.height, viewport.width]);

  return (
    <>
      <Background />
      <ambientLight intensity={1} />
      {section !== 0 && (
        <group ref={avatarContainerRef}>
          <Avatar animation={characterAnimation} section={section} />
        </group>
      )}
      <group
        ref={groupRef}
        position={[isMobile ? 0 : 1, isMobile ? -viewport.height / 6 : 1.9, 3]}
        scale={[myRoomScaleRatio, myRoomScaleRatio, myRoomScaleRatio]}
        rotation={
          menuOpened ? [0, -Math.PI / 4, 0] : [-0.003, -Math.PI / 4, -0.07]
        }
      >
        {" "}
        <group ref={roomOrbitGroupRef}>
          {section === 0 && (
            <group ref={avatarContainerRef}>
              <Avatar animation={characterAnimation} section={section} />
            </group>
          )}
          <MyRoom section={section} />
        </group>
      </group>
      {/* SKILLS */}
      <group
        ref={bgRef}
        // Ya nacen a la izquierda y con scale 0 para que nunca se vean en el centro en el primer frame
        position={[-viewport.width * 1.3, -1.5, -10]}
        scale={[0, 0, 0]}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float speed={3} rotationIntensity={1.5} floatIntensity={1}>
          <group position={[1, -3, -15]}>
            <Sparkles
              count={100}
              scale={5}
              size={8}
              speed={0.5}
              color="#ffb7ce"
            />

            <mesh scale={[2, 2, 2]}>
              <sphereGeometry args={[1, 32, 32]} />
              <MeshDistortMaterial
                opacity={
                  1
                } /* Quitamos la transparencia para que se vea el color */
                transparent={false}
                distort={0.4}
                speed={4}
                color="#ffb7ce" /* Rosa Pastel */
                emissive="#ffb7ce" /* Esto hace que brille */
                emissiveIntensity={0.5} /* Intensidad del brillo */
                roughness={0.2} /* Lo hace ver tipo "glossy" o pulido */
                metalness={0.1}
              />
            </mesh>
          </group>
        </Float>
        <Float speed={3} floatIntensity={2}>
          <group position={[3, 1, -18]}>
            <Sparkles
              count={80}
              scale={6}
              size={10}
              speed={1.2}
              color="#fdfd96"
            />
            <mesh scale={[2.5, 2.5, 2.5]}>
              {/* Icosahedron lo hace ver como un cristal facetado */}
              <icosahedronGeometry args={[1, 0]} />
              <MeshDistortMaterial
                opacity={1}
                distort={0.5}
                speed={5}
                color="#fdfd96"
                emissive="#fdfd96"
                emissiveIntensity={0.4}
                roughness={0.1}
              />
            </mesh>
          </group>
        </Float>
        <Float speed={4}>
          <group position={[-4, 2, -12]}>
            <Sparkles count={120} scale={4} size={5} color="#c3aed6" />
            <mesh scale={[1.8, 1.8, 1.8]}>
              {/* Octahedron es como un diamante de dos puntas */}
              <octahedronGeometry />
              <MeshWobbleMaterial
                factor={0.8}
                speed={3}
                color="#c3aed6"
                emissive="#c3aed6"
                emissiveIntensity={0.5}
                roughness={0.2}
              />
            </mesh>
          </group>
        </Float>
      </group>
      <Projects />
      <Certifications />
    </>
  );
};
