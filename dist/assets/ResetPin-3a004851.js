import{_ as O}from"./keyIcon-59861900.js";import{u as S,i as $,s as B,v as a,L as D,c as E,r as c,o as u,a as i,w as _,d as P,b as y,m as R,e as p,t as V,x as F,n as G,z as j}from"./index-ffa3455d.js";const z=p("div",null,[p("img",{src:O,alt:"",class:"mx-auto"})],-1),A={class:"ion-padding mb-2 flex flex-col gap-4"},J={class:"text-center text-2xl font-semibold text-primary"},K={__name:"ResetPin",setup(T){const d=S(),x=$(),f=B("http"),{showToast:h,processError:w}=j,m=a(!0),r=a(!1),s=a(!1),o=a(!1),n=a("new"),l=D({pin:"",confirmPin:""}),I=E(()=>d.getUser),b=async e=>{if(s.value=!1,e.length==6){if(o.value=!1,n.value=="new")return l.pin=e,s.value=!0,n.value="confirm",!1;if(n.value=="confirm"&&l.pin!==e)return o.value="Pin doesn't match",!1;N(e)}},N=async e=>{if(e.length==6){s.value=!1,r.value=!0;const t={userId:I.value.id,pin:l.pin,confimPin:e};try{await f({endpoint:"ForgotPinUpdate",httpMethod:"patch",body:t}),r.value=!1,h("success","Pin updated successful"),s.value=!1,m.value=!1,n.value="new",C(),x.push({name:"AccountSettings"})}catch(v){r.value=!1;const g=JSON.stringify(v.response.data.message[0]);o.value=g}}},C=async()=>{try{const e=await f({endpoint:"GetUser",httpMethod:"get"});console.log(e),d.$patch({user:e}),U(e)}catch(e){const t=w(e);h("error",t),console.log(t)}},U=async e=>{try{const t=await f({endpoint:"GetUserLocation",httpMethod:"get",body:l});e.location=t,d.$patch({user:e}),console.log(e)}catch(t){console.log(t)}};return(e,t)=>{const v=c("PNav"),g=c("POtpbox"),k=c("PInputpin"),L=c("PLoader");return u(),i(P(G),null,{default:_(()=>[y(v),m.value?(u(),i(g,{key:0,onComplete:t[0]||(t[0]=M=>m.value=!1)})):(u(),i(P(R),{key:1},{default:_(()=>[z,p("div",A,[p("h3",J,V(n.value==="new"?"Enter New Pin":"Confirm Pin"),1),y(k,{error:o.value,onResetError:t[1]||(t[1]=M=>o.value=!1),onInput:b,clearInput:s.value},null,8,["error","clearInput"])])]),_:1})),r.value?(u(),i(L,{key:2})):F("",!0)]),_:1})}}};export{K as default};
