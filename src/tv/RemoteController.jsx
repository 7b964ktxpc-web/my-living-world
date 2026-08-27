import React,{useEffect,useState} from 'react';
import {ArrowLeft,Gamepad2,Play,Wifi} from 'lucide-react';
import {makeControllerCommand,createTransport,controllerActions} from './tvTransport';
import {makeHello} from './tvProtocol';

export default function RemoteController({sessionId=decodeURIComponent(new URLSearchParams(location.search).get('remote')||''),onExit}){
 const [status,setStatus]=useState('connecting');const [state,setState]=useState(null);const [transport,setTransport]=useState(null);
 useEffect(()=>{if(!sessionId)return;const t=createTransport(sessionId,{onStatus:setStatus,onMessage:m=>{if(m.type==='state')setState(m.payload)}});setTransport(t);t.send(makeHello('phone'));return()=>t.close()},[sessionId]);
 const send=(action,payload={})=>transport?.send(makeControllerCommand(action,payload));
 if(!sessionId)return <div className="remote-screen"><div className="remote-card"><div className="remote-icon">📺</div><h1>Нет кода подключения</h1><p>Открой TV режим и используй ссылку/код с экрана.</p></div></div>;
 const objects=state?.objects||[];
 return <div className="remote-screen"><div className="remote-card"><div className="remote-head"><div><span>ПУЛЬТ</span><h1>Мой живой мир</h1></div><div className={`remote-status ${status}`}><Wifi size={15}/>{status==='connected'||status==='local'?'На связи':'Подключение'}</div></div><div className="remote-world"><span>{state?.world||'space'}</span><b>{state?.selectedId?'Объект выбран':'Выбери объект'}</b></div><div className="remote-objects">{objects.length?objects.map(o=><button className={state?.selectedId===o.id?'selected':''} key={o.id} onClick={()=>send(controllerActions.SELECT,{objectId:o.id})}><span>{o.emoji||'✨'}</span><b>{o.label||o.type}</b></button>):<div className="remote-empty">Ожидаем объекты с TV…</div>}</div><button className="remote-play" disabled={!state?.selectedId} onClick={()=>send(controllerActions.PLAY)}><Play size={28}/><span>Играть</span></button><div className="remote-grid">{[['🚀','Космос','space'],['🚗','Машинки','cars'],['🚂','Поезда','trains'],['🦖','Динозавры','dinos']].map(([emoji,label,world])=><button key={world} onClick={()=>send(controllerActions.WORLD,{world})}><span>{emoji}</span><b>{label}</b></button>)}</div><button className="remote-back" onClick={onExit||(()=>history.back())}><ArrowLeft size={17}/> На устройство</button><div className="remote-session"><Gamepad2 size={15}/> Сессия {sessionId}</div></div></div>
}
