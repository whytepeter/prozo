import{u as I,s as B,i as E,c as F,L as y,j as R,r as m,o as z,a as T,w as u,d as h,P as f,b as n,e as r,q as d,m as $,n as j,z as A}from"./index-ffa3455d.js";const D={class:"grid grid-cols-1 gap-2 px-4"},M=r("h3",{class:"text-2xl font-semibold text-primary"},[d(" Join the "),r("span",{class:"text-secondary"},"Prozo")],-1),O={class:"text-sm text-dark-400"},q={class:"ion-padding grid grid-cols-1 gap-2 pb-6"},G={class:"ion-padding mb-4"},H=r("p",{class:"mt-6 text-center text-xs text-dark-400"},[d(" By creating an account, you agree to Prozo "),r("span",{class:"font-medium text-secondary"},"Terms and Conditions")],-1),W={__name:"PersonalInfo",setup(J){const p=I(),_=B("http"),w=E(),{validateEmail:P,processNumber:c,validatePassword:x,showToast:b}=A,V=F(()=>p.getLoading),e=y({first_name:"",last_name:"",email:"",phone_number:"",password:"",location_area:"",ref_code:"",type:"user"}),t=y({first_name:!1,last_name:!1,email:!1,phone_number:!1,password:!1}),g=async()=>{const{value:a}=await f.get({key:"location_area"});e.location_area=a,console.log(e)};g(),R(()=>{g()});function v(){let a=isNaN(e.phone_number.trim())||c(e.phone_number)&&c(e.phone_number).length!==14;return e.first_name.trim()===""?(t.first_name="Please fill in your first name",!1):e.last_name.trim()===""?(t.last_name="Please fill in your last name",!1):e.email.trim()===""?(t.email="Please fill in your email address",!1):P(e.email)?e.phone_number.trim()===""?(t.phone_number="Please fill in your phone number",!1):a!==!1?(t.phone_number="Phone number badly formatted",!1):e.password.trim()===""?(t.password="Please fill in your password",!1):x(e.password)?(Object.keys(t).forEach(o=>{t[o]=!1}),!0):(t.password="Password must have at least one uppercase letter, one symbol, one number, and one lowercase letter.",!1):(t.email="Email is badly formated",!1)}function k(){e.first_name="",e.last_name="",e.email="",e.phone_number="",e.password="",e.location_area="",e.ref_code=""}const N=async()=>{if(v()){console.log(e);const a={...e};a.phone_number=c(e.phone_number);try{const o=await _({endpoint:"Register",httpMethod:"post",body:a});console.log(o),await f.set({key:"firstTimer",value:"false"}),await f.set({key:"token",value:o.token}),p.$patch({isLoggedIn:!0,user:o.user}),k(),b("success","Registration successfull"),w.push({name:"Home"}),L(o.user)}catch(o){const i=o.response.data.message;console.log(i[0]),b("error",i[0])}}},L=async a=>{try{const o=await _({endpoint:"GetUserLocation",httpMethod:"get"});a.location=o,p.$patch({user:a}),console.log(a)}catch(o){console.log(o)}};return(a,o)=>{const i=m("PNav"),l=m("PInput"),U=m("PButton"),C=m("PFooter");return z(),T(h(j),null,{default:u(()=>[n(i),n(h($),{fullscreen:""},{default:u(()=>[r("div",D,[M,r("p",O,[d(" Not new to Prozo? "),r("span",{onClick:o[0]||(o[0]=s=>a.$router.push({name:"Login"})),class:"font-medium text-secondary"},"Log in")])]),r("form",q,[n(l,{modelValue:e.first_name,"onUpdate:modelValue":o[1]||(o[1]=s=>e.first_name=s),label:"First Name",type:"text",inputmode:"text",error:t.first_name},null,8,["modelValue","error"]),n(l,{modelValue:e.last_name,"onUpdate:modelValue":o[2]||(o[2]=s=>e.last_name=s),label:"Last Name",type:"text",inputmode:"text",error:t.last_name},null,8,["modelValue","error"]),n(l,{modelValue:e.email,"onUpdate:modelValue":o[3]||(o[3]=s=>e.email=s),label:"Email Address",type:"email",inputmode:"email",error:t.email},null,8,["modelValue","error"]),n(l,{modelValue:e.phone_number,"onUpdate:modelValue":o[4]||(o[4]=s=>e.phone_number=s),label:"Phone Number ",type:"tel",inputmode:"numeric",error:t.phone_number},null,8,["modelValue","error"]),n(l,{modelValue:e.password,"onUpdate:modelValue":o[5]||(o[5]=s=>e.password=s),label:"Password",type:"password",inputmode:"password",error:t.password},null,8,["modelValue","error"]),n(l,{modelValue:e.ref_code,"onUpdate:modelValue":o[6]||(o[6]=s=>e.ref_code=s),label:"Referral code (Optional) ",type:"text",inputmode:"text"},null,8,["modelValue"])])]),_:1}),n(C,null,{default:u(()=>[r("div",G,[n(U,{onClick:N,block:"",loading:V.value,type:"submit"},{default:u(()=>[d("Create Account")]),_:1},8,["loading"]),H])]),_:1})]),_:1})}}};export{W as default};