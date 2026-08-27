import React from 'react';
import {Float,Text} from '@react-three/drei';
export default function ObjectInteractionState3D({object,state}){
 if(!object||!state||state==='ready'||state==='parked'||state==='stopped'||state==='curious')return null;
 const labels={launching:'🚀 Запуск!',launched:'🚀 Полёт!',racing:'🏁 Гонка!',finished:'🏆 Финиш!',departing:'🚂 Отправляемся!',arrived:'🚉 Прибыли!',searching:'🦖 Ищем следы!',found:'🥚 Нашли!'};
 return <Float speed={1.8} floatIntensity={.1}><Text position={[0,1.15,0]} fontSize=".18" color="white" anchorX="center">{labels[state]||state}</Text></Float>
}
