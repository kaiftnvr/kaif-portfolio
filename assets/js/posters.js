/* Posters section: seven posters move left to right. They fade in from the left edge, are fully visible at the centre and fade out at the right edge, then start again. */
(function(){
var st=document.getElementById('pStage');if(!st)return;
var im=[].slice.call(st.querySelectorAll('.pp')),N=im.length,W=0,pw=0,raf=0,vis=true,vt=0,last=0,
 RM=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,SLOT_SECONDS=2.6,HOVER_SCALE=1.45,hov=-1,leaveT=0,settleT=0;
function size(){
 W=st.clientWidth;pw=Math.max(96,Math.min(230,W*.17));
 st.style.height=Math.round(pw*4/3+90)+'px';
 im.forEach(function(e){e.style.width=pw+'px';});
}
function draw(t){
 var slot=W/N,off=t*slot/SLOT_SECONDS;
 for(var i=0;i<N;i++){
  var xc=(((i+.5)*slot+off)%W+W)%W,p=xc/W,o=1-Math.pow(Math.abs(2*p-1),2.4),s=.8+.2*o,z=Math.round(o*100),e=im[i],live=o>=.15;
  if(hov>=0){
   if(i===hov){s=HOVER_SCALE;o=1;z=300;var hw=pw*s/2;xc=Math.max(hw,Math.min(W-hw,xc));live=true;}
   else{o*=.4;}
  }
  e.style.pointerEvents=live?'auto':'none';
  e.style.opacity=o.toFixed(3);
  e.style.zIndex=z;
  e.style.transform='translate3d('+(xc-pw/2).toFixed(1)+'px,-50%,0) scale('+s.toFixed(3)+')';
 }
}
function setHover(i){
 if(hov===i)return;
 hov=i;
 clearTimeout(settleT);st.classList.add('anim');
 if(i>=0){if(raf){cancelAnimationFrame(raf);raf=0;}}
 draw(vt);
 if(i<0){kick();settleT=setTimeout(function(){st.classList.remove('anim');},460);}
}
function loop(now){
 raf=0;
 if(!last)last=now;
 vt+=Math.min(.05,(now-last)/1000);last=now;
 draw(vt);
 if(vis&&!RM)raf=requestAnimationFrame(loop);
}
function kick(){if(!raf&&vis&&!RM){last=0;raf=requestAnimationFrame(loop);}}
im.forEach(function(e,i){
 e.addEventListener('mouseenter',function(){clearTimeout(leaveT);setHover(i);});
 e.addEventListener('mouseleave',function(){leaveT=setTimeout(function(){setHover(-1);},80);});
});
document.addEventListener('touchstart',function(e){if(hov>=0&&!st.contains(e.target))setHover(-1);},{passive:true});
size();draw(0);
window.addEventListener('resize',function(){size();draw(vt);});
if('IntersectionObserver' in window){new IntersectionObserver(function(en){vis=en[0].isIntersecting;if(vis)kick();}).observe(st);}else{kick();}
kick();
})();
