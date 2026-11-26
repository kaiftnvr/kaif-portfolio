/* Router and project data. Views are switched by the URL hash (#cv, #contact, #hive ...). */
(function(){
// TODO: replace the Behance link with the direct profile URL.
var CFG={tannexSite:"https://www.tannexleather.com",behance:"https://www.behance.net/"};
/* Folder icon (frosted glass front, papers behind). One instance per folder, so ids carry a suffix. */
var FLAP='M40 56H100Q108 56 113 63L122 76Q127 83 135 83H196Q216 83 216 103V150Q216 168 198 168H42Q24 168 24 150V72Q24 56 40 56Z';
function folderScene(u){
 return '<rect x="28" y="30" width="184" height="132" rx="16" fill="url(#bk'+u+')"/>'+
 '<g transform="rotate(-3 92 62)"><rect x="46" y="22" width="92" height="82" rx="8" fill="#f4f4f5"/><rect x="58" y="34" width="62" height="7" rx="3.5" fill="#d2d2d5"/><rect x="58" y="50" width="70" height="4" rx="2" fill="#e0e0e3"/><rect x="58" y="60" width="54" height="4" rx="2" fill="#e0e0e3"/></g>'+
 '<rect x="110" y="30" width="46" height="72" rx="7" fill="#ececee"/><rect x="118" y="42" width="30" height="4" rx="2" fill="#d6d6d9"/><rect x="118" y="54" width="22" height="4" rx="2" fill="#d6d6d9"/>'+
 '<rect x="152" y="42" width="42" height="62" rx="7" fill="#f6f6f7"/><rect x="160" y="54" width="26" height="4" rx="2" fill="#dcdce0"/><rect x="160" y="64" width="20" height="4" rx="2" fill="#dcdce0"/>';
}
function folderSVG(i){
 var u='f'+i;
 return '<svg viewBox="0 0 240 200" aria-hidden="true" focusable="false"><defs>'+
 '<linearGradient id="bk'+u+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e2e30"/><stop offset="1" stop-color="#151516"/></linearGradient>'+
 '<linearGradient id="fg'+u+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".30"/><stop offset=".45" stop-color="#8a8a8d" stop-opacity=".38"/><stop offset="1" stop-color="#101011" stop-opacity=".80"/></linearGradient>'+
 '<clipPath id="fc'+u+'"><path d="'+FLAP+'"/></clipPath>'+
 '<filter id="bl'+u+'" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5"/></filter>'+
 '<filter id="sh'+u+'" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="6"/></filter>'+
 '<g id="sc'+u+'">'+folderScene(u)+'</g></defs>'+
 '<ellipse cx="120" cy="182" rx="84" ry="8" fill="#000" opacity=".28" filter="url(#sh'+u+')"/>'+
 '<use href="#sc'+u+'"/>'+
 '<g clip-path="url(#fc'+u+')"><g filter="url(#bl'+u+')"><use href="#sc'+u+'"/></g></g>'+
 '<path d="'+FLAP+'" fill="url(#fg'+u+')" stroke="#fff" stroke-opacity=".22"/></svg>';
}
var P={
 tannex:{t:"Tannex Leather",g:"Creative direction · Brand · Catalogue · Web",b:["Tannex Leather is the leather brand where I have been Creative Director since June 2024.","I lead the creative vision, brand strategy and visual direction. I developed the brand identity: logo concepts, colour palettes, typography and the overall look.","I direct product presentation, catalogue design and promotional material to give the brand a premium image.","I designed the Tannex Leather website on my own and manage its digital presence and creative marketing. The visual content and branding materials are made to help the brand get noticed by international B2B buyers.","I handle the whole creative process myself, from first concepts and planning to final execution."],l:"site",lt:"Visit the Tannex Leather website",img:"assets/img/projects/tannex.jpg",alt:"The Tannex Leather website homepage"},
 cremm:{t:"Cremm Coffee House",g:"Brand identity",b:["A complete identity for a coffee house: logo, wordmark, packaging, signage-style visuals and social media assets.","The full brand case study is below: the logo and cup mark, the colour palette, mockups, the shopfront and poster designs."],l:"be",lt:"See Cremm on Behance",img:"assets/img/projects/cremm-case-study.jpg",alt:"Cremm Coffee House brand case study: logo, cup, colour palette, mockups, shopfront and poster designs"},
 wallace:{t:"WALLACE",g:"Brand identity",b:["The identity for a western denim label: logo mark, typography, colour and pattern guidelines.","The full brand case study is below: the logo, the leather label on a denim pocket, the logo grid, the campaign line and the photography."],l:"be",lt:"See WALLACE on Behance",img:"assets/img/projects/wallace-case-study.jpg",alt:"Wallace brand case study: the logo over a rider on horseback, the leather label on a denim pocket, the logo grid, the line Made to endure, and campaign photography"},
 hive:{t:"Hive",g:"Brand identity",b:["The identity for HIVE, a home-management platform that keeps household tasks, bills, groceries, schedules and reminders in one place. The logo mark is built to scale from an app icon up to product UI.","The full brand case study is below: the logo and its grid, the Honey Gold colour, the typography, the app icon in several colours, and the campaign."],l:"be",lt:"See Hive on Behance",imgs:["assets/img/projects/hive-case-study-1.jpg","assets/img/projects/hive-case-study-2.jpg"],alts:["Hive brand case study: the HIVE wordmark over an architects’ studio, the logo, the logo grid and the Honey Gold colour","Hive brand case study: typography, the H app icon in several colours, a phone home screen and the campaign line, a better way to track your bills"]},
 zoe:{t:"Zoe",g:"AI assistant · In progress",b:["An AI assistant for freelancers and small businesses. It helps manage clients, projects, deadlines and payments without doing everything by hand.","Most businesses don’t want another chatbot. They want to save time, avoid missed payments and keep client work organised, and Zoe is built around that.","Say a client writes: can you also make three more Instagram posts, and deliver everything by Friday. Zoe spots the new request and checks it against the original scope. It flags the extra work, estimates the effect on the deadline and drafts a professional reply for approval. Once approved, it updates the project.","Version 1 has five features:"],f:["AI client manager","Smart project tracker","Payment tracker","AI communication assistant","Business intelligence"],n:"Business intelligence answers questions like which client owes me the most, or which project is overdue.",x:"I am building it myself, from scratch. It is still in progress.",l:"none",art:"neural"}
};
var C={
 graphic:{t:"Graphic design projects",i:[],s:[["Cremm Coffee House","cremm"],["WALLACE","wallace"],["Hive","hive"]]},
 motion:{t:"Motion design projects",i:[],s:[["Coming soon",null]],n:"Building. Motion projects will appear here."},
 commercial:{t:"Commercial projects",i:[],s:[["Tannex Leather","tannex"]]},
 tech:{t:"Tech projects",i:[],s:[["Zoe","zoe"]]},
 threed:{t:"Three-dimensional visuals",i:[],s:[["Interior and exterior design","interior"],["Modeling","modeling"]],bk:["types","Back to all types"]},
 interior:{t:"Interior and exterior design",i:[],n:"Building. Three-dimensional interior and exterior projects will appear here.",bk:["threed","Back to three-dimensional visuals"]},
 modeling:{t:"Modeling",i:[],n:"Building. Three-dimensional modeling projects will appear here.",bk:["threed","Back to three-dimensional visuals"]}
};
var F={};
function rowEl(i,x,link){
 var li=document.createElement('li'),e=document.createElement(link?'a':'div');e.className='row';if(link)e.href='#'+link;
 var n=document.createElement('span');n.className='n';n.textContent=('0'+(i+1)).slice(-2);
 var d=document.createElement('div'),h3=document.createElement('h3'),tg=document.createElement('span');
 h3.textContent=x.t;tg.className='t';tg.textContent=x.g;d.appendChild(h3);d.appendChild(tg);
 var q=document.createElement('p');q.textContent=x.b[0];
 e.appendChild(n);e.appendChild(d);e.appendChild(q);li.appendChild(e);return li;
}
var h=document.getElementById('home'),c=document.getElementById('contactpage'),p=document.getElementById('projectpage'),cp=document.getElementById('catpage'),T=document.title;
function r(){
 if(window.NN)window.NN.stop();
 var k=location.hash.slice(1),pr=P[k],cat=C[k],cv=k==='cv';
 h.hidden=!!(pr||cat||cv||k==='contact');c.hidden=k!=='contact';p.hidden=!pr;cp.hidden=!cat;document.getElementById('cvpage').hidden=!cv;
 if(cv){document.title='CV | Kaif Tanveer';window.scrollTo(0,0);}
 else if(cat){
  document.title=cat.t+' | Kaif Tanveer';
  document.getElementById('cTitle').textContent=cat.t;
  var ul=document.getElementById('cList'),nt=document.getElementById('cNote');ul.textContent='';
  cat.i.forEach(function(id,i){ul.appendChild(rowEl(i,P[id]||F[id],P[id]?id:null));});
  ul.hidden=!cat.i.length;nt.hidden=!cat.n;nt.textContent=cat.n||'';
  var sb=document.getElementById('cSub');sb.textContent='';sb.hidden=!cat.s;
  (cat.s||[]).forEach(function(x,i){var a=document.createElement(x[1]?'a':'span');a.className=x[1]?'fld':'fld off';if(x[1])a.href='#'+x[1];var fi=document.createElement('span');fi.className='fi';fi.innerHTML=folderSVG(i);var fl=document.createElement('span');fl.className='fl';fl.textContent=x[0];a.appendChild(fi);a.appendChild(fl);sb.appendChild(a);});
  var bk=document.getElementById('cBack');bk.href='#'+(cat.bk?cat.bk[0]:'types');bk.textContent=cat.bk?cat.bk[1]:'Back to all types';
  window.scrollTo(0,0);
 }else if(pr){
  document.title=pr.t+' | Kaif Tanveer';
  document.getElementById('pTags').textContent=pr.g;
  document.getElementById('pTitle').textContent=pr.t;
  var gal=document.getElementById('pGallery');gal.textContent='';
  (pr.imgs||(pr.img?[pr.img]:[])).forEach(function(src,i){
   var im=document.createElement('img');im.src=src;im.loading='lazy';im.decoding='async';
   im.alt=(pr.alts&&pr.alts[i])||(i?pr.t+' ('+(i+1)+')':pr.alt)||pr.t;
   im.onload=function(){im.style.maxWidth=Math.min(1100,im.naturalWidth*2)+'px';};
   gal.appendChild(im);
  });
  if(pr.art==='neural'&&window.NN){
   var nf=document.createElement('figure');nf.className='nnfig';
   var nc=document.createElement('canvas');nc.setAttribute('role','img');nc.setAttribute('aria-label','Colourful neural network artwork: neuron-like branching clusters on black');
   nf.appendChild(nc);gal.insertBefore(nf,gal.firstChild);
   var go=function(){window.NN.render(nc);};
   if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();go();}},{threshold:.2});io.observe(nf);}else{go();}
  }
  var b=document.getElementById('pBody');b.textContent='';
  pr.b.forEach(function(s){var e=document.createElement('p');e.textContent=s;b.appendChild(e);});
  if(pr.f){var ul=document.createElement('ul');ul.className='chips';pr.f.forEach(function(s){var li=document.createElement('li');li.textContent=s;ul.appendChild(li);});b.appendChild(ul);}
  [pr.n,pr.x].forEach(function(s){if(s){var e=document.createElement('p');e.textContent=s;b.appendChild(e);}});
  var a=document.getElementById('pLink'),u=pr.l==='site'?CFG.tannexSite:(pr.l==='none'?'':CFG.behance);
  a.hidden=!u;if(u){a.href=u;a.textContent=pr.lt;}
  window.scrollTo(0,0);
 }else if(k==='contact'){document.title='Contact | Kaif Tanveer';window.scrollTo(0,0);}
 else{document.title=T;var e=k&&document.getElementById(k);if(e)e.scrollIntoView();}
}
addEventListener('hashchange',r);r();
})();
