/* Light and dark mode. Remembers the visitor's choice and defaults to the system setting. */
(function(){
var R=document.documentElement,K='kt-theme',saved=null;
try{saved=localStorage.getItem(K);}catch(e){}
if(saved==='dark'||saved==='light')R.setAttribute('data-theme',saved);
function cur(){return R.getAttribute('data-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}
function sync(){var d=cur()==='dark';document.querySelectorAll('.tt').forEach(function(b){b.setAttribute('aria-pressed',String(d));b.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');});}
document.addEventListener('click',function(e){
 var b=e.target.closest&&e.target.closest('.tt');if(!b)return;
 var n=cur()==='dark'?'light':'dark';R.setAttribute('data-theme',n);
 try{localStorage.setItem(K,n);}catch(x){}
 sync();
});
document.addEventListener('DOMContentLoaded',sync);
})();
