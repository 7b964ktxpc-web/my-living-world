import React,{useRef} from 'react';
import {Float,Text,useFrame} from '@react-three/fiber';
import {actionPhase} from '../game/heroActionAnimation';

export default function HeroActionAnimation3D({action,elapsed=0}){
 const arm=useRef(null);
 const phase=actionPhase(action,elapsed);
 useFrame(state=>{
  if(!arm.current)return;
  const t=state.clock.elapsedTime*9;
  arm.current.rotation.z=phase.state==='interact'?Math.sin(t)*.28:0;
 });
 if(!action||phase.state==='complete')return null;
 return <group position={[0,0.35,.15]}>
  <mesh ref={arm} position={[.32,.15,.1]}>
   <boxGeometry args={[.12,.42,.1]}/><meshStandardMaterial color="#f5f5f4"/>
  </mesh>
  <Float speed={1.4} floatIntensity={.07}>
   <Text position={[0,.72,0]} fontSize={.17} color="white" anchorX="center">{action.emoji} {action.label}</Text>
  </Float>
 </group>
}
