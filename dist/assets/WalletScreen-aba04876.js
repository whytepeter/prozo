import{u as F,s as D,v as h,c as A,r as C,o as s,h as i,b as m,w as k,e,t as x,a as B,x as W,d as _,F as N,y as R,q as M,z as j,A as Y,j as H,B as Q,k as X,l as Z,m as ee,n as te}from"./index-ffa3455d.js";import{_ as se}from"./fade-fff22378.js";import{_ as oe}from"./CreditCard-f0860296.js";import{S as ae,a as ne,A as le,K as re,N as ce,b as ie}from"./swiper-slide-dd9ef5d1.js";const de="/assets/giftcard-y-1b6b074e.svg",ue={class:"grid grid-cols-1 gap-4 px-2 py-4"},pe={class:"text-2xl font-semibold text-primary"},ve={key:1},me={key:2},_e=e("i",{class:"pi pi-plus"},null,-1),ge={class:"grid grid-cols-2 gap-2"},fe={__name:"FundWallet",props:{isOpen:{type:Boolean,default:!1}},emits:["close"],setup(T,{emit:w}){const{openBrowser:$,showToast:d,processError:a}=j,c=F(),n=D("http"),u=[le,re,ce,ie],b=h(),t=o=>{b.value=o},p=o=>{console.log(o.activeIndex),V.value=o.activeIndex},v=h(!1),g=h("amount"),l=h(""),P=h(!1),y=h(),V=h(0),S=A(()=>c.getCards),G=A(()=>{if(S.value.length){let o;return o=S.value.find((r,f)=>f===V.value),o}}),J=()=>{console.log(l.value),l.value.toString().trim()!==""&&!isNaN(l.value)?S.value.length?g.value="method":E("new"):P.value="Please enter amount"},q=()=>{V.value=0,g.value="amount",l.value="",w("close")},E=async o=>{y.value=o;try{v.value=!0,console.log(G.value);const r={amount:l.value.toString(),cardType:o,cardId:G.value&&G.value.id};console.log(r),o=="new"&&delete r.cardId;const f=await n({endpoint:"FundWallet",httpMethod:"post",body:r});console.log(f),o=="new"&&$(f.data.authorization_url,"popover",L),w("close"),await L(),v.value=!1}catch(r){v.value=!1;const f=a(r);console.log(f),d("error",f)}},L=async()=>{try{v.value=!0;const o=await n({endpoint:"GetWallet",httpMethod:"get"}),r=await n({endpoint:"GetTransactions",httpMethod:"get"});if(y.value=="new"){const f=await n({endpoint:"GetCards",httpMethod:"get"});c.$patch({cards:f.items})}v.value=!1,c.$patch({transactions:r.items}),c.setWalletBalance(o)}catch(o){v.value=!1}};return(o,r)=>{const f=C("PInput"),O=C("PButton"),U=C("PModal"),K=C("PLoader");return s(),i(N,null,[m(U,{type:"sheet",noHeader:"",initialBreakpoint:1,persistence:"",height:g.value=="amount"?"h-[300px]":"h-[350px]",breakpoints:[0,1],isOpen:T.isOpen,onClose:q},{default:k(()=>[e("div",ue,[e("h3",pe,x(g.value=="amount"?"Enter amount you wish to fund":"Select funding option"),1),g.value=="amount"?(s(),B(f,{key:0,error:P.value,format:"",modelValue:l.value,"onUpdate:modelValue":r[0]||(r[0]=I=>l.value=I),label:"Amount",inputmode:"numeric"},null,8,["error","modelValue"])):W("",!0),g.value=="method"&&S.value.length?(s(),i("div",ve,[m(_(ae),{modules:u,autoplay:!1,zoom:!0,"space-between":20,slidesPerView:S.value&&S.value.length>1?1.1:1,onSwiper:t,onSlideChange:p,class:""},{default:k(()=>[(s(!0),i(N,null,R(S.value,(I,z)=>(s(),B(_(ne),{class:"",key:z},{default:k(()=>[m(oe,{card:I,color:V.value==z?"secondary":"dark-100",outlined:""},null,8,["card","color"])]),_:2},1024))),128))]),_:1},8,["slidesPerView"])])):W("",!0),g.value=="method"?(s(),i("div",me,[e("span",{onClick:r[1]||(r[1]=I=>E("new")),class:"flex cursor-pointer items-center gap-1 text-sm text-secondary"},[_e,M(" Use a different card ")])])):W("",!0),e("div",ge,[m(O,{block:"",fill:"outline",onClick:q},{default:k(()=>[M("Cancel")]),_:1}),g.value=="amount"?(s(),B(O,{key:0,loading:v.value,block:"",onClick:J},{default:k(()=>[M("Next")]),_:1},8,["loading"])):(s(),B(O,{key:1,loading:v.value,block:"",onClick:r[2]||(r[2]=I=>E("existing"))},{default:k(()=>[M("Continue")]),_:1},8,["loading"]))])])]),_:1},8,["height","isOpen"]),v.value?(s(),B(K,{key:0})):W("",!0)],64)}}},he={class:"relative grid h-[130px] grid-cols-1 gap-6 rounded-2xl bg-primary p-5 pb-4"},ye={class:"flex items-center justify-between text-primary-light"},xe={class:"text-2xl font-semibold"},we={key:0,class:"pi pi-eye-slash"},be={key:1,class:"pi pi-eye"},ke=e("i",{class:"pi pi-plus"},null,-1),$e=e("span",{class:"pointer-events-none absolute right-0 top-0"},[e("img",{src:se,alt:""})],-1),Ce={__name:"WalletCard",setup(T){const w=F(),{formatAmount:$}=j,d=h(!1),a=h(!0),c=A(()=>w.getWalletBalance);return console.log(c.value),(n,u)=>(s(),i(N,null,[e("div",he,[e("div",ye,[e("span",xe,x(a.value?_($)(c.value):"₦******"),1),e("span",{onClick:u[0]||(u[0]=b=>a.value=!a.value),class:"text-xl"},[a.value?(s(),i("i",we)):(s(),i("i",be))])]),e("div",null,[e("span",{onClick:u[1]||(u[1]=b=>d.value=!0),class:"flex cursor-pointer items-center gap-2 text-tertiary-light"},[ke,M(" Fund Wallet ")])]),$e]),m(fe,{isOpen:d.value,onClose:u[2]||(u[2]=b=>d.value=!1)},null,8,["isOpen"])],64))}},Pe="/assets/inflow-67e00a06.svg",Se="/assets/outflow-d9091c37.svg",Be={class:"text-dark-500"},Ie=e("h4",{class:"mb-4 text-lg"},"Transaction History",-1),We={key:0,class:"grid grid-cols-1 gap-4"},Me={class:"mb-4 text-sm text-dark-400"},Ne={class:"grid grid-cols-1 gap-4 text-sm"},Te={class:"w-8"},Ve=["src"],Ae={class:"flex w-full justify-between gap-4"},Fe={class:"grid grid-cols-1"},je={class:"text-xs uppercase text-dark-400"},Ge={class:"grid grid-cols-1 justify-items-end text-left"},Ee={class:"text-[16px] font-medium"},Oe={key:1,class:"grid grid-cols-1 gap-4"},Re={__name:"Transactions",setup(T){const{formatAmount:w,formatDate:$,transformData:d}=j,a=F();D("http");const c=h([]),n=A(()=>a.getTransactions);c.value=d(n.value);const u=p=>({"00":{color:"text-secondary",text:"Success"},"01":{color:"text-warning",text:"Processing"},"02":{color:"text-warning",text:"Refunding"},"03":{color:"text-info",text:"Reversed"}})[p];let b=["January","February","March","April","May","June","July","August","September","October","November","December"],t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return Y(n,()=>{c.value=d(n.value)}),H(()=>{c.value=d(n.value)}),(p,v)=>{const g=C("PEmpty");return s(),i("div",Be,[Ie,n.value&&n.value.length?(s(),i("div",We,[(s(!0),i(N,null,R(c.value,(l,P)=>(s(),i("div",{key:P},[e("p",Me,x(_(t)[l.day])+", "+x(_(b)[l.month])+" "+x(l.date)+", "+x(l.year),1),e("div",Ne,[(s(!0),i(N,null,R(l.data,y=>(s(),i("div",{class:"flex items-center gap-4 border-b border-dark-50 pb-4 last:border-0",key:y.id},[e("div",Te,[e("img",{src:y.type=="credit"?_(Pe):_(Se),alt:"",class:"w-full object-cover"},null,8,Ve)]),e("div",Ae,[e("div",Fe,[e("span",null,x(y.description),1),e("span",je,x(y.time),1)]),e("div",Ge,[e("span",Ee,x(_(w)(y.amount)),1),e("span",{class:Q([u(y.status).color,"text-xs"])},x(u(y.status).text),3)])])]))),128))])]))),128))])):(s(),i("div",Oe,[m(g,{caption:"You don’t have any billing history at the moment"})]))])}}},De={class:"ion-padding grid grid-cols-1 gap-6"},Je={__name:"WalletScreen",setup(T){const{processError:w}=j,$=F(),d=D("http"),a=h(!1),c=async t=>{await n(),await b(),t.target.complete()};H(async()=>{a.value=!0,n(),await b(),u(),a.value=!1});const n=async()=>{try{const t=await d({endpoint:"GetWallet",httpMethod:"get"});console.log(t),$.setWalletBalance(t)}catch(t){}},u=async()=>{try{const t=await d({endpoint:"GetCards",httpMethod:"get"});console.log(t),$.$patch({cards:t.items})}catch(t){const p=w(t);console.log(p)}},b=async()=>{a.value=!0;try{const t=await d({endpoint:"GetTransactions",httpMethod:"get"});a.value=!1,console.log(t),$.$patch({transactions:t.items})}catch(t){a.value=!1;const p=w(t);console.log(p)}};return(t,p)=>{const v=C("PNav"),g=C("PInfo"),l=C("PLoader");return s(),B(_(te),null,{default:k(()=>[m(v,{title:"Wallet",showBackButton:!1}),m(_(ee),{fullscreen:!0},{default:k(()=>[m(_(X),{slot:"fixed",onIonRefresh:p[0]||(p[0]=P=>c(P))},{default:k(()=>[m(_(Z))]),_:1}),e("div",De,[m(Ce),m(g,{onClick:p[1]||(p[1]=P=>t.$router.push({name:"RedeemGiftcards"})),icon:_(de),title:"Redeem Gift Card",text:"Unlock exclusive benefits through gift cards"},null,8,["icon"]),m(Re)])]),_:1}),a.value?(s(),B(l,{key:0})):W("",!0)]),_:1})}}};export{Je as default};