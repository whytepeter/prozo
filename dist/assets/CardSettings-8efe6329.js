import{u as A,s as E,v as h,c as F,j as z,r as c,o,a as _,w as n,d as r,z as L,b as t,k as M,l as R,e as d,h as i,x as v,F as j,y as q,m as K,n as T,q as $}from"./index-ffa3455d.js";import{_ as D}from"./CreditCard-f0860296.js";import{S as G,A as W,K as Y,N as H,b as J,a as O}from"./swiper-slide-dd9ef5d1.js";import"./fade-fff22378.js";const Q="/assets/creditCard-c03bbafd.svg",U={class:"ion-padding grid grid-cols-1 gap-2 py-0"},X=d("h3",{class:"text-2xl font-semibold text-primary"},"Card Settings",-1),Z={key:0,class:"text-sm text-dark-400"},ee={key:0,class:"ion-padding w-full text-dark-500"},te={key:1,class:"py-6"},ae={class:"ion-padding mb-4"},se=d("span",{class:"flex items-center gap-2 capitalize"},[d("i",{class:"pi pi-plus"}),$(" Add a new debit card ")],-1),ue={__name:"CardSettings",setup(oe){const m=A(),f=E("http"),{showToast:ne,formatAmount:re,openBrowser:y,processError:g}=L,w=[W,Y,H,J],C=h(),k=e=>{C.value=e},a=h(!1),s=F(()=>m.getCards);console.log("Cards",s.value);const x=async e=>{await u(),e.target.complete()};z(()=>{u()});const P=async()=>{try{a.value=!0;const e=await f({endpoint:"AddCard",httpMethod:"get"});a.value=!1,y(e.data.authorization_url,"popover",u),console.log(e)}catch(e){a.value=!1;const l=g(e);console.log(l)}},u=async()=>{try{a.value=!0;const e=await f({endpoint:"GetCards",httpMethod:"get"});a.value=!1,console.log(e),m.$patch({cards:e.items})}catch(e){a.value=!1;const l=g(e);console.log(l)}};return(e,l)=>{const b=c("PNav"),S=c("PEmpty"),I=c("PLoader"),N=c("PButton"),B=c("PFooter");return o(),_(r(T),null,{default:n(()=>[t(b,{title:""}),t(r(K),{fullscreen:""},{default:n(()=>[t(r(M),{slot:"fixed",onIonRefresh:l[0]||(l[0]=p=>x(p))},{default:n(()=>[t(r(R))]),_:1}),d("div",U,[X,s.value&&s.value.length?(o(),i("p",Z," Manage Cards ")):v("",!0)]),s.value&&s.value.length?(o(),i("div",ee,[t(r(G),{modules:w,autoplay:!1,zoom:!0,"space-between":20,slidesPerView:s.value&&s.value.length>1?1.1:1,onSwiper:k,class:""},{default:n(()=>[(o(!0),i(j,null,q(s.value,(p,V)=>(o(),_(r(O),{class:"",key:V},{default:n(()=>[t(D,{card:p},null,8,["card"])]),_:2},1024))),128))]),_:1},8,["slidesPerView"])])):(o(),i("div",te,[t(S,{icon:r(Q),caption:"You don’t have any cards at the moment"},null,8,["icon"])]))]),_:1}),a.value?(o(),_(I,{key:0})):v("",!0),t(B,null,{default:n(()=>[d("div",ae,[t(N,{onClick:P,loading:a.value,block:""},{default:n(()=>[se]),_:1},8,["loading"])])]),_:1})]),_:1})}}};export{ue as default};
