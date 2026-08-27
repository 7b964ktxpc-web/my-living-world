import React,{useEffect,useRef,useState} from 'react';
import {Float,Text,useFrame} from '@react-three/drei';
import {mainCharacters} from '../game/mainCharacters';
import {heroPairBehavior} from '../game/mainCharacterBehavior';

function MainCharacter({character,selected,behavior,onSelect}){
  const h=character.heightScale;
  const accent=character.accent==='sky'?'#dbeafe':'#bfdbfe';
  const root=useRef(null);
  const body=useRef(null);
  useFrame((state)=>{
    const t=state.clock.elapsedTime*behavior.speed;
    const bounce=Math.abs(Math.sin(t*5))*behavior.bounce;
    const sway=Math.sin(t*2.5)*behavior.sway;
    if(root.current) root.current.position.y=bounce;
    if(body.current) body.current.rotation.z=sway;
  });
  return <group ref={root} position={[character.id==='slava'?-0.72:0.72,-1.25,0]} scale={[h,h,h]} onClick={e=>{e.stopPropagation();onSelect?.(character.id)}}>
    <group ref={body} position={[0,1.2,0]}>
      <mesh position={[0,0.75,0]}><sphereGeometry args={[.29,20,20]}/><meshStandardMaterial color="#f3c79f"/></mesh>
      <mesh position={[0,0.86,-.03]}><sphereGeometry args={[.25,20,12]}/><meshStandardMaterial color="#b7783b"/></mesh>
      <mesh position={[0,.42,0]}><boxGeometry args={[.56,.72,.34]}/><meshStandardMaterial color="#f5f5f4"/></mesh>
      <mesh position={[-.17,.0,0]}><boxGeometry args={[.18,.68,.23]}/><meshStandardMaterial color="#e7e5e4"/></mesh>
      <mesh position={[.17,.0,0]}><boxGeometry args={[.18,.68,.23]}/><meshStandardMaterial color="#e7e5e4"/></mesh>
      <mesh position={[-.15,-.39,.02]}><boxGeometry args={[.18,.22,.3]}/><meshStandardMaterial color="#f8fafc"/></mesh>
      <mesh position={[.15,-.39,.02]}><boxGeometry args={[.18,.22,.3]}/><meshStandardMaterial color="#f8fafc"/></mesh>
      <mesh position={[0,.5,.19]}><boxGeometry args={[.08,.08,.03]}/><meshStandardMaterial color={accent}/></mesh>
      <mesh position={[-.32,.45,-.06]}><boxGeometry args={[.12,.42,.08]}/><meshStandardMaterial color="#111827"/></mesh>
    </group>
    {selected&&<mesh position={[0,.05,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.45,.49,32]}/><meshBasicMaterial color="#60a5fa"/></mesh>}
    <Float speed={1.1} floatIntensity={.05}><Text position={[0,2.0,0]} fontSize={.18} color="white" anchorX="center">{selected?'⭐ ':''}{character.name}</Text></Float>
  </group>
}

export default function MainCharacters3D({selectedId,onSelect,activity='idle'}){
  const [active,setActive]=useState(selectedId||'slava');
  useEffect(()=>{if(selectedId)setActive(selectedId)},[selectedId]);
  const choose=id=>{setActive(id);onSelect?.(id)};
  const pair=heroPairBehavior(active,activity);
  return <group>{mainCharacters().map(c=><MainCharacter key={c.id} character={c} selected={active===c.id} behavior={c.id===active?pair.active:pair.companion} onSelect={choose}/>)}</group>
}
