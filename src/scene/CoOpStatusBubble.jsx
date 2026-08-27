import React from 'react';
import {Float,Text} from '@react-three/drei';

export default function CoOpStatusBubble({world,event='near',visible=true}){
  if(!visible)return null;
  const copy={
    space:{near:'🤖 Я помогу тебе запустить ракету!',objective:'🤖 Смотри! Следующий маяк здесь ⭐',success:'🤖 Отличный запуск! 🎉'},
    cars:{near:'🧑‍🔧 Я помогу с машиной!',objective:'🧑‍🔧 Следующий чекпоинт здесь 🏁',success:'🧑‍🔧 Финиш! Отличная гонка! 🎉'},
    trains:{near:'🧑‍✈️ Готовим поезд!',objective:'🧑‍✈️ Следующая станция впереди 🚉',success:'🧑‍✈️ Поезд прибыл! 🎉'},
    dinos:{near:'🧑‍🌾 Идём искать яйца!',objective:'🧑‍🌾 След яйцеклада здесь 🥚',success:'🧑‍🌾 Нашли! Отличная работа! 🎉'}
  };
  return <Float speed={1.15} floatIntensity={.1}><Text position={[0,1.8,0]} fontSize={.2} maxWidth={4.5} color="white" anchorX="center" anchorY="middle">{copy[world]?.[event]||copy.space[event]}</Text></Float>;
}
