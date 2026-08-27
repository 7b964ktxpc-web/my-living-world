export function actionTransform(type,progress){
 const p=Math.max(0,Math.min(1,progress));
 const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
 const e=ease(p);
 if(type==='rocket') return {x:e*2.8,y:e*1.5+Math.sin(p*Math.PI)*.25,z:0,rot:-e*.18,scale:1+p*.12};
 if(type==='car') return {x:e*3.2,y:Math.sin(p*Math.PI)*.08,z:0,rot:0,scale:1+p*.04};
 if(type==='train') return {x:e*3.6,y:0,z:0,rot:0,scale:1};
 if(type==='trex') return {x:Math.sin(p*Math.PI)*.35,y:Math.sin(p*Math.PI)*.16,z:0,rot:Math.sin(p*Math.PI*2)*.18,scale:1+Math.sin(p*Math.PI)*.04};
 return {x:0,y:0,z:0,rot:0,scale:1};
}
