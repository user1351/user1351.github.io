import{w as u}from"./dom-6a33ced9.js";import{o as m,c as b,a,n as v,d as I,_ as p,r as M,i as y,b as T,e as S}from"./index-ca072c22.js";const d={VERTICAL:0,HORIZONTAL:1,BOTH:2},H={DEFAULT:0,ROUNDED:1,THIN:2,THIN_WITH_BG:3,THIN_VIOLET:4,THIN_WHITE:5,THIN_YELLOW:6,THIN_GREY:7,THIN_BLACK:8,WHITE_BLACK_LINES:9};function E(e,t,o,i,l,r){return m(),b("div",{class:v(["scrollable-container-thumb",`scrollable-container-thumb_type_${o.type}`,r.classes]),style:I(r.style),onMousedown:t[0]||(t[0]=(...s)=>r.onMouseDown&&r.onMouseDown(...s))},t[1]||(t[1]=[a("div",{class:"scrollable-container-thumb-shadow"},null,-1),a("div",{class:"scrollable-container-thumb-decoration"},[a("span"),a("hr"),a("span")],-1)]),38)}const L={props:{height:{type:Number,default:0},offset:{type:Number,default:0},orientation:{type:String,default:"vertical"},type:{type:Number,default:H.DEFAULT},isSquare:{type:Boolean,default:!1}},computed:{style(){return this.orientation==="horizontal"?{width:`${this.height}%`,height:"100%",left:`${this.offset}%`}:{width:"100%",height:`${this.height}%`,top:`${this.offset}%`}},classes(){return{"scrollable-container-thumb_vertical":this.orientation==="vertical","scrollable-container-thumb_horizontal":this.orientation==="horizontal","scrollable-container-thumb_square":this.isSquare}}},data:()=>({isMouseDown:!1}),mounted(){document.addEventListener("mouseup",this.onMouseUp),document.addEventListener("mousemove",this.onMouseMove)},unmounted(){document.removeEventListener("mouseup",this.onMouseUp),document.removeEventListener("mousemove",this.onMouseMove)},methods:{onMouseUp(){this.isMouseDown=!1},onMouseDown(e){this.isMouseDown=!0},onMouseMove(e){if(!this.isMouseDown)return;const t=this.orientation==="horizontal"?e.movementX:e.movementY;this.$emit("move",t)}}},g=p(L,[["render",E],["__scopeId","data-v-17cccf38"]]),N={key:0,class:"scrollable-container__rail scrollable-container__rail_y",ref:"railY"},w={key:1,class:"scrollable-container__rail scrollable-container__rail_x",ref:"railX"};function O(e,t,o,i,l,r){const s=M("Thumb");return m(),b("div",{class:v(["scrollable-container",`scrollable-container_type_${o.type}`,r.classes])},[a("div",{class:"scrollable-container__container",ref:"container",onScroll:t[0]||(t[0]=(...n)=>r.onScroll&&r.onScroll(...n))},[y(e.$slots,"default",{},void 0,!0)],544),o.orientation===l.ORIENTATION_TYPES.BOTH||o.orientation===l.ORIENTATION_TYPES.VERTICAL?(m(),b("div",N,[t[3]||(t[3]=a("div",{class:"scrollable-container__rail-background"},null,-1)),T(s,{ref:"thumbY",height:l.thumbHeight*100,offset:l.thumbTop*100,orientation:"vertical",type:o.type,isSquare:o.isSquare,onMove:t[1]||(t[1]=n=>r.onThumbMove(!1,n))},null,8,["height","offset","type","isSquare"])],512)):S("",!0),o.orientation===l.ORIENTATION_TYPES.BOTH||o.orientation===l.ORIENTATION_TYPES.HORIZONTAL?(m(),b("div",w,[t[4]||(t[4]=a("div",{class:"scrollable-container__rail-background"},null,-1)),T(s,{ref:"thumbX",height:l.thumbWidth*100,offset:l.thumbLeft*100,orientation:"horizontal",type:o.type,isSquare:o.isSquare,onMove:t[2]||(t[2]=n=>r.onThumbMove(!0,n))},null,8,["height","offset","type","isSquare"])],512)):S("",!0)],2)}let f=null;const W={props:{orientation:{type:Number,default:d.VERTICAL},wheelScroll:{type:Boolean,default:!1},wheelScrollIsSmooth:{type:Boolean,default:!1},requiredHorizontalScroll:{type:Number,default:0},requiredVerticalScroll:{type:Number,default:0},type:{type:Number,default:H.DEFAULT},isSquare:{type:Boolean,default:!1}},components:{Thumb:g},computed:{classes(){return{"scrollable-container_vertical":this.orientation===d.VERTICAL,"scrollable-container_horizontal":this.orientation===d.HORIZONTAL,"scrollable-container_horizontal-is-hidden":this.horizontalIsHidden,"scrollable-container_vertical-is-hidden":this.verticalIsHidden}}},data(){return{ORIENTATION_TYPES:d,observer:null,thumbTop:0,thumbHeight:0,verticalIsHidden:!0,thumbLeft:0,thumbWidth:0,horizontalIsHidden:!0}},mounted(){this.$el.addEventListener("wheel",this.onWheel),u(()=>{this.onScroll(),this.initMutationObserver()})},unmounted(){this.removeMutationObserver(),this.$el.removeEventListener("wheel",this.onWheel)},methods:{initMutationObserver(){const e=this.$refs.container;e&&(f=new MutationObserver(this.onMutation),f.observe(e,{childList:!0,subtree:!0}))},removeMutationObserver(){f&&f.disconnect()},onMutation(){u(()=>{this.onScroll()})},onScroll(){const e=this.$refs.container;if(!e)return;const t=this.getMaxScroll(!0),o=this.getMaxScroll();e.scrollLeft=Math.min(e.scrollLeft,t),e.scrollTop=Math.min(e.scrollTop,o),this.updateThumb(),this.$emit("contentScroll",{scrollableWrapper:e})},updateVerticalThumb(){u(()=>{const e=this.$refs.container;if(!e)return;const t=5;if(Math.abs(e.scrollHeight-e.offsetHeight)<=t){this.thumbHeight=0,this.thumbTop=0,this.verticalIsHidden=!0;return}this.thumbHeight=e.offsetHeight/e.scrollHeight,this.thumbTop=e.scrollTop/e.scrollHeight,this.verticalIsHidden=!1})},updateHorizontalThumb(){u(()=>{const e=this.$refs.container;if(!e)return;const t=5;if(Math.abs(e.scrollWidth-e.offsetWidth)<=t){this.thumbWidth=0,this.thumbLeft=0,this.horizontalIsHidden=!0;return}this.thumbWidth=e.offsetWidth/e.scrollWidth,this.thumbLeft=e.scrollLeft/e.scrollWidth,this.horizontalIsHidden=!1})},updateThumb(){this.updateVerticalThumb(),this.updateHorizontalThumb()},getMaxScroll(e){const t=this.$refs.container;return e?t.scrollWidth-t.offsetWidth:t.scrollHeight-t.offsetHeight},onThumbMove(e,t){const{container:o,railY:i,railX:l,thumbY:r,thumbX:s}=this.$refs,n=e?t/(l.offsetWidth-s.$el.offsetWidth):t/(i.offsetHeight-r.$el.offsetHeight),c=e?"scrollLeft":"scrollTop",h=this.getMaxScroll(e);o[c]+=h*n,this.onScroll()},onWheel(e){!this.wheelScroll||this.thumbHeight||(this.wheelScrollIsSmooth?this.handleSmoothWheelScroll(e):this.handleWheelScroll(e))},handleWheelScroll(e){const o=this.$refs.container;if(!o)return;const i=this.getMaxScroll(!0);e.deltaY>0?o.scrollLeft+=i*.05:o.scrollLeft-=i*.05,this.onScroll()},handleSmoothWheelScroll(e){const t=this.$refs.container;if(!t)return;const o=1e3,i=.25;let l,r,s=!1;const n=c=>{l===void 0&&(l=c);const h=c-l;if(r!==c){const _=e.deltaY>0?Math.min(i*h,e.deltaY):Math.max(i*-h,e.deltaY);t.scrollLeft+=_,_===e.deltaY&&(s=!0),this.onScroll()}h<=o&&(r=c,s||window.requestAnimationFrame(n))};window.requestAnimationFrame(n)}},watch:{requiredHorizontalScroll(e){this.$refs.container&&(this.$refs.container.scrollLeft=e,this.onScroll())},requiredVerticalScroll(e){this.$refs.container&&(this.$refs.container.scrollTop=e,this.onScroll())}}},x=p(W,[["render",O],["__scopeId","data-v-c55b4348"]]);export{x as S};
