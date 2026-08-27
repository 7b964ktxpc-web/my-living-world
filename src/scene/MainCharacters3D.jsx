import React from 'react';
import {Float,Text} from '@react-three/drei';
import {mainCharacters} from '../game/mainCharacters';

function MainCharacter({character,selected,onSelect}){
  const h=character.heightScale;
  const accent=character.accent==='sky'?'#dbeafe':'#bfdbfe';
  return <group position={[character.id==='slava'?-0.7:0.7,-1.25,0]} scale={[h,h,h]} onClick={e=>{e.stopPropagation();onSelect?.(character.id)}}>
    <group position={[0,1.2,0]}>
      <mesh position={[0,0.75,0]}><sphereGeometry args={[.29,20,20]}/><meshStandardMaterial color="#f3c79f"/></mesh>
      <mesh position={[0,0.86,-.03]}><sphereGeometry args={[.25,20,12]}/><meshStandardMaterial color="#b7783b"/></mesh>
      <mesh position={[0,.42,0]}><boxGeometry args={[.56,.72,.34]}/><meshStandardMaterial color="#f5f5f4"/></mesh>
      <mesh position={[-.17,.0,0]}><boxGeometry args={[.18,.68,.23]}/><meshStandardMaterial color="#e7e5e4"/></mesh>
      <mesh position={[.17,.0,0]}><boxGeometry args={[.18,.68,.23]}/><meshStandardMaterial color="#e7e5e4"/></mesh>
      <mesh position={[-.15,-.39,.02]}><boxGeometry args={[.18,.22,.3]}/><meshStandardMaterial color="#f8fafc"/></mesh>
      <mesh position={[.15,-.39,.02]}><boxGeometry args={[.18,.22,.3]}/><meshStandardMaterial color="#f8fafc"/></mesh>
      <mesh position={[0,.5,.19]}><boxGeometry args={[.08,.08,.03]}/><meshStandardMaterial color={accent}/></mesh>
    </group>
    {selected&&<mesh position={[0,.05,0]} scale={[1.22,1.02,1.22]}><ringGeometry args={[.45,.49,32]}/><meshBasicMaterial color="#60a5fa"/></mesh>}
    <Float speed={1.1} floatIntensity={.05}><Text position={[0,2.0,0]} fontSize={.18} color="white" anchorX="center">{character.name}</Text></Float>
  </group>
}

export default function MainCharacters3D({selectedId,onSelect}){
  return <group>{mainCharacters().map(c=><MainCharacter key={c.id} character={c} selected={selectedId===c.id} onSelect={onSelect}/>)}</group>
}
