import{_ as O}from"./DefaultMapMarkerOverwrite-de705f48.js";import{w as g}from"./dom-6a33ced9.js";import{I as R,a as b,g as B,c as M,A as U,M as D,B as z}from"./ArrowTop-17d3fbc2.js";import{U as N}from"./Button-6cdc2ffa.js";import{_ as P,r as p,o as h,g as I,c as m,a,i as v,n as y,b as l,w as d,t as S,f as F,e as G,T as k,F as $,h as V,d as A}from"./index-ca072c22.js";import{M as Q}from"./Point-45d588ff.js";import{I as H}from"./Back-54fc2d49.js";import{_ as Z}from"./hassle_logo_full-94889cfd.js";const J="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAM1BMVEVHcEwQEBAREREREREREREQEBAQEBARERERERHoTDrdSTfRRTWgOCx0KyRMIRw4GxgRERE+scw4AAAACXRSTlMAFzZXgJaw0ulZaQYPAAABS0lEQVR42u2XYW7DIAxGlxQIYGLe/U+7TVqmsjStwFN/8Q7w5E+AbT4mk8lkMnkfqwtbhLgFt9pti4vcEd1i03kAqu5faAXAG5S3CGiR9IMUBeJt1OcBldQgCvixuAEoqSWnVIAwIgxQJZ3JUoeMHjSnB4iIDqS+Qc3pQigVOk9miSDpUigQl97AJT0kyzelM/QCmp4JRaGnRAeSrhIfJboOYUTTc6FUYkd/gfIk8VHi+j+JD3oyB+p1gQe147ls6GuhsnWcyf4ysewdp8KVMDdC7EJphebIuRVG86HIPcpmvTbSUAnGi52lAZzx6UnDDqutOUiLEg3t6xy4gDM12HwqkMUwAk6+At4wpFrfMaQMY1QajjE6POjzyafgh1eRLCfq+HJDkRMFCIZ1rvzRKeBtC+cuv+zVsHAaVmLD0m7+VsxP1mQymUzexyc1jDVFul31LwAAAABJRU5ErkJggg==",j={components:{PlayerIcon:J}};function q(t,e,i,n,s,o){const c=p("PlayerIcon");return h(),I(c)}const W=P(j,[["render",q]]),Y={class:"map-places__container",ref:"container"};function K(t,e,i,n,s,o){return h(),m("div",{class:"map-places",onMousewheel:e[0]||(e[0]=(...c)=>o.onScroll&&o.onScroll(...c))},[a("div",Y,[v(t.$slots,"default",{},void 0,!0)],512)],32)}const X={props:{scroll:{type:Number,default:0},disabledScroll:{type:Boolean,default:!1}},methods:{onScroll(t){this.disabledScroll||(this.$refs.container.scrollLeft+=t.deltaY*.75)}},watch:{scroll(t){this.$refs.container.scrollLeft=t}}},tt=P(X,[["render",K],["__scopeId","data-v-ab8ce9a7"]]),et={class:"map-places__card-icon"},it=["innerHTML"];function st(t,e,i,n,s,o){return h(),m("div",{class:y(["map-places__card",{active:i.active}]),onClick:e[0]||(e[0]=c=>t.$emit("click",c))},[e[1]||(e[1]=a("div",{class:"map-places__card__before"},null,-1)),a("div",et,[v(t.$slots,"default")]),a("div",{class:"map-places__card-text",innerHTML:i.title},null,8,it)],2)}const ot={props:{title:{type:String,default:""},active:{type:Boolean,default:!1}},computed:{formatedTitle(){var t=this.title.split(" ");return t.length>1&&t[0].length>3?(t[t.length-1]="<br>"+t[t.length-1],t.join(" ")):this.title}}},nt=P(ot,[["render",st]]),at={class:"map-body",ref:"body"},rt={key:0,class:"map-point__info"},ct={class:"map-point__info-data"},lt={class:"data"},pt=["src"],ht={class:"text"},ft={class:"distance"},dt=["src"];function mt(t,e,i,n,s,o){const c=p("IconBack"),T=p("UIButton"),E=p("IconPointArrowTop"),C=p("IconPointInfoBG"),x=p("MapPlaceCard"),w=p("MapPlaces");return h(),m("div",{class:y(["map iface-container",{active:s.currentPoint}])},[l(T,{class:"map-back",onClick:e[0]||(e[0]=u=>o.back())},{default:d(()=>[l(c,{style:{height:"2.59vh"}})]),_:1}),a("div",at,[e[2]||(e[2]=a("div",{class:"map-before"},null,-1)),e[3]||(e[3]=a("div",{class:"map-after"},null,-1)),e[4]||(e[4]=a("div",{class:"map-head"},[a("img",{class:"map-head__logo",src:Z})],-1)),l(k,{name:"slide-right"},{default:d(()=>[s.currentPoint?(h(),m("div",rt,[a("div",ct,[a("div",lt,[a("img",{src:`/images/gps/${s.currentPoint.icon}.png`},null,8,pt),a("div",ht,S(s.currentPoint.name),1),a("div",ft,[l(E),F(S(o.calcDistance(o.playerPosition.x,o.playerPosition.y,s.currentPoint.position.x,s.currentPoint.position.y)),1)])])]),a("div",{class:"map-point__info-button",onClick:e[1]||(e[1]=u=>o.getDirection(s.currentPoint))},"Проложить маршрут"),l(C,{class:"map-point__info-bg"})])):G("",!0)]),_:1}),l(k,{name:"slide"},{default:d(()=>[l(w,{ref:"places",scroll:o.placeOffset()},{default:d(()=>[(h(!0),m($,null,V(o.places,(u,_)=>(h(),I(x,{key:_,title:u.name,active:s.isActiveSelectPlace&&s.activePlace==_,style:A({marginLeft:_==0?0:"1.48vh"}),onClick:Mt=>o.selectPlace(_)},{default:d(()=>[a("img",{src:`/images/gps/${u.icon}.png`},null,8,dt)]),_:2},1032,["title","active","style","onClick"]))),128))]),_:1},8,["scroll"])]),_:1}),a("div",{class:"map-body__container",id:"menu-map",ref:"container",style:A({transform:`scale(${Math.max(1,1.5*o.screen.scale.height)})`})},null,4)],512)],2)}const f=6e3,ut=256,r={STOP:1,CELLULAR_SALON:2,GAS:3,ATM:4,ELECTRO_STATION:5,FISHING_SHOP:6,CAR_MARKET:7,TIRE_FITTING:8,AUTO_PARTS_STORE:9,METRO_STATION:10},_t="#fcb900",Pt={props:["openParams"],components:{UIButton:N,MapPlayer:W,MapPlaces:tt,MapPlaceCard:nt,MapLocationPoint:Q,IconBack:H,IconPointInfoBG:R,IconPointArrowTop:b},mixins:[O],data(){return{point:{show:!1,position:{x:0,y:0}},checkpoint:{show:!1,position:{x:0,y:0}},pointSelectionStage:null,currentPoint:!1,focusedMarker:null,isActiveSelectPlace:!1,activePlace:0,addedPoints:[],points:[],mapIcons:{}}},computed:{playerPosition(){return this.$store.getters["player/position"]},screen(){return this.$root.screen},places(){var t=[];const e=B(this.points.filter(i=>i.isOther));for(const i of e)i.category>-1&&(t=t.concat(i.points.filter(n=>n.name!="Найти огород")));return t}},created(){this.$data.noAdaptation=!0,this.points=M(this.addedPoints),this.leafletIcons={};let t=window.dpiScale*window.scale,e=60*(t>1?t:1),i=e/2;this.leafletIcons.player=L.icon({iconUrl:"/images/gps/player.png",iconSize:[e,e],iconAnchor:[i,i]}),this.leafletIcons.point=L.icon({iconUrl:"/images/gps/point.png",iconSize:[e,e],iconAnchor:[i,i]}),this.points.map(n=>{this.leafletIcons[n.icon]=L.icon({iconUrl:`images/gps/${n.icon}.png`,iconSize:[e,e],iconAnchor:[i,i]})})},methods:{setRoute(t){this.leafletMap&&(this.route&&this.route.removeFrom(this.leafletMap),this.route=L.polyline(t,{color:_t}).addTo(this.leafletMap))},shown(){window.updateNavigationPath(),g(()=>{this.leafletMap||this.initMap(),this.$nextTick(()=>{this.leafletMap.invalidateSize(!0),this.leafletMap.flyTo([this.playerPosition.y,this.playerPosition.x],4,{duration:.4})})})},back(){window.hideInterface("Map"),window.showInterface("Menu")},getDirection(t){this.currentPoint&&this.currentPoint==t&&(sendClientEvent(gm.EVENT_EXECUTE_PUBLIC,"GPS_OnPlayerGetDirection",t.position.x,t.position.y,t.position.z),setTimeout(()=>this.currentPoint=!1,100)),this.setPoint(t.position.x,t.position.y)},mapMoveStart(t){this.pointSelectionStage==="start"?this.pointSelectionStage="moveStart":(this.pointSelectionStage==="moveStart"||this.pointSelectionStage==="finish")&&(this.pointSelectionStage=null)},mapMoveEnd(t){this.pointSelectionStage==="moveStart"&&(this.pointSelectionStage="finish")},mapDragStart(){this.disableCurrentPoint()},mapZoomEnd(t){this.pointSelectionStage==="moveStart"&&(this.pointSelectionStage="finish"),this.currentZoom=t},placeOffset(){const t=this.$refs.places;if(t){let e=0;const i=t.$el.querySelectorAll(".map-places__card");for(let n=0;n<this.activePlace;++n)e+=i[n].clientWidth;return e+1.725/100*this.screen.height*this.activePlace}return 0},calcDistance(t,e,i,n,s=!0){const o=Math.hypot(i-t,n-e);return s?this.formatDistance(o):o},formatDistance(t){return t>1e3?`${(t/1e3).toFixed(2)}км`:`${t.toFixed(2)}м`},onMapClick(t){this.disableCurrentPoint()},onMapDoubleClick(t){this.setPoint(t.latlng.lat,t.latlng.lng)},setPoint(t,e){this.point.show=!0,this.point.position={x:t,y:e},this.pointMarker&&this.pointMarker.removeFrom(this.leafletMap),this.pointMarker=L.marker([e,t]).addTo(this.leafletMap).setIcon(this.leafletIcons.point),window.setWaypoint(this.point.position),sendClientEvent(gm.EVENT_EXECUTE_PUBLIC,"GPS_OnPlayerSetPoint",this.point.position.x,this.point.position.y)},disablePoint(){this.point.show=!1,this.pointMarker&&this.pointMarker.removeFrom(this.leafletMap),window.resetWaypoint()},onPointClick(t,e){const i=t.target;this.activePlace=this.places.indexOf(e),this.selectPoint(i,e)},setCheckpoint(t,e){this.checkpoint.show=!0,this.checkpointMarker&&this.checkpointMarker.removeFrom(this.leafletMap),this.checkpointMarker=L.marker([t,e]).addTo(this.leafletMap).setIcon(this.leafletIcons.point),this.checkpoint.position={x:t,y:e}},disableCheckpoint(){this.checkpointMarker&&this.checkpointMarker.removeFrom(this.leafletMap),this.checkpoint.show=!1},setMapIcon(t,e,i,n){this.leafletIcons[n]||(this.leafletIcons[n]=L.icon({iconUrl:`/images/gps/${n}.png`,iconAnchor:[25,19]})),this.mapIcons[t]={position:{x:e,y:i},icon:n}},removeMapIcon(t){delete this.mapIcons[t]},focusMarker(t){t!==this.focusedMarker&&this.focusedMarker&&(this.focusedMarker.setZIndexOffset(this.focusedMarker.zIndexOld),t.zIndexOld=t._zIndex,t.setZIndexOffset(1122334455),this.focusedMarker=t)},unfocusMarker(t){t!==this.focusedMarker||!this.focusedMarker||this.focusedMarker.setZIndexOffset(this.focusedMarker.zIndexOld)},markerMouseOver(t){this.currentPoint||this.focusMarker(t.target)},markerMouseOut(t){this.currentPoint||this.unfocusMarker(t.target)},selectPoint(t,e){this.currentPoint!==e&&(this.pointSelectionStage="start",this.currentPoint=e,this.focusMarker(t),this.leafletMap.flyTo([e.position.y,e.position.x],5,{animate:!0,duration:.4}))},disableCurrentPoint(){this.currentPoint&&(this.unfocusMarker(this.focusedMarker),this.currentPoint=!1,this.isActiveSelectPlace=!1)},selectPlace(t){this.isActiveSelectPlace=!0,this.activePlace=t,this.places[this.activePlace].category==null&&this.selectActivePlace()},setPlace(t){this.activePlace=t},selectActivePlace(){const t=this.places[this.activePlace];var e=null;if(t.target!=null){var i=null;let s="";switch(t.target){case r.STOP:i=z[0].points;break;case r.ATM:i=U[0].points.concat(this.points.filter(o=>o.isAtm));break;case r.METRO_STATION:i=D[0].points;break;default:t.target==r.CELLULAR_SALON&&(s="Сотовый салон"),t.target==r.GAS&&(s="АЗС"),t.target==r.ELECTRO_STATION&&(s="Зарядная станция"),t.target==r.FISHING_SHOP&&(s="Рыбалка"),t.target==r.CAR_MARKET&&(s="Авторынок"),t.target==r.TIRE_FITTING&&(s="Шиномонтаж"),t.target==r.AUTO_PARTS_STORE&&(s="Автозапчасти"),i=M(this.addedPoints).filter(o=>o.name.indexOf(s)>-1)}e=i.map(o=>(o.distance=this.calcDistance(this.playerPosition.x,this.playerPosition.y,o.position.x,o.position.y,!1),o)).sort((o,c)=>o.distance-c.distance)[0]}this.points=M(this.addedPoints);const n=e||this.points.filter(s=>s.position.x==t.position.x&&s.position.y==t.position.y)[0]||!1;n&&g(()=>{const s=this.leafletMap.getPane("markerPane").children[this.points.indexOf(n)];t.target!=0&&this.selectPoint(s,n)}),t.target!=null&&setTimeout(()=>{this.places[this.activePlace]==t&&sendClientEvent(gm.EVENT_EXECUTE_PUBLIC,"OnPlayerSelectGPSCategory",t.target)},500)},updatePoints(){this.points.forEach((t,e)=>{L.marker([t.position.y,t.position.x]).addTo(this.leafletMap).setIcon(this.leafletIcons[t.icon]).on("click",i=>{this.onPointClick(i,t)})})},updatePlayerPoint(){const t=[this.playerPosition.x,this.playerPosition.y];this.playerPoint&&this.playerPoint.removeFrom(this.leafletMap),this.playerPoint=L.marker(t).addTo(this.leafletMap).setIcon(this.leafletIcons.player)},initMap(){let t=window.scale,e=Math.round(ut*(t>1?t:1)),i=e/2;this.leafletMap=L.map("menu-map",{crs:L.extend({},L.CRS.Simple,{transformation:new L.Transformation(i/f,i,-i/f,i)}),attributionControl:!1,center:[0,0],zoomControl:!1,zoom:4,minZoom:3,maxZoom:5,maxBounds:[[-f,-f],[f,f]],maxBoundsViscosity:1,inertiaDeceleration:8e3}).on("click",this.onMapClick).on("movestart",this.mapMoveStart).on("moveend",this.mapMoveEnd).on("dragstart",this.mapDragStart).on("zoomend",this.mapZoomEnd).on("dblclick",this.onMapDoubleClick),L.tileLayer("images/map/{z}/{x}/{y}.png",{id:"maptile",tileSize:e,noWrap:!0}).addTo(this.leafletMap),this.point.show&&(this.pointMarker=L.marker([this.point.position.y,this.point.position.x]).addTo(this.leafletMap).setIcon(this.leafletIcons.point)),this.checkpoint.show&&(this.checkpointMarker=L.marker([this.checkpoint.position.y,this.checkpoint.position.x]).addTo(this.leafletMap).setIcon(this.leafletIcons.point)),this.updatePlayerPoint(),this.updatePoints()}},watch:{playerPosition:{handler(){this.leafletMap&&this.updatePlayerPoint()},deep:!0}}},Et=P(Pt,[["render",mt]]);export{Et as default};
