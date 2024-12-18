import{o as a,c as d,a as h,d as o,n as u,e as f,t as c,_ as m}from"./index-ca072c22.js";const g=["styles"];function v(e,s,l,r,i,t){return a(),d("div",{class:u(["container",{mobile:l.isMobile,container_vertical:l.orientation==="vertical"}]),id:"slider-container",ref:"sliderContainer",styles:l.styles},[h("div",{class:"left",id:"slider-left",style:o(t.leftStyle),ref:"sliderLeft"},null,4),h("div",{class:u(["knob",t.getKnobClass()]),id:"slider-knob",style:o({background:l.bgColor}),ref:"sliderKnob",onMousedown:s[0]||(s[0]=(...n)=>t.mouseDownHandler&&t.mouseDownHandler(...n)),onTouchstart:s[1]||(s[1]=(...n)=>t.touchStartHandler&&t.touchStartHandler(...n))},[l.isMobile?(a(),d("div",{key:0,class:u(["knob-drag-zone",{"knob-drag-zone_vertical":l.knobType===1}])},null,2)):f("",!0),l.tooltip?(a(),d("div",{key:1,class:"knob-tooltip",id:"slider-tooltip",style:o(t.tooltipStyle)},c(t.formattedTooltip),5)):f("",!0)],38),h("div",{class:"right",id:"slider-right",ref:"sliderRight",style:o(t.rightStyle)},null,4)],10,g)}const y={props:{changeValue:{type:Function,required:!1,default:function(){}},min:{required:!0},styles:{required:!1},max:{required:!0},value:{required:!0},bgColor:{required:!1,default:"#ffb200"},lineBg:{required:!1,default:"#fff"},lineHeight:{required:!1,default:"0.56vh"},tooltip:{required:!1,default:!1},isMobile:{required:!1,default:!1},orientation:{required:!1,default:"horizontal"},knobType:{required:!1,default:0},trackBorderRadius:{required:!1,default:"0.37vh"},formatTooltip:{type:Function,required:!1,default:function(e){return Math.round(e)}},applyBgToTooltip:{required:!1,default:!0},step:{required:!1,default:0},isRoundValue:{required:!1,default:!1}},data(){return{x:0,leftWidth:0,sliderValue:this.value||0,knobTypes:{0:"round",1:"flat"}}},computed:{isHorizontal(){return this.orientation==="horizontal"},stepsCount(){return(this.max-this.min)/this.step},stepPercent(){return 100/this.stepsCount},leftStyle(){return{background:this.bgColor,borderRadius:`${this.trackBorderRadius} 0 0 ${this.trackBorderRadius}`}},rightStyle(){return{background:this.lineBg,height:this.lineHeight,borderRadius:`0 ${this.trackBorderRadius} ${this.trackBorderRadius} 0`}},tooltipStyle(){return{...this.orientation==="vertical"&&{top:"50%"},...this.applyBgToTooltip&&{background:this.bgColor}}},formattedTooltip(){return this.formatTooltip(this.value)}},mounted(){this.setKnobPos()},methods:{getKnobClass(){return`knob_${this.knobTypes[this.knobType]}`},setKnobPos(){const{isHorizontal:e,min:s,max:l,sliderValue:r}=this,i=this.$refs.sliderLeft.getBoundingClientRect();this.leftWidth=e?i.width:i.height;let t=(r-s)*100/(l-s);t=Math.max(t,0),t=Math.min(t,100),e?(this.$refs.sliderLeft.style.width=`${t}%`,this.$refs.sliderKnob.style.left=`${t}%`,this.$refs.sliderRight.style.width=`${100-t}%`):(this.$refs.sliderLeft.style.height=`${t}%`,this.$refs.sliderKnob.style.bottom=`${t}%`)},mouseDownHandler(e){const s=this.$refs.sliderLeft.getBoundingClientRect();this.x=this.isHorizontal?e.clientX:e.clientY,this.leftWidth=this.isHorizontal?s.width:s.height,document.addEventListener("mousemove",this.mouseMoveHandler),document.addEventListener("mouseup",this.mouseUpHandler)},touchStartHandler(e){const s=this.$refs.sliderLeft.getBoundingClientRect();this.x=this.isHorizontal?e.touches[0].pageX:e.touches[0].pageY,this.leftWidth=this.isHorizontal?s.width:s.height,document.addEventListener("touchmove",this.touchMoveHandler),document.addEventListener("touchend",this.touchEndHandler)},mouseMoveHandler(e){this.moveHandler(this.isHorizontal?e.clientX:e.clientY)},touchMoveHandler(e){this.moveHandler(this.isHorizontal?e.touches[0].pageX:e.touches[0].pageY)},moveHandler(e){const s=e-this.x,l=this.$refs.sliderContainer.getBoundingClientRect(),r=this.isHorizontal?l.width:l.height;let i=(this.leftWidth+(this.isHorizontal?s:-s))*100/r;const t=(this.sliderValue-this.min)*100/(this.max-this.min);i=Math.max(i,0),i=Math.min(i,100),this.step?i>=t+this.stepPercent/2&&this.value<this.max?this.sliderValue+=this.step:i<=t-this.stepPercent/2&&this.value>this.min&&(this.sliderValue-=this.step):this.sliderValue=+(i*(this.max-this.min)/100+this.min).toFixed(2),this.isRoundValue&&(this.sliderValue=Math.round(this.sliderValue)),this.$emit("value-changed",this.sliderValue),this.changeValue(this.sliderValue),i=(this.sliderValue-this.min)*100/(this.max-this.min),this.isHorizontal?(this.$refs.sliderLeft.style.width=`${i}%`,this.$refs.sliderKnob.style.left=`${i}%`,this.$refs.sliderRight.style.width=`${100-i}%`):(this.$refs.sliderLeft.style.height=`${i}%`,this.$refs.sliderKnob.style.bottom=`${i}%`)},mouseUpHandler(){document.removeEventListener("mousemove",this.mouseMoveHandler),document.removeEventListener("mouseup",this.mouseUpHandler)},touchEndHandler(){document.removeEventListener("touchmove",this.touchMoveHandler),document.removeEventListener("touchend",this.touchEndHandler)}},watch:{value(e){e!==this.sliderValue&&(this.sliderValue=e,this.setKnobPos())}}},p=m(y,[["render",v],["__scopeId","data-v-8d190137"]]);export{p as R};
