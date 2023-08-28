import{c as $,Q as j,v,r as _,o as u,a as O,w as i,b as o,d as l,n as A,m as N,e,t as p,B as h,f as w,q as C,z as B,h as x,x as g,F as V}from"./index-ffa3455d.js";const q={class:"grid grid-cols-1 gap-6"},E=e("div",{class:"-mt-20 h-[350px] w-full bg-primary-light"},null,-1),I={class:"ion-padding grid grid-cols-1 gap-2 text-center text-xl"},S=e("span",{class:"font-medium text-primary"},"Eba with Okro Soup ",-1),z=e("span",{class:"text-sm text-dark-400"}," (Asepo) & Grilled Beff ",-1),G={class:"font-medium text-secondary"},M={class:"ion-padding grid grid-cols-1 gap-4 text-center"},D=e("span",{class:"flex items-center gap-2 text-xs"},[e("i",{class:"pi pi-plus"}),C(" Add Pepper Sauce ")],-1),H={class:"mx-1 rounded-lg border border-primary p-2"},Q={class:"flex items-center justify-between text-sm text-primary"},R=e("i",{class:"pi pi-minus text-error"},null,-1),T={class:"text-base text-secondary"},J=e("i",{class:"pi pi-plus"},null,-1),K={__name:"ViewFood",props:{isOpen:{type:Boolean,default:!1}},emits:["close"],setup(n,{emit:b}){const{formatAmount:f}=B,r=$(()=>j.getPlatform()==="ios"),t=v(1),y=v(3500),c=$(()=>y.value*t.value),d=(s="add")=>{s=="sub"?t.value>1&&(t.value-=1):t.value+=1};return(s,a)=>{const m=_("PButton"),F=_("PFooter"),P=_("PModal");return u(),O(P,{onClose:a[2]||(a[2]=k=>s.$emit("close")),isOpen:n.isOpen,type:"full",noHeader:"",absolute:"",spacing:!1,showCloseButton:!0},{default:i(()=>[o(l(A),null,{default:i(()=>[o(l(N),{fullscreen:""},{default:i(()=>[e("div",q,[E,e("div",I,[S,z,e("span",G,p(l(f)(c.value)),1)]),e("div",M,[o(m,{fill:"clear",color:"secondary",block:""},{default:i(()=>[D]),_:1})])])]),_:1}),o(F,null,{default:i(()=>[e("div",{class:h([r.value?"":"ion-padding","mb-4","grid-cols-a grid gap-2"])},[e("div",H,[e("div",Q,[e("div",{onClick:a[0]||(a[0]=k=>d("sub")),class:"ion-activatable relative flex items-center justify-center rounded-full p-2"},[R,o(l(w),{class:"text-error",type:"unbounded"})]),e("span",T,p(t.value),1),e("div",{onClick:d,class:"ion-activatable relative flex items-center justify-center rounded-full p-2"},[J,o(l(w),{class:"text-primary",type:"unbounded"})])])]),o(m,{block:"",onClick:a[1]||(a[1]=k=>(s.$emit("close"),s.$router.push({name:"FoodCart"})))},{default:i(()=>[C(" Add to card - "+p(l(f)(c.value)),1)]),_:1})],2)]),_:1})]),_:1})]),_:1},8,["isOpen"])}}},L={key:0,class:"h-[80px] w-[80px] flex-shrink-0 rounded-lg bg-primary-light"},U={class:"grid grid-cols-1 text-left text-xs leading-5"},W=e("span",{class:"text-sm font-medium text-dark-600"},"Eba with Okro Soup ",-1),X=e("span",{class:"text-dark-400"},"(Asepo) & Grilled Beff",-1),Y={class:"text-sm text-secondary"},Z={key:0,class:"flex flex-col justify-center overflow-hidden rounded-lg border border-primary text-xs"},ee=e("i",{class:"pi pi-minus text-error"},null,-1),te={class:"text-center text-base text-secondary"},se=e("i",{class:"pi pi-plus text-primary"},null,-1),oe={key:1,class:"h-[80px] w-[80px] flex-shrink-0 rounded-lg bg-primary-light"},ne={__name:"FoodCard",props:{cart:{type:Boolean,default:!1},data:{type:Object,default:{}}},setup(n){const b=n,{formatAmount:f}=B,r=v(!1),t=v(1),y=()=>{b.cart||(r.value=!0)},c=(d="add")=>{d=="sub"?t.value>1&&(t.value-=1):t.value+=1};return(d,s)=>{const a=_("ion-ripple-effect");return u(),x(V,null,[e("div",{onClick:y,class:h([[n.cart?"":"justify-between"],"flex items-center gap-4"])},[n.cart?(u(),x("div",L)):g("",!0),e("div",{class:h([n.cart?"flex w-full items-center justify-between":""])},[e("div",U,[W,X,e("span",Y,p(l(f)(3500)),1)]),n.cart?(u(),x("div",Z,[e("div",{onClick:s[0]||(s[0]=m=>c("sub")),class:"ion-activatable relative flex w-full items-center justify-center px-4 py-2 pt-3"},[ee,o(a,{class:"text-error",type:""})]),e("span",te,p(t.value),1),e("div",{onClick:c,class:"ion-activatable relative flex w-full items-center justify-center px-4 py-2 pb-3"},[se,o(a,{class:"text-primary",type:""})])])):g("",!0)],2),n.cart?g("",!0):(u(),x("div",oe))],2),o(K,{isOpen:r.value,onClose:s[1]||(s[1]=m=>r.value=!1)},null,8,["isOpen"])],64)}}};export{ne as _};