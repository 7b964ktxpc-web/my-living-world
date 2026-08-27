import React,{useEffect,useMemo,useRef} from 'react';
import * as THREE from 'three';
import {Float,useFrame} from '@react-three/drei';

function useTexture(url){
 const texture=useMemo(()=>url?new THREE.Texture():null,[url]);
 useEffect(()=>{if(!texture||!url)return;const loader=new THREE.TextureLoader();loader.load(url,t=>{t.colorSpace=THREE.SRGBColorSpace;texture.image=t.image;texture.needsUpdate=true});return()=>texture.dispose()},[texture,url]);
 return texture;
}
function Mat({color,texture}){return <meshStandardMaterial color={color} map={texture||null} roughness={.72} metalness={.05}/>}
function Rocket({texture}){return <group><mesh rotation={[0,0,-Math.PI/2]}><coneGeometry args={[.48,1.8,24]}/><Mat color="#ef6351" texture={texture}/></mesh><mesh position={[0,-.82,0]} rotation={[0,0,-Math.PI/2]}><coneGeometry args={[.2,.7,16]}/><meshStandardMaterial color="#ffd166"/></mesh><mesh position={[0,.05,.43]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.2,.2,.12,16]}/><meshStandardMaterial color="#7dd3fc"/></mesh></group>}
function Car({texture}){return <group><mesh><boxGeometry args={[2,.55,.9]}/><Mat color="#ff9f43" texture={texture}/></mesh><mesh position={[.35,.4,0]}><boxGeometry args={[.9,.45,.75]}/><meshStandardMaterial color="#7dd3fc"/></mesh>{[-.7,.7].map(x=><mesh key={x} position={[x,-.4,.48]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.25,.25,.18,20]}/><meshStandardMaterial color="#20242b"/></mesh>)}</group>}
function Train({texture}){return <group><mesh><boxGeometry args={[2.4,.8,1]}/><Mat color="#8b5cf6" texture={texture}/></mesh>{[-.8,0,.8].map(x=><mesh key={x} position={[x,-.58,.5]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.28,.28,.18,20]}/><meshStandardMaterial color="#20242b"/></mesh>)}</group>}
function Trex({texture}){return <group><mesh position={[0,.45,0]}><boxGeometry args={[1.2,.75,.6]}/><Mat color="#6fcf97" texture={texture}/></mesh><mesh position={[.78,.82,0]}><sphereGeometry args={[.42,20,20]}/><Mat color="#6fcf97" texture={texture}/></mesh><mesh position={[-.3,-.1,0]}><cylinderGeometry args={[.13,.13,.75,12]}/><Mat color="#5aa879" texture={texture}/></mesh><mesh position={[.35,-.1,0]}><cylinderGeometry args={[.13,.13,.75,12]}/><Mat color="#5aa879" texture={texture}/></mesh></group>}
export default function LivingObject3D({object}){const group=useRef();const texture=useTexture(object?.textureDataUrl||object?.drawingDataUrl);useFrame((state,delta)=>{if(!group.current)return;group.current.rotation.y+=delta*.16;group.current.position.y=Math.sin(state.clock.elapsedTime*1.4)*.06});if(!object)return null;const content=object.type==='rocket'?<Rocket texture={texture}/>:object.type==='car'?<Car texture={texture}/>:object.type==='train'?<Train texture={texture}/>:<Trex texture={texture}/>;return <Float speed={1.2} rotationIntensity={.08} floatIntensity={.18}><group ref={group}>{content}</group></Float>}
