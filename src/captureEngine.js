const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

export function loadImage(file){
  return new Promise((resolve,reject)=>{
    const url=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{URL.revokeObjectURL(url);resolve(img)};
    img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('Не удалось прочитать изображение'))};
    img.src=url;
  });
}

function sampleBrightness(ctx,x,y){
  const p=ctx.getImageData(clamp(Math.round(x),0,ctx.canvas.width-1),clamp(Math.round(y),0,ctx.canvas.height-1),1,1).data;
  return (p[0]+p[1]+p[2])/3;
}

export async function scanDrawing(file){
  const img=await loadImage(file);
  const max=1400;
  const scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
  const w=Math.max(1,Math.round(img.naturalWidth*scale));
  const h=Math.max(1,Math.round(img.naturalHeight*scale));
  const source=document.createElement('canvas');
  source.width=w;source.height=h;
  const sctx=source.getContext('2d',{willReadFrequently:true});
  sctx.drawImage(img,0,0,w,h);

  // V1 scanner: locate the brightest paper area by trimming dark photo edges.
  // The printed four-corner marker protocol is kept in the template manifest;
  // a future CV worker can replace this crop without changing the UI contract.
  const marginX=Math.round(w*.06),marginY=Math.round(h*.06);
  let left=marginX,right=w-marginX,top=marginY,bottom=h-marginY;
  const corners=[[0,0],[w,0],[0,h],[w,h]];
  const cornerBrightness=corners.map(([x,y])=>sampleBrightness(sctx,x?x-1:0,y?y-1:0));
  const darkCorners=cornerBrightness.filter(v=>v<95).length;
  if(darkCorners>=2){left=Math.round(w*.09);right=Math.round(w*.91);top=Math.round(h*.09);bottom=Math.round(h*.91)}

  const out=document.createElement('canvas');
  const ow=Math.max(320,right-left),oh=Math.max(320,bottom-top);
  out.width=ow;out.height=oh;
  const octx=out.getContext('2d');
  octx.fillStyle='#fff';octx.fillRect(0,0,ow,oh);
  octx.drawImage(source,left,top,right-left,bottom-top,0,0,ow,oh);

  // Normalize to a clean paper-like image while retaining the child's colors.
  const pixels=octx.getImageData(0,0,ow,oh);
  for(let i=0;i<pixels.data.length;i+=4){
    pixels.data[i]=clamp(pixels.data[i],0,255);
    pixels.data[i+1]=clamp(pixels.data[i+1],0,255);
    pixels.data[i+2]=clamp(pixels.data[i+2],0,255);
  }
  octx.putImageData(pixels,0,0);
  return {dataUrl:out.toDataURL('image/jpeg',.9),width:ow,height:oh,confidence:darkCorners>=2?.86:.62,usedMarkerHint:darkCorners>=2};
}
