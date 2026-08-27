import React,{useEffect,useRef,useState} from 'react';
import {Float,Text,useFrame} from '@react-three/drei';
import {mainCharacters} from '../game/mainCharacters';
import {heroPairBehavior} from '../game/mainCharacterBehavior';
import {navigationState,companionTarget} from '../game/mainCharacterNavigation';
import {choreographyFor} from '../game/heroActionChoreography';

function MainCharacter({character,selected,behavior,target,action='observe',onSelect}){
  const h=character.heightScale;
  const accent=character.accent==='sky'?'#dbeafe':'#bfdbfe';
  const root=useRef(null);
  const body=useRef(null);
  const current=useRef({x:character.id==='slava'?-0.72:0.72,z:0});
  useEffect(()=>{current.current={x:character.id==='slava'?-0.72:0.72,z:0}},[character.id]);
  useFrame((state,delta)=>{
    const nav=navigationState(character.id,target,current.current);
    const speed=behavior.speed||0;
    if(speed>0&&!nav.reached){
      const step=Math.min(1,delta*speed);
      current.current.x+=nav.dx*step;
      current.current.z+=nav.dz*step;
      if(root.current){root.current.position.x=current.current.x;root.current.position.z=current.current.z;}
      if(root.current&&Math.hypot(nav.dx,nav.dz)>.03)root.current.rotation.y=Math.atan2(nav.dx,nav.dz);
    }
    const t=state.clock.elapsedTime;
    const bounce=Math.abs(Math.sin(t*5))*behavior.bounce;
    const sway=Math.sin(t*2.5)*behavior.sway;
    const actionPulse=action==='press'||action==='signal'?Math.sin(t*8)*.07:action==='assist'||action==='load'?Math.sin(t*5)*.04:action==='inspect'||action==='discover'?Math.sin(t*3)*.025:0;
    if(root.current)root.current.position.y=bounce+(action==='celebrate'?Math.abs(Math.sin(t*8))*.12:0);
    if(body.current){body.current.rotation.z=sway;body.current.rotation.x=actionPulse;}
  });
  return <group ref={root} position={[character.id==='slava'?-0.72:0.72,-1.25,0]} scale={[h,h,h]} onClick={e=>{e.stopPropagation();onSelect?.(character.id)}}>
    <group ref={body} position={[0,1.2,0]}>
      <mesh position={[0,0.75,0]}><sphereGeometry args={[.29,20,20]}/><meshStandardMaterial color="#f3c79f"/></mesh>
      <mesh position={[0,0.86,-.03]}><sphereGeometry args={[.25,20,12]}/><meshStandardMaterial color="#b7783b"/></mesh>
      <mesh position={[0,.42,0]}><boxGeometry args={[.56,.72,.34]}/><meshStandardMaterial color="#f5f5f4"/></mesh>
      <mesh position={[-.17,0,0]}><boxGeometry args={[.18,.68,.23]}/><meshStandardMaterial color="#e7e5e4"/></mesh>
      <mesh position={[.17,0,0]}><boxGeometry args={[.18,.68,.23]}/><meshStandardMaterial color="#e7e5e4"/></mesh>
      <mesh position={[-.15,-.39,.02]}><boxGeometry args={[.18,.22,.3]}/><meshStandardMaterial color="#f8fafc"/></mesh>
      <mesh position={[.15,-.39,.02]}><boxGeometry args={[.18,.22,.3]}/><meshStandardMaterial color="#f8fafc"/></mesh>
      <mesh position={[0,.5,.19]}><boxGeometry args={[.08,.08,.03]}/><meshStandardMaterial color={accent}/></mesh>
      <mesh position={[-.32,.45,-.06]}><boxGeometry args={[.12,.42,.08]}/><meshStandardMaterial color="#111827"/></mesh>
    </group>
    {selected&&<mesh position={[0,.05,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.45,.49,32]}/><meshBasicMaterial color="#60a5fa"/></mesh>}
    <Float speed={1.1} floatIntensity={.05}><Text position={[0,2.0,0]} fontSize={.18} color="white" anchorX="center">{selected?'⭐ ':''}{character.name}</Text></Float>
  </group>
}

export default function MainCharacters3D({selectedId,onSelect,activity='idle',target=null,heroAction='observe'}){
  const [active,setActive]=useState(selectedId||'slava');
  useEffect(()=>{if(selectedId)setActive(selectedId)},[selectedId]);
  const choose=id=>{setActive(id);onSelect?.(id)};
  const pair=heroPairBehavior(active,activity);
  const choreography=choreographyFor(heroAction,active);
  const partnerTarget=companionTarget(active,target);
  return <group>{mainCharacters().map(c=>{
    const isActive=c.id===active;
    const action=isActive?choreography.primary:choreography.secondary;
    return <MainCharacter key={c.id} character={c} selected={isActive} behavior={isActive?pair.active:pair.companion} target={isActive?target:partnerTarget} action={action} onSelect={choose}/>;
  })}</group>
}
