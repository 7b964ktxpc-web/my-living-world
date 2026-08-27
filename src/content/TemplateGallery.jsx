import React from 'react';
import {Lock,Printer,CheckCircle2} from 'lucide-react';
import {templatesForWorld} from './templateCatalog';
import {isUnlocked} from '../game/unlocks';
import {openPrintTemplate} from './printTemplate';

export default function TemplateGallery({world,stars=0,onLocked}){
 const templates=templatesForWorld(world);
 return <div className="template-gallery"><div className="template-gallery-head"><div><span>РАСКРАСКИ</span><h3>Создай новый объект</h3></div><small>{stars} ⭐</small></div><div className="template-grid">{templates.map(template=>{const unlocked=isUnlocked(template,stars);return <button key={template.id} className={`template-tile ${unlocked?'':'locked'}`} disabled={!unlocked} onClick={()=>unlocked?openPrintTemplate(template,world):onLocked?.(template)}><div className="template-art">{template.emoji}</div><div className="template-copy"><b>{template.label}</b><span>{unlocked?'Можно распечатать':`Нужно ${template.requiredStars} ⭐`}</span></div><div className="template-action">{unlocked?<><CheckCircle2 size={16}/><Printer size={16}/></>:<Lock size={17}/>}</div></button>})}</div></div>
}
