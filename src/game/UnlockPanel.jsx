import React from 'react';
import {Lock,Check,Star} from 'lucide-react';
import {unlockUi} from './unlockUi';

export default function UnlockPanel({world,stars=0}){
 const {items,next,remaining}=unlockUi(world,stars);
 return <div className="unlock-panel">
  <div className="unlock-head"><div><span>ОТКРЫВАЕМОЕ</span><b>Награды мира</b></div>{next?<small>Ещё {remaining} ⭐</small>:<small>Всё открыто 🎉</small>}</div>
  <div className="unlock-list">{items.map(item=><div className={'unlock-item '+(item.unlocked?'open':'locked')} key={item.id}>
   <div className="unlock-icon">{item.unlocked?item.emoji:<Lock size={17}/>}</div>
   <div className="unlock-copy"><b>{item.label}</b><span>{item.unlocked?'Открыто':`Нужно ${item.requiredStars} ⭐`}</span></div>
   {item.unlocked?<Check size={16}/>:<div className="unlock-cost"><Star size={12}/>{item.remaining}</div>}
  </div>)}</div>
 </div>
}
