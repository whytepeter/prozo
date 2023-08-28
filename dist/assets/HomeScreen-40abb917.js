import{_ as b}from"./food-259e8d10.js";import{u as m,c as g,o as _,a as v,w as i,b as e,d as t,I as y,e as s,t as w,f as p,g as $,r as f,h as x,i as S,j as k,P as I,k as P,l as C,m as j,n as E}from"./index-ffa3455d.js";const H="/assets/cleaning-4a778f3a.png",R="/assets/laundry-b5bdae89.png",B="/assets/fumigation-a2081e4b.png",D="/assets/subscription-249d6e58.png",N="/assets/gift-419a89a2.svg",F="/assets/bell-89a1657e.svg",T={class:"flex items-center justify-between"},V={class:"flex items-center gap-2"},U={class:"w-52 truncate text-lg font-medium text-dark-500"},L=s("span",{class:"text-dark-300"}," Hello, ",-1),O={class:"text-primary"},W={class:"flex items-center gap-1"},q={class:"ion-activatable relative overflow-hidden p-2"},z=s("img",{src:N,alt:""},null,-1),A=s("img",{src:F,alt:""},null,-1),G=s("div",{class:"absolute right-2 top-2 rounded-full border-2 border-white bg-secondary p-1"},null,-1),J={__name:"ProfileHeader",setup(u){const r=m(),o=g(()=>r.getUser);return console.log(o.value),(a,c)=>(_(),v(t($),{class:"ion-no-border bg-white pt-2"},{default:i(()=>[e(t(y),{color:"white",class:"mt-2 p-4"},{default:i(()=>[s("div",T,[s("div",V,[s("div",U,[L,s("span",O,w(o.value&&o.value.first_name),1)])]),s("div",W,[s("span",q,[z,e(t(p),{class:"text-dark-200",type:"unbounded"})]),s("span",{onClick:c[0]||(c[0]=l=>a.$router.push({name:"Notification"})),class:"ion-activatable relative overflow-hidden p-2"},[A,G,e(t(p),{class:"text-dark-200",type:"unbounded"})])])])]),_:1})]),_:1}))}},K="/assets/sadEmogi-74916eac.svg",M={class:"ion-padding py-8"},Q={__name:"TodayService",setup(u){return(r,o)=>{const a=f("PEmpty");return _(),x("main",M,[e(a,{icon:t(K),title:"Oops",caption:" No services scheduled for today"},null,8,["icon"])])}}};const X={class:"ion-padding -mt-2 grid grid-cols-1 gap-4 text-dark-500"},Y=s("span",null,"Food Services",-1),Z=s("div",{class:"absolute -right-6 -top-6 h-[7rem] w-[7rem]"},[s("img",{src:b,alt:"",class:"w-full object-cover"})],-1),ss=[Y,Z],es=s("div",{class:"grid grid-cols-12 gap-3 text-xs"},[s("div",{class:"cleaningStyle"},[s("div",{class:"absolute -top-4 right-0 h-20 w-20"},[s("img",{src:H,alt:"",class:"w-full object-cover"})]),s("span",null,"Cleaning")]),s("div",{class:"col-span-7 grid grid-cols-2 gap-3"},[s("div",{class:"cardStyle border-accent bg-accent-light"},[s("div",{class:"absolute right-0 top-1 h-14 w-14"},[s("img",{src:R,alt:"",class:"w-full object-cover"})]),s("span",null,"Laundry")]),s("div",{class:"cardStyle border-info bg-info-light"},[s("div",{class:"absolute right-0 top-1 h-14 w-14"},[s("img",{src:B,alt:"",class:"w-full object-cover"})]),s("span",null,"Fumigation")])])],-1),ts=s("span",{class:"ml-16"},"Start a subscriptions",-1),os=s("div",{class:"absolute -bottom-6 -left-5 h-24 w-24"},[s("img",{src:D,alt:"",class:"w-full object-cover"})],-1),as=[ts,os],is={__name:"HomeScreen",setup(u){const r=m(),o=S(),a=g(()=>r.getUser),c=async l=>{setTimeout(()=>{l.target.complete()},2e3)};return k(async()=>{a.value&&!a.value.isPinSet&&(await I.set({key:"fromHome",value:"true"}),o.push({name:"ChangePin"}))}),(l,n)=>{const h=f("PDivider");return _(),v(t(E),null,{default:i(()=>[e(J),e(t(j),{fullscreen:""},{default:i(()=>[e(t(P),{slot:"fixed",onIonRefresh:n[0]||(n[0]=d=>c(d))},{default:i(()=>[e(t(C))]),_:1}),s("div",X,[s("div",{onClick:n[1]||(n[1]=d=>l.$router.push({name:"FoodService"})),class:"foodStyle"},ss),es,s("div",{onClick:n[2]||(n[2]=d=>l.$router.push({name:"Subscription"})),class:"subStyle"},as)]),e(h),e(Q)]),_:1})]),_:1})}}};export{is as default};
