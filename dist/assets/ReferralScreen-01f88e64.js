import{u as L,s as U,v as I,c as y,j as z,A as G,r as _,o as c,a as x,w as f,d as t,z as W,b as i,g as H,k as O,l as Y,e,q as v,t as a,h as p,F as D,y as S,m as K,x as Q,n as X,B as Z}from"./index-ffa3455d.js";const ee="/assets/copy-p-1449a383.svg",te="/assets/refIcon-cba1405c.svg",se="/assets/emptyUser-4c8a142a.svg",ae=e("h3",{class:"px-4 pb-2 text-2xl font-semibold text-primary"}," Referral & Bonus ",-1),re={class:"ion-padding relative grid grid-cols-1 gap-4 pt-0"},oe=e("div",{class:""},[e("p",{class:"text-sm text-dark-400"},[v(" Share your referral code and get "),e("span",{class:"font-semibold"},"₦500"),v(" when whoever you refer signs up and makes an order ")])],-1),ne={class:"relative mt-6 flex items-center gap-4 text-primary"},le={class:"flex w-fit items-center gap-2 rounded-full border-2 border-secondary bg-primary-light px-4 py-2 text-base font-medium"},ce={class:"absolute -right-16 -top-10"},ie=["src"],de={class:"ion-padding flex flex-col gap-1 py-2 text-center text-dark-300"},ue=e("span",{class:"text-xs"},"Total Earnings",-1),pe={class:"text-2xl font-semibold text-primary"},me={class:"px-4 pt-3 text-dark-500"},_e=e("h4",{class:"mb-3 text-lg"},"My Referrals",-1),fe={key:0,class:"grid grid-cols-1 gap-4"},ge={class:"mb-4 text-sm text-dark-400"},he={class:"grid grid-cols-1 gap-4 text-sm"},ye={class:"flex h-14 w-14 flex-shrink-0 items-center items-center justify-center rounded-full border-2 border-tertiary-light bg-primary p-2 font-medium text-tertiary"},xe={class:"flex w-full justify-between gap-4"},ve={class:"grid grid-cols-1 text-left"},be={class:"text-lg"},ke={class:"text-xs uppercase text-dark-400"},we={class:"grid grid-cols-1 justify-items-end text-left"},Re={class:"text-[16px] font-medium"},Ie={__name:"ReferralScreen",setup(Ee){const{copyText:M,formatAmount:b,initials:N,formatDate:Ce,shareText:j,processError:k,transformData:g}=W,u=L(),w=U("http"),h=I(!1),r=y(()=>u.getUser),R=y(()=>u.getReferralEarnings),m=I([]),d=y(()=>u.getReferrals);m.value=g(d.value);let B=["January","February","March","April","May","June","July","August","September","October","November","December"],T=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];const F=()=>{j({text:`Make your life 10x better! Sign up with my referral code ${r.value&&r.value.ref_code} & enjoy 5% off your first order today!`,url:`https://admin-main-dev.onrender.com/auth/register?ref=${r.value&&r.value.ref_code}`})},V=async s=>{await E(),await C(),s.target.complete()};z(async()=>{h.value=!0,await E(),await C(),h.value=!1,m.value=g(d.value)}),G(d,()=>{m.value=g(d.value)});const E=async()=>{try{const s=await w({endpoint:"GetReferrals",httpMethod:"get"});console.log(s),u.$patch({referrals:s.items})}catch(s){const o=k(s);console.log(o)}},C=async()=>{try{const s=await w({endpoint:"GetReferralEarnings",httpMethod:"get"});console.log(s),u.$patch({referralEarnings:s})}catch(s){const o=k(s);console.log(o)}};return(s,o)=>{const $=_("PNav"),P=_("PDivider"),A=_("PEmpty"),q=_("PLoader");return c(),x(t(X),null,{default:f(()=>[i(t(H),{class:"ion-no-border bg-white"},{default:f(()=>[i($),ae]),_:1}),i(t(K),{fullscreen:"",class:""},{default:f(()=>[i(t(O),{slot:"fixed",onIonRefresh:o[0]||(o[0]=n=>V(n))},{default:f(()=>[i(t(Y))]),_:1}),e("div",re,[oe,e("div",ne,[e("div",le,[v(a(r.value&&r.value.ref_code)+" ",1),e("img",{onClick:o[1]||(o[1]=n=>t(M)(r.value&&r.value.ref_code)),src:ee,alt:""})]),e("i",{onClick:F,class:"pi pi-share-alt text-xl font-bold"}),e("span",ce,[e("img",{src:t(te),alt:""},null,8,ie)])])]),i(P,{class:"mt-20"}),e("div",de,[ue,e("span",pe,a(t(b)(R.value?R.value:0)),1)]),i(P),e("div",me,[_e,d.value&&d.value.length?(c(),p("div",fe,[(c(!0),p(D,null,S(m.value,(n,J)=>(c(),p("div",{key:J},[e("p",ge,a(t(T)[n.day])+", "+a(t(B)[n.month])+" "+a(n.date)+", "+a(n.year),1),e("div",he,[(c(!0),p(D,null,S(n.data,l=>(c(),p("div",{key:l.id,class:"flex items-center gap-3 border-b border-dark-50 pb-4 last:border-0"},[e("div",ye,a(t(N)(l.user)),1),e("div",xe,[e("div",ve,[e("span",be,a(l.user.first_name)+" "+a(l.user.last_name),1),e("span",ke,a(l.time),1)]),e("div",we,[e("span",Re,a(t(b)(l.amount)),1),e("span",{class:Z([l.completed?"text-secondary":"text-warning","text-xs "])},a(l.completed?"Completed":"Pending"),3)])])]))),128))])]))),128))])):(c(),x(A,{key:1,icon:t(se),caption:"You don’t have any referrals at the moment"},null,8,["icon"]))])]),_:1}),h.value?(c(),x(q,{key:0})):Q("",!0)]),_:1})}}};export{Ie as default};