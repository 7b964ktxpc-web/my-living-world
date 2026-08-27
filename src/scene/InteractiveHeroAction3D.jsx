import React,{useRef} from 'react';
import {Float,Text,useFrame} from '@react-three/fiber';
import {heroActionFor,actionPhase} from '../game/heroActionAnimation';

export default function InteractiveHeroAction3D({objectType,elapsed=0}){
  const hand=useRef(null);
  const action=heroActionFor(objectType);
  const phase=actionPhase(action,elapsed);
  useFrame(state=>{
    if(!hand.current)return;
    const t=state.clock.elapsedTime*8;
    const active=phase.state==='interact';
    hand.current.rotation.z=active?Math.sin(t)*.3:0;
    hand.current.position.y=active?.22:0;
  });
  if(!action||phase.state==='complete')return null;
  return <group position={[0,0.28,.2]}>
    <mesh ref={hand} position={[.3,.05,.08]}>
      <boxGeometry args={[.1,.34,.09]}/><meshStandardMaterial color="#f5f5f4"/>
    </mesh>
    <Float speed={1.5} floatIntensity={.06}>
      <Text position={[0,.62,0]} fontSize={.16} color="white" anchorX="center">{action.emoji} {action.label}</Text>
    </Float>
  </group>;
}
