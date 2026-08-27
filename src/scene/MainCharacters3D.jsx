import React,{useEffect,useRef,useState} from 'react';
import {Float,Html} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {mainCharacters} from '../game/mainCharacters.js';
import {heroPairBehavior} from '../game/mainCharacterBehavior.js';
import {navigationState,companionTarget} from '../game/mainCharacterNavigation.js';
import {choreographyFor} from '../game/heroActionChoreography.js';

function CharacterArt({character,selected,onSelect,action}){
  const taller=character.id==='slava';
  return <button type="button" aria-label={`Выбрать ${character.name}`} onClick={(e)=>{e.stopPropagation();onSelect(character.id)}} style={{pointerEvents:'auto',cursor:'pointer',border:0,background:'transparent',padding:0,width:taller?150:125,filter:selected?'drop-shadow(0 10px 18px rgba(37,99,235,.35))':'drop-shadow(0 8px 14px rgba(15,23,42,.18))',transform:action==='celebrate'?'translateY(-8px)':action==='signal'?'translateY(-3px)':'none',transition:'transform .2s ease'}}>
    <svg viewBox="0 0 180 320" width="100%" role="img" aria-label={character.name}>
      <defs><linearGradient id={`j-${character.id}`} x1="0" x2="1"><stop offset="0" stopColor="#101d38"/><stop offset="1" stopColor="#263b61"/></linearGradient></defs>
      <ellipse cx="90" cy="305" rx="58" ry="10" fill="#0f172a" opacity=".16"/>
      <rect x="18" y="118" width="24" height="78" rx="10" fill="#18243b"/>
      <rect x="138" y="118" width="24" height="78" rx="10" fill="#18243b"/>
      <circle cx="90" cy="73" r={taller?43:39} fill="#f3c59d"/>
      <path d="M48 64 Q53 22 91 28 Q126 27 133 62 Q116 45 96 49 Q72 49 48 64Z" fill="#b8793e"/>
      <path d="M42 52 Q90 12 138 50 L132 66 Q91 48 48 67Z" fill="#496989"/>
      <path d="M43 49 Q90 13 137 48" fill="none" stroke="#89a1b8" strokeWidth="3"/>
      <text x="90" y="43" textAnchor="middle" fontSize="10" fontWeight="900" fill="#f5f7fa" letterSpacing="1">BOSTON</text>
      <circle cx="74" cy="75" r="7" fill="#fff"/><circle cx="106" cy="75" r="7" fill="#fff"/><circle cx="74" cy="75" r="3.5" fill="#172033"/><circle cx="106" cy="75" r="3.5" fill="#172033"/>
      <path d="M78 96 Q90 104 102 96" fill="none" stroke="#9b563d" strokeWidth="3" strokeLinecap="round"/>
      <rect x="47" y="111" width="86" height="93" rx="22" fill={`url(#j-${character.id})`}/>
      <rect x="55" y="111" width="70" height="88" rx="18" fill="none" stroke="#e8e9ec" strokeWidth="9"/>
      <rect x="80" y="126" width="20" height="32" rx="4" fill="#d99524"/><text x="90" y="149" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff">A</text>
      <rect x="31" y="117" width="17" height="76" rx="8" fill="#eee9e3"/><rect x="132" y="117" width="17" height="76" rx="8" fill="#eee9e3"/>
      <rect x="55" y="199" width="30" height="77" rx="12" fill="#eee9e3"/><rect x="95" y="199" width="30" height="77" rx="12" fill="#eee9e3"/>
      <rect x="51" y="270" width="38" height="25" rx="10" fill="#b8c0c9"/><rect x="91" y="270" width="38" height="25" rx="10" fill="#b8c0c9"/>
      <path d="M55 121 Q42 130 38 151" fill="none" stroke="#172033" strokeWidth="12" strokeLinecap="round"/><path d="M125 121 Q138 132 142 151" fill="none" stroke="#172033" strokeWidth="12" strokeLinecap="round"/>
    </svg>
    <strong style={{display:'block',marginTop:-4,fontFamily:'Nunito,sans-serif',fontSize:15,color:'#18365c'}}>{selected?'⭐ ':''}{character.name}</strong>
  </button>
}

function MainCharacter({character,selected,behavior,target,action,onSelect}){
  const root=useRef(null); const current=useRef({x:character.id==='slava'?-0.8:0.8,z:0});
  useEffect(()=>{current.current={x:character.id==='slava'?-0.8:0.8,z:0}},[character.id]);
  useFrame((state,delta)=>{const nav=navigationState(character.id,target,current.current);const speed=behavior.speed||0;if(speed>0&&!nav.reached){const step=Math.min(1,delta*speed);current.current.x+=nav.dx*step;current.current.z+=nav.dz*step;if(root.current){root.current.position.x=current.current.x;root.current.position.z=current.current.z;}}if(root.current)root.current.position.y=-1.05+Math.abs(Math.sin(state.clock.elapsedTime*3.2))*0.025;});
  return <group ref={root}><Float speed={1} floatIntensity={0.03}><Html transform sprite distanceFactor={5} position={[0,1.25,0]} zIndexRange={[20,0]}><CharacterArt character={character} selected={selected} action={action} onSelect={onSelect}/></Html></Float></group>;
}

export default function MainCharacters3D({selectedId,onSelect,activity='idle',target=null,heroAction='observe'}){
  const [active,setActive]=useState(selectedId||'slava');
  useEffect(()=>{if(selectedId)setActive(selectedId)},[selectedId]);
  const choose=id=>{setActive(id);onSelect?.(id)};
  const pair=heroPairBehavior(active,activity);const choreography=choreographyFor(heroAction,active);const partnerTarget=companionTarget(active,target);
  return <group>{mainCharacters().map(character=>{const isActive=character.id===active;return <MainCharacter key={character.id} character={character} selected={isActive} behavior={isActive?pair.active:pair.companion} target={isActive?target:partnerTarget} action={isActive?choreography.primary:choreography.secondary} onSelect={choose}/>})}</group>;
}
