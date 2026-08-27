const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

export function loadImage(source){
  return new Promise((resolve,reject)=>{
    const isUrl=typeof source==='string';
    const url=isUrl?source:URL.createObjectURL(source);
    const img=new Image();
    img.onload=()=>{if(!isUrl)URL.revokeObjectURL(url);resolve(img)};
    img.onerror=()=>{if(!isUrl)URL.revokeObjectURL(url);reject(new Error('Не удалось прочитать изображение'))};
    img.src=url;
  });
}

function brightness(data,i){return (data[i]+data[i+1]+data[i+2])/3}
function blackRatio(ctx,x,y,size=28){
  const sx=clamp(Math.round(x-size/2),0,ctx.canvas.width-size);
  const sy=clamp(Math.round(y-size/2),0,ctx.canvas.height-size);
  const p=ctx.getImageData(sx,sy,size,size).data;
  let dark=0;
  for(let i=0;i<p.length;i+=4) if(brightness(p,i)<82) dark++;
  return dark/(p.length/4);
}

// The printable protocol reserves a small black square near each corner.
// We search a grid around the expected corner zones and return the strongest hit.
export function detectCornerMarkers(ctx){
  const w=ctx.canvas.width,h=ctx.canvas.height;
  const zones=[[.12,.12],[.88,.12],[.12,.88],[.88,.88]];
  const markers=[];
  const radius=.11;
  for(const [nx,ny] of zones){
    let best={score:0,x:nx*w,y:ny*h};
    for(let gx=-4;gx<=4;gx++) for(let gy=-4;gy<=4;gy++){
      const x=clamp((nx+gx*radius/4)*w,20,w-20);
      const y=clamp((ny+gy*radius/4)*h,20,h-20);
      const score=blackRatio(ctx,x,y,Math.max(18,Math.round(Math.min(w,h)*.035)));
      if(score>best.score)best={score,x,y};
    }
    markers.push(best);
  }
  const confidence=markers.reduce((s,m)=>s+m.score,0)/4;
  return {markers,confidence,detected:markers.every(m=>m.score>.28)};
}

export async function scanDrawing(file){
  const img=await loadImage(file);
  const max=1600;
  const scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
  const w=Math.max(1,Math.round(img.naturalWidth*scale));
  const h=Math.max(1,Math.round(img.naturalHeight*scale));
  const source=document.createElement('canvas');source.width=w;source.height=h;
  const sctx=source.getContext('2d',{willReadFrequently:true});
  sctx.drawImage(img,0,0,w,h);
  const markerResult=detectCornerMarkers(sctx);
  const marginX=Math.round(w*(markerResult.detected?.075:.06));
  const marginY=Math.round(h*(markerResult.detected?.075:.06));
  const left=marginX,right=w-marginX,top=marginY,bottom=h-marginY;
  const out=document.createElement('canvas');
  const ow=Math.max(320,right-left),oh=Math.max(320,bottom-top);
  out.width=ow;out.height=oh;
  const octx=out.getContext('2d');
  octx.fillStyle='#fff';octx.fillRect(0,0,ow,oh);
  octx.drawImage(source,left,top,right-left,bottom-top,0,0,ow,oh);
  return {
    dataUrl:out.toDataURL('image/jpeg',.92),
    width:ow,height:oh,
    confidence:clamp(markerResult.confidence*1.2+(markerResult.detected?.35:.08),0,0.99),
    detected:markerResult.detected,
    markers:markerResult.markers.map(m=>({x:m.x/w,y:m.y/h,score:m.score}))
  };
}

export async function fileToDataUrl(file){
  const img=await loadImage(file);
  const canvas=document.createElement('canvas');
  const max=1200;
  const scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
  canvas.width=Math.round(img.naturalWidth*scale);canvas.height=Math.round(img.naturalHeight*scale);
  canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
  return canvas.toDataURL('image/jpeg',.88);
}
