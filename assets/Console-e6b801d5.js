import{o,c as t,a as c,t as l,F as d,h as p,n as r,e as a,_ as h}from"./index-ca072c22.js";const u={key:0,class:"console__body"},f={class:"console__content",ref:"content"},k={class:"console__message__content"},v={class:"console__message__value"},m=["onClick"],g={key:0,class:"console__stack"};function y(s,n,C,O,$,_){return o(),t("div",{class:r(["console",{console_opened:s.isOpened}])},[c("div",{class:"console__head",onClick:n[0]||(n[0]=(...e)=>_.toggle&&_.toggle(...e))},l(s.isOpened?"ЗАКРЫТЬ КОНСОЛЬ":"ОТКРЫТЬ КОНСОЛЬ"),1),s.isOpened?(o(),t("div",u,[c("div",f,[(o(!0),t(d,null,p(s.messages,(e,i)=>(o(),t("div",{class:r(["console__message",`console__message_${e.type}`]),key:i},[c("div",k,[c("div",v,l(e.value),1),e.stack?(o(),t("div",{key:0,class:"console__message__button",onClick:b=>e.opened=!e.opened},l(e.opened?"СВЕРНУТЬ":"РАЗВЕРНУТЬ"),9,m)):a("",!0)]),e.stack&&e.opened?(o(),t("pre",g,l(e.stack),1)):a("",!0)],2))),128))],512)])):a("",!0)],2)}const B={data:()=>({isOpened:!1,messages:[]}),methods:{toggle(){this.isOpened=!this.isOpened,this.scrollBottom()},error(...s){for(const n of s)this.messages.push({type:"error",value:n.message,stack:n.stack});this.scrollBottom()},log(...s){this.messages.push({type:"log",value:s.join(" ")}),this.scrollBottom()},scrollBottom(){this.$nextTick(()=>{this.$refs.content})}}},N=h(B,[["render",y],["__scopeId","data-v-f8f029f2"]]);export{N as default};