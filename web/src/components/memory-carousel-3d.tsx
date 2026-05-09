"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const CARDS = [
  {
    title: "Session Memory",
    description: "Recall past conversations across every tool and agent.",
  },
  {
    title: "Knowledge Graphs",
    description: "Facts stored as structured, queryable relationships.",
  },
  {
    title: "Temporal Facts",
    description: "Track what changed, when, and why — over time.",
  },
  {
    title: "Semantic Search",
    description: "Find memories by meaning, not just keywords.",
  },
  {
    title: "Agent Sharing",
    description: "Multiple agents read and write the same memory space.",
  },
  {
    title: "Write Governance",
    description: "Every mutation logged, audited, and reversible.",
  },
];

function Card({
  position,
  rotation,
  title,
  description,
  opacity,
  scale,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  description: string;
  opacity: number;
  scale: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      <Html
        transform
        distanceFactor={6}
        style={{
          pointerEvents: "none",
          opacity,
          transition: "opacity 0.3s ease",
        }}
        scale={scale}
      >
        <div
          className="w-[200px] h-[240px] rounded-2xl border border-white/[0.08] bg-[#131210]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
          style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
        >
          <h3
            className="text-white/90 font-medium text-base mb-3"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            {title}
          </h3>
          <p
            className="text-white/40 text-xs leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {description}
          </p>
        </div>
      </Html>
    </group>
  );
}

function Carousel({ cardData }: { cardData: typeof CARDS }) {
  const groupRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const { gl } = useThree();

  const radius = 4;
  const count = cardData.length;

  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      velocityRef.current = 0;
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !groupRef.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      velocityRef.current = dx * 0.004;
      groupRef.current.rotation.y += dx * 0.004;
    };

    const onPointerUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
    };
  }, [gl]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (!isDragging.current) {
      groupRef.current.rotation.y += 0.003;
      velocityRef.current *= 0.95;
      groupRef.current.rotation.y += velocityRef.current;
    }
  });

  const cards = useMemo(() => {
    return cardData.map((card, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      return {
        ...card,
        position: [x, 0, z] as [number, number, number],
        rotation: [0, angle, 0] as [number, number, number],
      };
    });
  }, [cardData, count]);

  return (
    <group ref={groupRef}>
      {cards.map((card, i) => {
        const normalizedZ = (card.position[2] + radius) / (radius * 2);
        const opacity = 0.3 + normalizedZ * 0.7;
        const scale = 0.7 + normalizedZ * 0.3;

        return (
          <Card
            key={i}
            position={card.position}
            rotation={card.rotation}
            title={card.title}
            description={card.description}
            opacity={opacity}
            scale={scale}
          />
        );
      })}
    </group>
  );
}

export function MemoryCarousel3D({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.3} />
        <Carousel cardData={CARDS} />
      </Canvas>
    </div>
  );
}
