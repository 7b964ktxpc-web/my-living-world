import React from 'react';
import {Stars,Text} from '@react-three/drei';
import LivingObject3D from './LivingObject3D';

function Ground({world}){
 if(world==='space') return null;
 return <mesh position={[0,-1.55,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[12,8]}/><meshStandardMaterial color={world==='dinos'?'#83c98b':world==='trains'?'#8f8c95':'#59606b'} roughness={.95}/></mesh>;
}

export default function WorldScene({world,objects=[]}){
 const visible=objects.slice(0,8);
 return <>
  <ambientLight intensity={1.45}/>
  <directionalLight position={[4,6,5]} intensity={2.1}/>
  {world==='space'&&<><Stars radius={50} depth={30} count={1400} factor={2}/><mesh position={[-2,1.2,-2]}><sphereGeometry args={[1,32,32]}/><meshStandardMaterial color="#5f8cff" roughness={.8}/></mesh></>}
  {world==='dinos'&&<><mesh position={[0,-1.45,-1]}><planeGeometry args={[12,8]}/><meshStandardMaterial color="#79bf82"/></mesh><mesh position={[2,-.55,-2]}><coneGeometry args={[.75,1.8,16]}/><meshStandardMaterial color="#b85b4f"/></mesh></>}
  {world==='trains'&&<><mesh position={[0,-1.42,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[12,8]}/><meshStandardMaterial color="#a7a8ad"/></mesh><mesh position={[0,-1.3,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[10,.22]}/><meshStandardMaterial color="#44484f"/></mesh></>}
  {world==='cars'&&<mesh position={[0,-1.42,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[12,8]}/><meshStandardMaterial color="#555b63"/></mesh>}
  {visible.map((object,index)=><group key={object.id} position={[((index%3)-1)*2.3,0.15-Math.floor(index/3)*.15,(Math.floor(index/3)-.5)*1.7]}><LivingObject3D object={object}/></group>)}
  {visible.length===0&&<Text position={[0,.2,0]} fontSize={.42} color="white" anchorX="center" anchorY="middle">Создай свой первый объект</Text>}
 </>;
}
