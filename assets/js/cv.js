/* CV page: lays the CV out on a canvas and forms it from particles. */
(function(){
var sheet=document.getElementById('cvSheet');if(!sheet)return;
var cp=document.getElementById('cvP'),ct=document.getElementById('cvT'),sr=document.getElementById('cvSr');
var F='"Bricolage Grotesque",Helvetica,Arial,sans-serif',M='"DM Mono",ui-monospace,Menlo,monospace';
var INK='#111110',MUTE='#55534e',RULE='#c9c6bd';
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var DATA=[
["name","Kaif Tanveer"],
["sub","Graphic & Motion Designer | Video Editor | Website Designer | UI/UX Designer"],
["sub","Kanpur, Uttar Pradesh, India | kaiftnvr@gmail.com | linkedin.com/in/kaiftanveerspc | Portfolio on Behance"],
["head","Summary"],
["p","Creative designer with a background in graphic design, video editing, motion design and brand identity. Designs homepages, landing pages and multi-page websites, with wireframing and visual systems, and works in HTML, CSS and Python. Currently learning JavaScript, React.js and Next.js alongside a BCA and advanced VFX and 3D training at MAAC. Working as a Creative Designer at Tannex Leather."],
["head","Experience"],
["role","Creative Designer | Tannex Leather | June 2024 to present"],
["b","Contribute to the creative vision, brand strategy and visual direction of Tannex Leather as part of the team."],
["b","Design brand identity elements, including logo concepts, colour palettes, typography and visual aesthetics."],
["b","Design product presentations, catalogue layouts and promotional materials that support a premium brand image."],
["b","Designed the Tannex Leather website as part of a team, and help manage the digital presence and creative marketing."],
["b","Create visual content and branding materials that strengthen brand recognition and attract international B2B buyers."],
["b","Take designs from initial concept and planning to final execution, collaborating with the team throughout."],
["b","Support the brand’s creative development and international market positioning through design."],
["head","Projects"],
["role","Brand Identity Work | Logo, typography, colour and collateral systems | Behance"],
["b","Cremm Coffee House: full coffee house identity with logo, wordmark, packaging, signage-style visuals and social media assets."],
["b","WALLACE: western denim label identity with logo mark, typography, colour and pattern guidelines."],
["b","Hive: minimal smart home platform identity with a logo mark built to scale from app icon to product UI."],
["role","Graphic Design and Motion Portfolio | Self-directed"],
["b","Collection of graphic design, digital design and motion projects, published on Behance (2026)."],
["head","Skills"],
["role","Working skills"],
["p","HTML, CSS · Python · Website design (homepage, landing pages and multi-page websites) · UI/UX design and wireframing · Graphic design, video editing, motion design and brand identity · Figma, Illustrator, Photoshop, After Effects, Premiere Pro · GitHub, Visual Studio Code · AI-assisted design and development workflows"],
["role","Currently learning"],
["p","JavaScript, React.js, Next.js · Java, C, SQL, MySQL · Advanced front-end development · Maya, Houdini, 3D modelling, animation and compositing"],
["head","Education"],
["p","Bachelor of Computer Applications (BCA) | Dr. Virendra Swarup College of Management Studies | Expected 2029"],
["p","Class XII, CBSE | The Ganges World School | 2026"],
["head","Training"],
["role","ADVFX Plus: Advanced Visual Effects and Digital Production | MAAC (Maya Academy of Advanced Cinematics), Kanpur | In progress"],
["b","Advanced cinematics, 3D workflows, 3D modelling, animation, VFX and digital production."],
["head","Languages"],
["p","English (fluent) | Hindi (native)"]
];
DATA.forEach(function(d){var e=document.createElement(d[0]==='name'?'h1':d[0]==='head'?'h2':'p');e.textContent=d[1];sr.appendChild(e);});
var W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2),L=null,N=0,tx,ty,sx,sy,dl,col,img,buf,cpx=cp.getContext('2d'),run=0,raf=0,done=false;
function layout(w){
 var sc=w<600?.88:1,pad=Math.round(Math.max(22,Math.min(54,w*.065))),inner=w-pad*2,y=pad,items=[],m=document.createElement('canvas').getContext('2d');
 function wrap(t,f,mw){m.font=f;var ws=t.split(' '),ls=[],c='';ws.forEach(function(x){var n=c?c+' '+x:x;if(c&&m.measureText(n).width>mw){ls.push(c);c=x;}else c=n;});if(c)ls.push(c);return ls;}
 function put(t,f,c,sz,lh,x,mw){wrap(t,f,mw).forEach(function(l){items.push({k:'t',s:l,f:f,c:c,x:x,y:y+lh*.5+sz*.35});y+=lh;});}
 DATA.forEach(function(d){var k=d[0],t=d[1],sz;
  if(k==='name'){sz=40*sc;put(t,'700 '+sz+'px '+F,INK,sz,sz*1.08,pad,inner);y+=6;}
  else if(k==='sub'){sz=12.5*sc;put(t,'400 '+sz+'px '+F,MUTE,sz,sz*1.55,pad,inner);y+=2;}
  else if(k==='head'){y+=20*sc;sz=11*sc;put(t.toUpperCase(),'500 '+sz+'px '+M,MUTE,sz,sz*1.6,pad,inner);y+=4;items.push({k:'r',x:pad,y:Math.round(y),w:inner,c:RULE});y+=10;}
  else if(k==='role'){y+=6;sz=13.5*sc;put(t,'650 '+sz+'px '+F,INK,sz,sz*1.45,pad,inner);y+=2;}
  else if(k==='b'){sz=13*sc;var y0=y;put(t,'400 '+sz+'px '+F,INK,sz,sz*1.5,pad+16,inner-16);items.push({k:'t',s:'\u2022',f:'400 '+sz+'px '+F,c:INK,x:pad+3,y:y0+sz*.75+sz*.35});y+=3;}
  else{sz=13*sc;put(t,'400 '+sz+'px '+F,INK,sz,sz*1.5,pad,inner);y+=4;}
 });
 return {items:items,h:Math.ceil(y+pad)};
}
function paint(c,items){items.forEach(function(it){if(it.k==='t'){c.font=it.f;c.fillStyle=it.c;c.fillText(it.s,it.x,it.y);}else{c.fillStyle=it.c;c.fillRect(it.x,it.y,it.w,1);}});}
function build(){
 var w=Math.round(sheet.clientWidth);if(w<200)return false;
 W=w;L=layout(W);H=L.h;sheet.style.height=H+'px';
 ct.width=W*dpr;ct.height=H*dpr;var c=ct.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);paint(c,L.items);
 cp.width=W;cp.height=H;
 var o=document.createElement('canvas');o.width=W;o.height=H;var oc=o.getContext('2d');paint(oc,L.items);
 var d=oc.getImageData(0,0,W,H).data,cnt=0,i;
 for(i=3;i<d.length;i+=4)if(d[i]>100)cnt++;
 var keep=Math.min(1,110000/Math.max(1,cnt));
 tx=new Int16Array(cnt);ty=new Int16Array(cnt);sx=new Float32Array(cnt);sy=new Float32Array(cnt);dl=new Float32Array(cnt);col=new Uint32Array(cnt);
 N=0;
 for(var y=0;y<H;y++)for(var x=0;x<W;x++){var q=(y*W+x)*4;
  if(d[q+3]>100&&Math.random()<keep){tx[N]=x;ty[N]=y;sx[N]=Math.random()*W;sy[N]=Math.random()*H;dl[N]=Math.random();col[N]=(255<<24)|(d[q+2]<<16)|(d[q+1]<<8)|d[q];N++;}
 }
 img=cpx.createImageData(W,H);buf=new Uint32Array(img.data.buffer);
 return true;
}
function showText(){ct.style.opacity=1;cp.style.opacity=0;done=true;}
function stop(){run++;if(raf){cancelAnimationFrame(raf);raf=0;}}
function start(){
 stop();var id=run;
 var fr=document.fonts&&document.fonts.load?Promise.all([document.fonts.load('700 40px "Bricolage Grotesque"'),document.fonts.load('400 13px "Bricolage Grotesque"'),document.fonts.load('500 11px "DM Mono"')]).catch(function(){}):Promise.resolve();
 fr.then(function(){
  if(id!==run||location.hash!=='#cv')return;
  done=false;
  if(!build())return;
  if(reduce){showText();return;}
  ct.style.transition='none';cp.style.transition='none';ct.style.opacity=0;cp.style.opacity=1;
  void ct.offsetWidth;ct.style.transition='';cp.style.transition='';
  var t0=0;
  (function f(now){
   if(id!==run)return;
   if(!t0)t0=now;var t=(now-t0)/1000;
   buf.fill(0);
   for(var i=0;i<N;i++){
    var u=(t-dl[i])/2.4;u=u<0?0:u>1?1:u;var v=1-u,e=1-v*v*v,sw=v*v*16;
    var x=sx[i]+(tx[i]-sx[i])*e+Math.sin(i*.37+t*2)*sw,y=sy[i]+(ty[i]-sy[i])*e+Math.cos(i*.53+t*2)*sw;
    var xi=x|0,yi=y|0;
    if(xi>=0&&xi<W&&yi>=0&&yi<H)buf[yi*W+xi]=col[i];
   }
   cpx.putImageData(img,0,0);
   if(t<3.5){raf=requestAnimationFrame(f);}else{raf=0;showText();}
  })(performance.now());
 });
}
function sync(){if(location.hash==='#cv')start();else stop();}
addEventListener('hashchange',sync);
var rz=0;
addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){if(location.hash==='#cv'&&done&&build())showText();},200);});
sync();
})();
