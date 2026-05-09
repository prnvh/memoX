"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

interface GraphNode {
  id: number;
  position: THREE.Vector3;
  size: number;
  color: string;
  label?: string;
}

const NODE_LABELS = [
  "User Preferences", "Meeting Notes", "Project Alpha", "Architecture",
  "Team Members", "Deadlines", "Decisions", "Code Review",
  "Tech Stack", "Goals 2026", "Feature Flags", "Embeddings",
  "Temporal Facts", "Wiki Pages", "Semantic Index", "Relations",
  "Patch History", "Agent Memory", "Session Log", "Knowledge Graph",
];

function generateGlobeGraph(nodeCount: number) {
  const nodes: GraphNode[] = [];
  const edges: [number, number][] = [];

  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const accentCount = Math.floor(nodeCount * 0.1);
  const accentSet = new Set<number>();
  while (accentSet.size < accentCount) {
    accentSet.add(Math.floor(Math.random() * nodeCount));
  }

  const hubIndices = [0, Math.floor(nodeCount * 0.25), Math.floor(nodeCount * 0.5), Math.floor(nodeCount * 0.75)];
  const labelledIndices = new Set<number>([...hubIndices]);
  while (labelledIndices.size < Math.min(12, nodeCount)) {
    labelledIndices.add(Math.floor(Math.random() * nodeCount));
  }

  let labelIdx = 0;
  for (let i = 0; i < nodeCount; i++) {
    const y = 1 - (i / (nodeCount - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = (2 * Math.PI * i) / goldenRatio;
    const r = 4.5;

    const isHub = hubIndices.includes(i);
    const hasLabel = labelledIndices.has(i);

    nodes.push({
      id: i,
      position: new THREE.Vector3(
        r * radiusAtY * Math.cos(theta),
        r * y,
        r * radiusAtY * Math.sin(theta)
      ),
      size: isHub ? 0.14 : 0.04 + Math.random() * 0.055,
      color: accentSet.has(i) ? "#d4af37" : isHub ? "#ffffff" : "#a0a0a0",
      label: hasLabel ? NODE_LABELS[labelIdx++ % NODE_LABELS.length] : undefined,
    });
  }

  for (const hub of hubIndices) {
    const spokeCount = 6 + Math.floor(Math.random() * 4);
    const sorted = nodes
      .map((n, idx) => ({ idx, dist: n.position.distanceTo(nodes[hub].position) }))
      .filter((d) => d.idx !== hub)
      .sort((a, b) => a.dist - b.dist);
    for (let j = 0; j < Math.min(spokeCount, sorted.length); j++) {
      edges.push([hub, sorted[j].idx]);
    }
  }

  for (let i = 0; i < nodeCount; i++) {
    const nearest = nodes
      .map((n, idx) => ({ idx, dist: n.position.distanceTo(nodes[i].position) }))
      .filter((d) => d.idx !== i)
      .sort((a, b) => a.dist - b.dist);
    const connectionCount = 1 + Math.floor(Math.random() * 2);
    for (let j = 0; j < Math.min(connectionCount, nearest.length); j++) {
      const pair: [number, number] = [Math.min(i, nearest[j].idx), Math.max(i, nearest[j].idx)];
      if (!edges.some(([a, b]) => a === pair[0] && b === pair[1])) {
        edges.push(pair);
      }
    }
  }

  return { nodes, edges };
}

function GlobeNodes({ nodes }: { nodes: GraphNode[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      const c = new THREE.Color(node.color);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    });
    return arr;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    nodes.forEach((node, i) => {
      dummy.position.copy(node.position);
      dummy.position.y += Math.sin(t * 0.4 + i * 0.8) * 0.03;
      dummy.scale.setScalar(node.size * 10);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
      <sphereGeometry args={[0.1, 24, 24]} />
      <meshStandardMaterial
        vertexColors
        emissive="#222"
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.7}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colorArray, 3]}
      />
    </instancedMesh>
  );
}

function NodeLabels({ nodes }: { nodes: GraphNode[] }) {
  const labelledNodes = useMemo(() => nodes.filter((n) => n.label), [nodes]);
  return (
    <>
      {labelledNodes.map((node) => (
        <Html
          key={node.id}
          position={[node.position.x, node.position.y + 0.35, node.position.z]}
          center
          distanceFactor={12}
          style={{ pointerEvents: "none" }}
        >
          <div
            className="whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] tracking-wide"
            style={{
              color: node.color === "#d4af37" ? "rgba(212,175,55,0.7)" : "rgba(255,255,255,0.35)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {node.label}
          </div>
        </Html>
      ))}
    </>
  );
}

function GlobeEdges({ nodes, edges }: { nodes: GraphNode[]; edges: [number, number][] }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions[i * 6] = nodes[a].position.x;
      positions[i * 6 + 1] = nodes[a].position.y;
      positions[i * 6 + 2] = nodes[a].position.z;
      positions[i * 6 + 3] = nodes[b].position.x;
      positions[i * 6 + 4] = nodes[b].position.y;
      positions[i * 6 + 5] = nodes[b].position.z;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [nodes, edges]);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.08 + Math.sin(clock.getElapsedTime() * 0.3) * 0.03;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
    </lineSegments>
  );
}

function GlobeWireframe() {
  return (
    <mesh>
      <sphereGeometry args={[4.5, 32, 32]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.018} />
    </mesh>
  );
}

function Scene({ nodeCount }: { nodeCount: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, edges } = useMemo(() => generateGlobeGraph(nodeCount), [nodeCount]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <GlobeWireframe />
      <GlobeNodes nodes={nodes} />
      <GlobeEdges nodes={nodes} edges={edges} />
      <NodeLabels nodes={nodes} />
    </group>
  );
}

interface MemoryGraph3DProps {
  className?: string;
  nodeCount?: number;
}

export function MemoryGraph3D({ className = "", nodeCount = 120 }: MemoryGraph3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[8, 8, 8]} intensity={0.6} />
        <pointLight position={[-6, -4, -8]} intensity={0.2} color="#d4af37" />
        <Scene nodeCount={nodeCount} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI * 0.7}
          minPolarAngle={Math.PI * 0.3}
        />
      </Canvas>
    </div>
  );
}
