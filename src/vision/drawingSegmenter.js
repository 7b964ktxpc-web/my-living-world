const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

function luminance(data,i){return .2126*data[i]+.7152*data[i+1]+.0722*data[i+2]}

/**
 * Separates a child colouring from the white paper without deleting coloured
 * pencil strokes. The result is an RGBA mask plus a bounding box. This is a
 * browser-only first pass; it is intentionally deterministic and has no AI
 * dependency.
 */
export function segmentDrawing(canvas,{paperThreshold=246,edgePadding=.045}={}){
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  const {width,height}=canvas;
  const image=ctx.getImageData(0,0,width,height);
  const {data}=image;
  const mask=new Uint8Array(width*height);
  let minX=width,minY=height,maxX=-1,maxY=-1,count=0;

  // Ignore a small border where marker frames and page shadows live.
  const px=Math.round(width*edgePadding),py=Math.round(height*edgePadding);
  for(let y=py;y<height-py;y++){
    for(let x=px;x<width-px;x++){
      const i=(y*width+x)*4;
      const l=luminance(data,i);
      const saturation=Math.max(data[i],data[i+1],data[i+2])-Math.min(data[i],data[i+1],data[i+2]);
      // Dark ink, pencil and coloured crayon are all retained.
      const foreground=l<paperThreshold || saturation>18;
      if(!foreground)continue;
      const idx=y*width+x;mask[idx]=255;count++;
      if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;
    }
  }

  // Remove isolated pixels and tiny page-camera noise with a cheap 3x3
  // neighbourhood pass. Keep strokes that have at least two neighbours.
  const cleaned=new Uint8Array(mask);
  for(let y=py+1;y<height-py-1;y++) for(let x=px+1;x<width-px-1;x++){
    const idx=y*width+x;if(!mask[idx])continue;
    let neighbours=0;
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dx||dy)neighbours+=mask[(y+dy)*width+x+dx]?1:0;
    if(neighbours<2)cleaned[idx]=0;
  }

  const result=document.createElement('canvas');result.width=width;result.height=height;
  const out=result.getContext('2d');
  const rgba=out.createImageData(width,height);
  for(let i=0;i<width*height;i++){
    const si=i*4;rgba.data[si]=data[si];rgba.data[si+1]=data[si+1];rgba.data[si+2]=data[si+2];rgba.data[si+3]=cleaned[i];
  }
  out.putImageData(rgba,0,0);

  const bbox=maxX>=0?{x:minX,y:minY,width:maxX-minX+1,height:maxY-minY+1}:null;
  const pageArea=Math.max(1,(width-2*px)*(height-2*py));
  const inkRatio=count/pageArea;
  return {canvas:result,bbox,inkRatio,hasDrawing:Boolean(bbox&&inkRatio>.003)};
}

export function cropSegment(canvas,bbox,padding=.06){
  if(!bbox)return canvas;
  const padX=Math.round(bbox.width*padding),padY=Math.round(bbox.height*padding);
  const x=clamp(bbox.x-padX,0,canvas.width-1),y=clamp(bbox.y-padY,0,canvas.height-1);
  const right=clamp(bbox.x+bbox.width+padX,1,canvas.width),bottom=clamp(bbox.y+bbox.height+padY,1,canvas.height);
  const out=document.createElement('canvas');out.width=right-x;out.height=bottom-y;
  out.getContext('2d').drawImage(canvas,x,y,right-x,bottom-y,0,0,out.width,out.height);return out;
}
