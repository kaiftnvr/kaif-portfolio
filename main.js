/* Router and project data. Views are switched by the URL hash (#cv, #contact, #hive ...). */
(function(){
// TODO: replace the Behance link with the direct profile URL.
var CFG={tannexSite:"https://www.tannexleather.com",behance:"https://www.behance.net/"};
var P={
 tannex:{t:"Tannex Leather",g:"Creative direction · Brand · Catalogue · Web",b:["Tannex Leather is the leather brand where I have been Creative Director since June 2024.","I lead the creative vision, brand strategy and visual direction. I developed the brand identity: logo concepts, colour palettes, typography and the overall look.","I direct product presentation, catalogue design and promotional material to give the brand a premium image.","I designed the Tannex Leather website on my own and manage its digital presence and creative marketing. The visual content and branding materials are made to help the brand get noticed by international B2B buyers.","I handle the whole creative process myself, from first concepts and planning to final execution."],l:"site",lt:"Visit the Tannex Leather website"},
 cremm:{t:"Cremm Coffee House",g:"Brand identity",b:["A complete identity for a coffee house: logo, wordmark, packaging, signage-style visuals and social media assets."],l:"be",lt:"See Cremm on Behance"},
 wallace:{t:"WALLACE",g:"Brand identity",b:["The identity for a western denim label: logo mark, typography, colour and pattern guidelines."],l:"be",lt:"See WALLACE on Behance"},
 hive:{t:"Hive",g:"Brand identity",b:["The identity for a minimal smart home platform. The logo mark is built to scale from an app icon up to product UI."],l:"be",lt:"See Hive on Behance"},
 zoe:{t:"Zoe",g:"AI assistant · In progress",b:["An AI assistant for freelancers and small businesses. It helps manage clients, projects, deadlines and payments without doing everything by hand.","Most businesses don’t want another chatbot. They want to save time, avoid missed payments and keep client work organised, and Zoe is built around that.","Say a client writes: can you also make three more Instagram posts, and deliver everything by Friday. Zoe spots the new request and checks it against the original scope. It flags the extra work, estimates the effect on the deadline and drafts a professional reply for approval. Once approved, it updates the project.","Version 1 has five features:"],f:["AI client manager","Smart project tracker","Payment tracker","AI communication assistant","Business intelligence"],n:"Business intelligence answers questions like which client owes me the most, or which project is overdue.",x:"I am building it myself, from scratch. It is still in progress.",l:"none"}
};
var C={
 graphic:{t:"Graphic design projects",i:["cremm","wallace","hive"]},
 motion:{t:"Motion design projects",i:[],n:"Building. Motion projects will appear here."},
 commercial:{t:"Commercial projects",i:["tannex"]},
 tech:{t:"Tech projects",i:["zoe"]},
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
  (cat.s||[]).forEach(function(x,i){var a=document.createElement('a');a.className='btn s cat';a.href='#'+x[1];var sp=document.createElement('span');sp.textContent='0'+(i+1);a.appendChild(sp);a.appendChild(document.createTextNode(x[0]));sb.appendChild(a);});
  var bk=document.getElementById('cBack');bk.href='#'+(cat.bk?cat.bk[0]:'types');bk.textContent=cat.bk?cat.bk[1]:'Back to all types';
  window.scrollTo(0,0);
 }else if(pr){
  document.title=pr.t+' | Kaif Tanveer';
  document.getElementById('pTags').textContent=pr.g;
  document.getElementById('pTitle').textContent=pr.t;
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
