import {estimateMarkerCorners,orderCorners,markerQuality} from './vision/markerDetector';
import {warpImage} from './vision/perspective';
import {segmentDrawing,cropSegment} from './vision/drawingSegmenter';

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

export async function scanDrawing(file){
  const img=await loadImage(file);
  const max=1600;
  const scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
  const w=Math.max(1,Math.round(img.naturalWidth*scale));
  const h=Math.max(1,Math.round(img.naturalHeight*scale));
  const source=document.createElement('canvas');source.width=w;source.height=h;
  const sctx=source.getContext('2d',{willReadFrequently:true});
  sctx.drawImage(img,0,0,w,h);

  const detected=estimateMarkerCorners(sctx.getImageData(0,0,w,h));
  const ordered=orderCorners(detected.corners);
  const quality=markerQuality(ordered,w,h);
  let out=null;
  let mode='Автокадрирование';

  if(ordered&&quality>=.62){
    out=warpImage(source,ordered,1000,1000);
    mode='4 маркера + перспектива';
  }
  if(!out){
    const mx=Math.round(w*.06),my=Math.round(h*.06);
    const crop=document.createElement('canvas');
    crop.width=Math.max(320,w-2*mx);crop.height=Math.max(320,h-2*my);
    crop.getContext('2d').drawImage(source,mx,my,w-2*mx,h-2*my,0,0,crop.width,crop.height);
    out=crop;
  }

  const segmented=segmentDrawing(out);
  const drawing=segmented.hasDrawing?cropSegment(segmented.canvas,segmented.bbox):segmented.canvas;
  const segmentationConfidence=segmented.hasDrawing?clamp(.45+Math.min(segmented.inkRatio*.9, .45),0,.9):.25;
  const markerConfidence=ordered?quality:.42;
  const confidence=clamp(markerConfidence*.62+segmentationConfidence*.38,0,.98);

  return {
    dataUrl:out.toDataURL('image/jpeg',.92),
    drawingDataUrl:drawing.toDataURL('image/png'),
    width:out.width,height:out.height,
    drawingWidth:drawing.width,drawingHeight:drawing.height,
    confidence,
    segmentationConfidence,
    hasDrawing:segmented.hasDrawing,
    inkRatio:segmented.inkRatio,
    detected:Boolean(ordered),
    usedMarkerHint:Boolean(ordered),
    mode,
    markerCount:detected.candidates.length
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
