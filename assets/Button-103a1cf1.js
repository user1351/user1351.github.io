import{_ as l}from"./left-mouse-button-ccae1e0c.js";import{o as r,c as o,d as c,a as u,e as a,t as i,i as f,n as h,_ as y}from"./index-ca072c22.js";const _={methods:{checkIsCurrentInterfaceActive(){const e=this.getParentInterface();return e?this.getLastOpenedInterface()===e:!1},getLastOpenedInterface(){const e=this.getControllableInterfaceOrder();return e[e.length-1]},getControllableInterfaceOrder(){return window.visibleInterfaceOrder.filter(e=>!window.App.components[e].options.hud)},getParentInterface(){const e=this.getControllableInterfaceOrder();for(const t of e)if(window.interface(t).$el.contains(this.$el))return t;return null}}},w={key:1,class:"lmb",src:l},k={key:2,class:"controls-button--text"},m={key:3,class:"controls-button--text"},g={key:4,class:"controls-button--text"},C={key:5,class:"controls-button--text"};function p(e,t,s,b,d,n){return r(),o("div",{class:h(["controls-button",{pressed:d.pressed,clickable:s.clickable,"controls-button_rounded":n.isRounded&&s.allowRounded,"controls-button_mobile":s.mobileAdaptive,"controls-button_with-hover":!s.mobileAdaptive,"left-mouse-button":s.leftMouseButton}]),onClick:t[0]||(t[0]=O=>n.onClick())},[n.getArrow()?(r(),o("svg",{key:0,class:"arrow",style:c({transform:`rotate(${n.getArrow().param}deg)`}),width:"1.67vh",height:"1.67vh",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t[1]||(t[1]=[u("path",{d:"M5 12H19M5 12L11 6M5 12L11 18",stroke:"#000000","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)]),4)):a("",!0),s.leftMouseButton?(r(),o("img",w)):a("",!0),n.getEscape()?(r(),o("div",k,"Esc")):a("",!0),n.getTab()?(r(),o("div",m,"Tab")):a("",!0),n.getKey()?(r(),o("div",g,i(n.getKey().text),1)):a("",!0),s.text?(r(),o("div",C,i(s.text),1)):a("",!0),s.mobileAdaptive?f(e.$slots,"default",{key:6},void 0,!0):a("",!0)],2)}const v={props:{keyCode:{default:-1},clickable:{default:!0},text:{default:!1},mobileAdaptive:{default:!1},allowRounded:{default:!0},eventOnKeyUp:{default:!0},isPressAllwaysAllowed:{default:!1},leftMouseButton:{default:!1}},mixins:[_],data(){return{pressed:!1,arrows:[{keyCode:window.KEY_CODE_ARROW_LEFT,param:0},{keyCode:window.KEY_CODE_ARROW_TOP,param:90},{keyCode:window.KEY_CODE_ARROW_RIGHT,param:180},{keyCode:window.KEY_CODE_ARROW_BOTTOM,param:270}],escape:window.KEY_CODE_ESC,tab:window.KEY_CODE_TAB,keys:[{keyCode:window.KEY_CODE_F,text:"F"}]}},created(){document.addEventListener("keydown",this.onKeyDown),document.addEventListener("keyup",this.onKeyUp)},unmounted(){document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("keyup",this.onKeyUp)},computed:{isRounded(){const e=this.getKey();return e&&e.text&&e.text.length===1||this.text&&this.text.length===1}},methods:{getArrow(){const e=this.arrows.filter(t=>t.keyCode==this.keyCode);return e.length?e[0]:!1},getKey(){const e=this.keys.filter(t=>t.keyCode==this.keyCode);return e.length?e[0]:!1},getEscape(){return this.keyCode==this.escape},getTab(){return this.keyCode==this.tab},onKeyDown(e){if(e.keyCode==this.keyCode){if(this.pressed=!0,this.eventOnKeyUp||!this.getPressAllowedStatus())return;this.$emit("pressed",this.keyCode,!1)}},onClick(){this.$emit("pressed",this.keyCode,!0)},onKeyUp(e){if(e.keyCode==this.keyCode){if(this.pressed=!1,!this.eventOnKeyUp||!this.getPressAllowedStatus())return;this.$emit("pressed",this.keyCode,!1)}},getPressAllowedStatus(){return this.isPressAllwaysAllowed||!this.getEscape()?!0:!window.getInterfaceStatus("TrainingOnboarding")&&this.checkIsCurrentInterfaceActive()}}},K=y(v,[["render",p],["__scopeId","data-v-9ef1067e"]]);export{K as C};