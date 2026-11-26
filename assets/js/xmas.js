/* Christmas mode: coloured trees with blinking lights above some buttons, and Santa's sleigh flying across the hero.
   Everything is built from tightly packed particles. It switches on by itself from 20 November to 6 January.
   Add ?xmas=1 to the address to force it on, ?xmas=0 to force it off.
   To remove it for good, delete the xmas.css link and the xmas.js script from index.html. */
(function(){
/* ---- artwork as simple shapes: ['p',colour,[x,y,...]] polygon, ['e',colour,cx,cy,rx,ry] ellipse, ['r',colour,x,y,w,h] rectangle ---- */
var STAR=[];for(var s=0;s<10;s++){var a=-Math.PI/2+s*Math.PI/5,r=s%2?2.6:6.2;STAR.push(+(30+Math.cos(a)*r).toFixed(2),+(7+Math.sin(a)*r).toFixed(2));}
var TREE=[
 ['r','#7a4b1e',27,68,6,10],
 ['p','#13703a',[30,36,54,68,6,68]],
 ['p','#1c9a50',[30,22,48,50,12,50]],
 ['p','#2bbd68',[30,10,43,31,17,31]],
 ['p','#ffd23f',STAR]
];
var LIGHTS=[[30,18],[25,28],[35,27],[21,41],[31,43],[40,42],[15,59],[25,61],[36,59],[45,61],[30,52]];
var LCOL=['#ff4d4d','#ffd23f','#4da3ff','#ff7ad9','#ffffff'];
var SANTA=[
 ['e','#8a5a2b',24,34,12,6],['p','#8a5a2b',[32,30,38,20,42,22,36,34]],['e','#8a5a2b',40,21,5,3.6],
 ['r','#8a5a2b',14,38,2.2,12],['r','#8a5a2b',19,38,2.2,12],['r','#8a5a2b',28,38,2.2,12],['r','#8a5a2b',33,38,2.2,12],
 ['p','#c9a36b',[39,19,37,12,38,12,41,18]],['p','#c9a36b',[41,19,44,12,45,13,43,19]],['p','#c9a36b',[38,15,34,13,34,14,38,17]],
 ['e','#ff3b30',45,22,2,2],['e','#8a5a2b',12,32,3,2],
 ['p','#f2b134',[44,28,64,34,64,35.6,44,29.6]],
 ['e','#8a5a2b',72,28,9,7.5],
 ['p','#c62828',[64,32,102,32,108,22,110,25,104,42,68,42]],
 ['p','#f2b134',[60,46,106,46,111,40,113,42,108,50,60,50]],
 ['r','#f2b134',72,42,2.4,4],['r','#f2b134',96,42,2.4,4],
 ['e','#d62828',86,26,8,8],['e','#ffd9bd',86,15,4.6,4.6],['e','#ffffff',86,19,4.8,3.6],
 ['p','#d62828',[81,13,86,3,91,13]],['r','#ffffff',81,12,10,2.6],['e','#ffffff',86,2.6,2.2,2.2],
 ['e','#ffffff',86,29,6,1.6]
];
if(typeof module!=='undefined')module.exports={TREE:TREE,SANTA:SANTA,LIGHTS:LIGHTS};
if(typeof window==='undefined')return;

var d=new Date(),mo=d.getMonth()+1,day=d.getDate(),on=(mo===11&&day>=20)||mo===12||(mo===1&&day<=6);
if(/[?&]xmas=1/.test(location.search))on=true;
if(/[?&]xmas=0/.test(location.search))on=false;
if(!on)return;
document.documentElement.classList.add('xon');
var DPR=Math.min(window.devicePixelRatio||1,2),RM=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function rgb(h){var n=parseInt(h.slice(1),16);return [n>>16&255,n>>8&255,n&255];}
function paint(c,shapes,S){
 shapes.forEach(function(sh){
  c.fillStyle=sh[1];c.beginPath();
  if(sh[0]==='p'){var p=sh[2];c.moveTo(p[0]*S,p[1]*S);for(var i=2;i<p.length;i+=2)c.lineTo(p[i]*S,p[i+1]*S);c.closePath();}
  else if(sh[0]==='e'){c.ellipse(sh[2]*S,sh[3]*S,sh[4]*S,sh[5]*S,0,0,6.2832);}
  else{c.rect(sh[2]*S,sh[3]*S,sh[4]*S,sh[5]*S);}
  c.fill();
 });
}
function sample(shapes,W,H,step){
 var S=4,cv=document.createElement('canvas');cv.width=W*S;cv.height=H*S;
 var c=cv.getContext('2d');paint(c,shapes,S);
 var im=c.getImageData(0,0,cv.width,cv.height).data,out=[],st=step*S,x,y;
 for(y=st/2;y<cv.height;y+=st)for(x=st/2;x<cv.width;x+=st){
  var jx=x+(Math.random()-.5)*st*.5,jy=y+(Math.random()-.5)*st*.5,q=((jy|0)*cv.width+(jx|0))*4;
  if(im[q+3]>140)out.push([jx/S,jy/S,im[q],im[q+1],im[q+2]]);
 }
 return out;
}
function dots(c,pts,sz){for(var i=0;i<pts.length;i++){var p=pts[i];c.fillStyle='rgb('+p[2]+','+p[3]+','+p[4]+')';c.fillRect(p[0]-sz/2,p[1]-sz/2,sz,sz);}}

/* ---- trees ---- */
var items=[],raf=0,last=0;
function loop(now){
 raf=0;
 if(now-last>=40){last=now;for(var i=0;i<items.length;i++)if(items[i].vis)items[i].draw(now);}
 for(var j=0;j<items.length;j++)if(items[j].vis){raf=requestAnimationFrame(loop);break;}
}
function kick(){if(!raf&&!RM)raf=requestAnimationFrame(loop);}
function makeTree(host,side,h){
 var W=60,H=80,k=h/80,cw=Math.round(W*k),step=1.3,sz=step*.98;
 var cv=document.createElement('canvas');cv.width=Math.round(cw*DPR);cv.height=Math.round(h*DPR);cv.style.width=cw+'px';cv.style.height=h+'px';
 var span=document.createElement('span');span.className='xt '+side;span.setAttribute('aria-hidden','true');span.appendChild(cv);host.appendChild(span);
 var c=cv.getContext('2d'),pts=sample(TREE,W,H,step),i;
 var st=pts.map(function(p){return [Math.random()*W,Math.random()*H+20,Math.random()*.5];});
 var lg=[];
 LIGHTS.forEach(function(l,n){
  var col=rgb(LCOL[n%LCOL.length]),arr=[];
  for(var dx=-2.2;dx<=2.2;dx+=.8)for(var dy=-2.2;dy<=2.2;dy+=.8)if(dx*dx+dy*dy<=5)arr.push([l[0]+dx,l[1]+dy,col[0],col[1],col[2]]);
  lg.push({a:arr,g:n%3});
 });
 var bc=null,t0=0;
 function setT(){c.setTransform(k*DPR,0,0,k*DPR,0,0);}
 function lights(now,fade){
  for(var n=0;n<lg.length;n++){
   var al=RM?1:.2+.8*(.5+.5*Math.sin(now/280+lg[n].g*2.1));
   c.globalAlpha=al*fade;dots(c,lg[n].a,1);
  }
  c.globalAlpha=1;
 }
 var it={vis:false,draw:function(now){
  if(!t0)t0=now;var t=(now-t0)/1000;
  setT();c.clearRect(0,0,W,H);
  if(t<1.7){
   var mv=pts.map(function(p,j){var u=(t-st[j][2])/1.0;u=u<0?0:u>1?1:u;var e=1-Math.pow(1-u,3);return [st[j][0]+(p[0]-st[j][0])*e,st[j][1]+(p[1]-st[j][1])*e,p[2],p[3],p[4]];});
   dots(c,mv,sz);lights(now,Math.min(1,t/1.4));
  }else{
   if(!bc){bc=document.createElement('canvas');bc.width=cv.width;bc.height=cv.height;var b=bc.getContext('2d');b.setTransform(k*DPR,0,0,k*DPR,0,0);dots(b,pts,sz);}
   c.setTransform(1,0,0,1,0,0);c.drawImage(bc,0,0);setT();lights(now,1);
  }
 }};
 if(RM){setT();dots(c,pts,sz);lights(0,1);return;}
 items.push(it);
 if('IntersectionObserver' in window){new IntersectionObserver(function(en){it.vis=en[0].isIntersecting;if(it.vis)kick();}).observe(span);}
 else{it.vis=true;kick();}
}
function q(s){return document.querySelector(s);}
function addTree(el,side,h){
 if(!el)return;
 el.classList.add('xtb');
 makeTree(el,side,h);
 var c=el.closest('.btns,.cats');
 if(c)c.classList.add('xm');else el.classList.add('xgap');
}
addTree(q('#top .btns .btn.p'),'sl',52);
addTree(q('#work a.btn.p'),'sr',46);
addTree(q('.cats .cat:nth-child(2)'),'sr',50);
addTree(q('.cats .cat:nth-child(5)'),'sl',50);
addTree(q('#cvpage .btns .btn.p'),'sr',48);

/* ---- Santa's sleigh, flying across the hero ---- */
var top=q('#top');
if(top&&!RM){
 var SW=114,SH=52,cwid=116,k2=cwid/SW,ch=Math.round(SH*k2);
 var cv2=document.createElement('canvas');cv2.width=Math.round(cwid*DPR);cv2.height=Math.round(ch*DPR);cv2.style.width=cwid+'px';cv2.style.height=ch+'px';
 var c2=cv2.getContext('2d');c2.setTransform(k2*DPR,0,0,k2*DPR,0,0);
 dots(c2,sample(SANTA,SW,SH,1.15),1.15*.98);
 var el=document.createElement('div');el.className='xsleigh';el.setAttribute('aria-hidden','true');el.appendChild(cv2);
 top.insertBefore(el,top.firstChild);
}
})();
