/* Generative neural-network artwork: neuron clusters drawn once, growing outwards. */
(function(){
var LW=1000,LH=720,epoch=0,
 reduce=typeof window!=='undefined'&&window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var C={blue:'#4b5bff',yellow:'#ffd84a',red:'#ff4638',green:'#37f58f',pink:'#ff82dc',cyan:'#55dcff'};
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function build(seed){
 var R=rng(seed),segs=[],dots=[],roots=[],limit=0;
 function pick(l){return l[Math.floor(R()*l.length)];}
 function grow(x,y,a,len,depth,col,t0,pal){
  var ds=3+R()*1.6,n=Math.max(3,Math.round(len/ds)),turn=(R()-.5)*.09,t=t0;
  for(var i=0;i<n;i++){
   a+=turn+(R()-.5)*.13;
   var nx=x+Math.cos(a)*ds,ny=y+Math.sin(a)*ds;
   if(segs.length<limit)segs.push([x,y,nx,ny,col,Math.max(.4,.9-depth*.1),t]);
   x=nx;y=ny;t+=.014;
   if(depth<6&&i>n*.2&&segs.length<limit&&R()<.1-depth*.012){
    grow(x,y,a+(R()<.5?-1:1)*(.3+R()*.65),len*(.48+R()*.3),depth+1,R()<.8?col:pick(pal),t,pal);
   }
  }
  dots.push([x,y,.8+R()*1.6,col,t]);
 }
 function cluster(cx,cy,r,trunks,pal,start,cap,bias,spread){
  limit=segs.length+cap;roots.push([cx,cy]);
  for(var k=0;k<trunks;k++){
   var u=R(),ang=bias===undefined?u*6.2832:bias+(u-.5)*spread,len=r*(.45+R()*.55);
   var col=R()<.14?pick(pal):pal[Math.min(pal.length-1,Math.floor(u*pal.length))];
   grow(cx+Math.cos(ang)*5,cy+Math.sin(ang)*5,ang,len,0,col,start+R()*.5,pal);
  }
 }
 cluster(255,345,165,26,[C.blue,C.pink,C.yellow,C.cyan,C.green,C.blue],0,5000);
 cluster(610,300,215,22,[C.pink,C.blue,C.green,C.yellow,C.green],.3,5500,-.35,4.6);
 cluster(470,585,110,14,[C.cyan,C.blue,C.red,C.yellow],.6,2500,-1.5,5.2);
 cluster(400,115,100,10,[C.green,C.blue,C.red],.9,1800);
 var m=0,i;
 for(i=0;i<segs.length;i++)if(segs[i][6]>m)m=segs[i][6];
 for(i=0;i<dots.length;i++)if(dots[i][4]>m)m=dots[i][4];
 var k=3.4/m;
 for(i=0;i<segs.length;i++)segs[i][6]*=k;
 for(i=0;i<dots.length;i++)dots[i][4]*=k;
 segs.sort(function(a,b){return a[6]-b[6];});
 dots.sort(function(a,b){return a[4]-b[4];});
 return {segs:segs,dots:dots,roots:roots};
}
function poster(c){
 var cols=[C.red,C.yellow,C.pink,C.blue,C.cyan,C.green],i;
 for(i=0;i<6;i++){c.fillStyle=cols[i];c.fillRect(36+i*26,LH-132,26,6);}
 c.fillStyle='#fff';c.font='700 30px "Bricolage Grotesque",Helvetica,Arial,sans-serif';c.fillText('Zoe.',36,LH-88);
 c.fillStyle='#9a9a9a';c.font='400 13px "Bricolage Grotesque",Helvetica,Arial,sans-serif';c.fillText('Neural network visual',36,LH-62);
}
function seg(c,s){c.globalAlpha=.9;c.strokeStyle=s[4];c.lineWidth=s[5];c.beginPath();c.moveTo(s[0],s[1]);c.lineTo(s[2],s[3]);c.stroke();}
function dot(c,d){c.fillStyle=d[3];c.globalAlpha=.16;c.beginPath();c.arc(d[0],d[1],d[2]*2.2,0,6.2832);c.fill();c.globalAlpha=.95;c.beginPath();c.arc(d[0],d[1],d[2],0,6.2832);c.fill();}
function render(cv,btn){
 epoch++;var ep=epoch;
 var w=Math.round(cv.parentNode.clientWidth||900),h=Math.round(w*LH/LW),dpr=Math.min(window.devicePixelRatio||1,2);
 cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);
 var c=cv.getContext('2d'),k=cv.width/LW,cw=cv.width,ch=cv.height;
 var bc=document.createElement('canvas');bc.width=cw;bc.height=ch;
 var b=bc.getContext('2d');b.setTransform(k,0,0,k,0,0);b.lineCap='round';
 var d=build(7),S=d.segs,D=d.dots,Rt=d.roots,si=0,di=0,GROW=3.4,i;
 for(i=0;i<D.length;i++){var m=1e9;for(var j=0;j<Rt.length;j++){var q=Math.hypot(D[i][0]-Rt[j][0],D[i][1]-Rt[j][1]);if(q<m)m=q;}D[i][5]=m/38;}
 function draw(t,amp,nd){
  var s=1+.006*amp*Math.sin(t*.75),cx=cw/2,cy=ch/2;
  c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.fillStyle='#000';c.fillRect(0,0,cw,ch);
  c.setTransform(s,0,0,s,(1-s)*cx,(1-s)*cy);
  c.globalAlpha=1-.1*amp*(1+Math.sin(t*.9))/2;c.drawImage(bc,0,0);
  c.setTransform(k*s,0,0,k*s,(1-s)*cx,(1-s)*cy);
  for(var n=0;n<nd;n++){
   var x=D[n],wv=Math.sin(t*1.5-x[5]),r=x[2]*(1+.45*amp*wv);
   c.fillStyle=x[3];
   c.globalAlpha=.1+.12*amp*(wv+1)/2;c.beginPath();c.arc(x[0],x[1],r*2.2,0,6.2832);c.fill();
   c.globalAlpha=.95;c.beginPath();c.arc(x[0],x[1],r,0,6.2832);c.fill();
  }
  c.setTransform(k,0,0,k,0,0);c.globalAlpha=1;poster(c);
 }
 if(reduce){
  for(i=0;i<S.length;i++)seg(b,S[i]);
  draw(0,0,D.length);
  if(btn)btn.hidden=true;
  return;
 }
 var last=0,vt=0,paused=false,vis=true,raf=0;
 function loop(now){
  raf=0;if(ep!==epoch)return;
  if(!last)last=now;
  vt+=Math.min(.05,(now-last)/1000);last=now;
  while(si<S.length&&S[si][6]<=vt)seg(b,S[si++]);
  while(di<D.length&&D[di][4]<=vt)di++;
  draw(vt,Math.max(0,Math.min(1,(vt-GROW)/1.2)),di);
  if(!paused&&vis)raf=requestAnimationFrame(loop);
 }
 function kick(){if(!raf&&!paused&&vis&&ep===epoch){last=0;raf=requestAnimationFrame(loop);}}
 if(btn){btn.hidden=false;btn.textContent='Pause animation';btn.onclick=function(){paused=!paused;btn.textContent=paused?'Play animation':'Pause animation';if(!paused)kick();};}
 if('IntersectionObserver' in window){new IntersectionObserver(function(en){vis=en[0].isIntersecting;if(vis)kick();}).observe(cv);}
 kick();
}
function stop(){epoch++;}
var API={build:build,render:render,stop:stop};
if(typeof window!=='undefined')window.NN=API;
if(typeof module!=='undefined')module.exports=API;
})();
