(this.webpackJsonpEngine=this.webpackJsonpEngine||[]).push([[0],{179:function(e,t){},330:function(e,t,i){"use strict";i.r(t);var n,a,r=i(0),o=i.n(r),c=i(36),h=i.n(c),d=i(93),l=i(156),s=i(9),u=i(333),b=i(336),g=i(334),w=i(335),f=i(158),x=i(12),j=i.n(x),m=i(23),y=i(8),p=i(38),v=i.n(p),O=i(157),M=i(94),L=i(146),E=i.n(L);function F(e){return S.apply(this,arguments)}function S(){return(S=Object(m.a)(j.a.mark((function e(t){var i,n,a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"https://simdaesoo.github.io/Engine/build",i=[],n=Object(M.a)(t);try{for(n.s();!(a=n.n()).done;)r=a.value,i.push([r,"".concat("https://simdaesoo.github.io/Engine/build","/").concat(r)])}catch(o){n.e(o)}finally{n.f()}return e.abrupt("return",new Promise((function(e){var t,n=Object(M.a)(i);try{for(n.s();!(t=n.n()).done;){var a,r=t.value;(a=y.d.shared).add.apply(a,Object(O.a)(r))}}catch(o){n.e(o)}finally{n.f()}y.d.shared.load((function(){e()}))})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){return T.apply(this,arguments)}function T(){return(T=Object(m.a)(j.a.mark((function e(){var t,i,r,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=4;break}return a.stage.removeAllListeners(),a.stage.removeChildren(),e.abrupt("return",a);case 4:return t=window.devicePixelRatio||1,y.h.SCALE_MODE=y.f.NEAREST,y.h.MIPMAP_TEXTURES=y.e.OFF,y.h.STRICT_TEXTURE_CACHE=!0,i=new E.a,(a=new y.a({width:window.innerWidth,height:window.innerHeight,sharedLoader:!0,powerPreference:"high-performance",backgroundColor:2105376,backgroundAlpha:0,autoStart:!1,antialias:!1,forceCanvas:!1,preserveDrawingBuffer:!1,resolution:t})).view.className="renderer",a.view.style.width="100%",a.view.style.height="100%",i.dom.style.right="0",i.dom.style.removeProperty("left"),(r=document.getElementById("content")).appendChild(a.view),r.appendChild(i.dom),e.prev=18,e.next=21,F(["bunny.png"]);case 21:e.next=26;break;case 23:e.prev=23,e.t0=e.catch(18),console.log(e.t0);case 26:return o=function e(){n&&n(),i.update(),a.render(),window.requestAnimationFrame(e)},window.requestAnimationFrame(o),e.abrupt("return",a);case 29:case"end":return e.stop()}}),e,null,[[18,23]])})))).apply(this,arguments)}function A(e){n=e}function I(e,t,i,n){return!!(new Uint8Array(e,i*Math.ceil(n/8)+Math.floor(t/8),1)[0]&1<<t%8)}function W(e,t,i,n,a){var r=new Uint8Array(e,i*Math.ceil(n/8)+Math.floor(t/8),1);r[0]=1===a?r[0]|1<<t%8:r[0]&(255^1<<t%8)}var k=i(3),H=function(){return Object(r.useEffect)((function(){Object(m.a)(j.a.mark((function e(){var t,i,n,a,r,o,c,h,d,l,s,u,b;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=Math.random().toFixed(4),i=v()(t),8,n=Math.ceil(window.innerWidth/8),a=Math.ceil(window.innerHeight/8),r=new ArrayBuffer(Math.ceil(n/8)*a),o=0;o<Math.ceil(n/8)*a;o++)new Uint8Array(r,o,1)[0]=Math.floor(256*i());return c=new y.b,h=new y.c,d=new y.g("Seed: ".concat(t," / Width: ").concat(window.innerWidth,"px / Height: ").concat(window.innerHeight,"px / Buffer: ").concat(r.byteLength," bytes"),{fontSize:13,fill:16777215}),h.beginFill(0,.5),h.drawRect(-1,-1,d.width+2,d.height+2),h.endFill(),c.x=window.innerWidth/2-d.width/2-1,c.y=60,c.addChild(h),c.addChild(d),e.next=19,C();case 19:for(l=e.sent,(s=new y.c).beginFill(3355443),u=0;u<a;u++)for(b=0;b<n;b++)I(r,b,u,n)&&s.drawRect(8*b,8*u,8,8);s.endFill(),l.stage.addChild(s),l.stage.addChild(c),A((function(){}));case 27:case"end":return e.stop()}}),e)})))()}),[]),Object(k.jsx)(k.Fragment,{})};function B(e,t,i,n,a){for(var r=0,o=-1;o<=1;o++)for(var c=-1;c<=1;c++){var h=t+c,d=i+o;0===c&&0===o||(h<0||d<0||h>=n||d>=a||I(e,h,d,n))&&r++}return r}function K(e,t,i,n){for(var a=new ArrayBuffer(e.byteLength),r=n.deathLimit,o=n.birthLimit,c=0;c<i;c++)for(var h=0;h<t;h++){var d=B(e,h,c,t,i);I(e,h,c,t)?W(a,h,c,t,d<o?0:1):W(a,h,c,t,d>r?1:0)}for(var l=0;l<a.byteLength;l++){var s=new Uint8Array(e,l,1),u=new Uint8Array(a,l,1);s[0]=u[0]}}var R=function(){return Object(r.useEffect)((function(){Object(m.a)(j.a.mark((function e(){var t,i,n,a,r,o,c,h,d,l,s,u,b,g,w;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=Math.random().toFixed(4),i=v()(t),8,n=Math.ceil(window.innerWidth/8),a=Math.ceil(window.innerHeight/8),r=new ArrayBuffer(Math.ceil(n/8)*a),o=0;o<Math.ceil(n/8)*a;o++)new Uint8Array(r,o,1)[0]=Math.floor(256*i());return c=new y.b,h=new y.c,d=new y.g("Seed: ".concat(t," / Width: ").concat(window.innerWidth,"px / Height: ").concat(window.innerHeight,"px / Buffer: ").concat(r.byteLength," bytes"),{fontSize:13,fill:16777215}),h.beginFill(0,.5),h.drawRect(-1,-1,d.width+2,d.height+2),h.endFill(),c.x=window.innerWidth/2-d.width/2-1,c.y=60,c.addChild(h),c.addChild(d),e.next=19,C();case 19:for(l=e.sent,(s=new y.c).beginFill(3355443),u=0;u<a;u++)for(b=0;b<n;b++)I(r,b,u,n)&&(s.beginFill(3355443),s.drawRect(8*b,8*u,8,8));s.endFill(),l.stage.addChild(s),l.stage.addChild(c),g=0,w=[{birthLimit:5,deathLimit:3},{birthLimit:5,deathLimit:3},{birthLimit:5,deathLimit:3},{birthLimit:5,deathLimit:4},{birthLimit:5,deathLimit:4},{birthLimit:5,deathLimit:4},{birthLimit:4,deathLimit:4},{birthLimit:4,deathLimit:4},{birthLimit:4,deathLimit:4}],A((function(){if(g++>10&&w.length){var e=w.splice(0,1)[0];K(r,n,a,e),s.clear(),s.beginFill(3355443);for(var t=0;t<a;t++)for(var i=0;i<n;i++)I(r,i,t,n)&&(s.beginFill(3355443),s.drawRect(8*i,8*t,8,8));s.endFill(),g=0}}));case 29:case"end":return e.stop()}}),e)})))()}),[]),Object(k.jsx)(k.Fragment,{})},q={width:Math.ceil(window.innerWidth/3),height:Math.ceil(window.innerHeight/3)},U={x:0,y:0},P={x:0,y:0},X={x:0,y:0},Y=function(e){var t=Math.round(U.x+q.width/2),i=Math.round(U.y+q.height/2);P.x=2*Math.cos(Math.atan2(e.targetTouches[0].clientY-i,e.targetTouches[0].clientX-t)),P.y=2*Math.sin(Math.atan2(e.targetTouches[0].clientY-i,e.targetTouches[0].clientX-t)),X.x=e.targetTouches[0].clientX,X.y=e.targetTouches[0].clientY},z=function(e){var t=Math.round(U.x+q.width/2),i=Math.round(U.y+q.height/2);P.x=2*Math.cos(Math.atan2(e.clientY-i,e.clientX-t)),P.y=2*Math.sin(Math.atan2(e.clientY-i,e.clientX-t)),X.x=e.clientX,X.y=e.clientY},D=function(){return Object(r.useEffect)((function(){Object(m.a)(j.a.mark((function e(){var t,i,n,a,r,o,c,h,d,l,s,u,b,g,w,f,x,m;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=Math.random().toFixed(4),i=v()(t),8,n=Math.ceil(window.innerWidth/8),a=Math.ceil(window.innerHeight/8),r=new ArrayBuffer(Math.ceil(n/8)*a),o=0;o<Math.ceil(n/8)*a;o++)new Uint8Array(r,o,1)[0]=Math.floor(256*i());return K(r,n,a,{birthLimit:5,deathLimit:3}),K(r,n,a,{birthLimit:5,deathLimit:3}),K(r,n,a,{birthLimit:5,deathLimit:3}),K(r,n,a,{birthLimit:5,deathLimit:4}),K(r,n,a,{birthLimit:5,deathLimit:4}),K(r,n,a,{birthLimit:5,deathLimit:4}),K(r,n,a,{birthLimit:4,deathLimit:4}),K(r,n,a,{birthLimit:4,deathLimit:4}),K(r,n,a,{birthLimit:4,deathLimit:4}),c=new y.b,h=new y.c,d=new y.g("Click to move viewport",{fontSize:13,fill:16777215}),h.beginFill(0,.5),h.drawRect(-1,-1,d.width+2,d.height+2),h.endFill(),c.x=window.innerWidth/2-d.width/2-1,c.y=60,c.addChild(h),c.addChild(d),(l=new y.c).lineStyle({width:1,color:65280}).moveTo(0,0).lineTo(4*Math.ceil(window.innerWidth/8),0).lineTo(4*Math.ceil(window.innerWidth/8),4*Math.ceil(window.innerHeight/8)).lineTo(0,4*Math.ceil(window.innerHeight/8)).lineTo(0,0),s=new y.b,u=new y.c,P.x=0,P.y=0,U.x=0,U.y=0,u.lineStyle({width:1,color:16711680}).moveTo(0,0).lineTo(q.width,0).lineTo(q.width,q.height).lineTo(0,q.height).lineTo(0,0),b=new y.c,(g=new y.g("(".concat(U.x,",").concat(U.y,")"),{fontSize:13,fill:16777215})).x=2,g.y=2,b.beginFill(0,.5),b.drawRect(0,0,g.width+2,g.height+2),b.endFill(),s.addChild(b),s.addChild(g),s.addChild(u),e.next=47,C();case 47:for(w=e.sent,(f=new y.c).clear(),f.beginFill(3355443),x=Math.floor(l.y/8);x<Math.ceil((l.y+l.height)/8);x++)for(m=Math.floor(l.x/8);m<Math.ceil((l.x+l.width)/8);m++)I(r,m,x,n)&&(f.beginFill(3355443),f.drawRect(8*m,8*x,8,8));f.endFill(),w.stage.addChild(f),w.stage.addChild(s),w.stage.addChild(l),w.stage.addChild(c),window.removeEventListener("touchstart",Y),window.removeEventListener("click",z),window.addEventListener("touchstart",Y),window.addEventListener("click",z),A((function(){var e=Math.round(U.x+q.width/2),t=Math.round(U.y+q.height/2);if(Math.sqrt(Math.pow(e-X.x,2)+Math.pow(t-X.y,2))<4&&(P.x=0,P.y=0),U.x<=0&&P.x<0?(X.x=Math.round(q.width/2),U.x=0,P.x=0):U.x+q.width>=window.innerWidth&&P.x>0&&(X.x=window.innerWidth-Math.round(q.width/2),U.x=window.innerWidth-q.width,P.x=0),U.y<=0&&P.y<0?(X.y=Math.round(q.height/2),U.y=0,P.y=0):U.y+q.height>=window.innerHeight&&P.y>0&&(X.y=window.innerHeight-Math.round(q.height/2),U.y=window.innerHeight-q.height,P.y=0),U.x+=P.x,U.y+=P.y,s.x=U.x,s.y=U.y,g.text="(".concat(Math.round(U.x),",").concat(Math.round(U.y),")"),s.x<l.x||s.x+s.width-1>l.x+l.width||s.y<l.y||s.y+s.height-1>l.y+l.height){l.x=s.x-Math.round((l.width-s.width)/2),l.y=s.y-Math.round((l.height-s.height)/2),l.x<=0&&(l.x=0),l.x>=window.innerWidth-l.width&&(l.x=window.innerWidth-l.width),l.y<=0&&(l.y=0),l.y>=window.innerHeight-l.height&&(l.y=window.innerHeight-l.height),f.clear(),f.beginFill(3355443);for(var i=Math.floor(l.y/8);i<Math.ceil((l.y+l.height)/8);i++)for(var a=Math.floor(l.x/8);a<Math.ceil((l.x+l.width)/8);a++)I(r,a,i,n)&&(f.beginFill(3355443),f.drawRect(8*a,8*i,8,8));f.endFill()}}));case 62:case"end":return e.stop()}}),e)})))()}),[]),Object(k.jsx)(k.Fragment,{})},_=function(){var e=Object(s.f)(),t=Object(s.e)(),i=Object(r.useState)(!0),n=Object(l.a)(i,2),a=n[0],o=n[1],c=e.pathname;return Object(k.jsx)(k.Fragment,{children:Object(k.jsxs)(u.a,{style:{height:"100%"},children:[Object(k.jsx)(b.a,{collapsible:!0,width:a?0:250,style:{position:"absolute",height:"100%",overflow:"auto",backgroundColor:"#1a1d24"},children:Object(k.jsxs)(g.a,{children:[Object(k.jsx)(g.a.Header,{style:{position:"fixed",top:0,height:"50px",width:a?50:250,zIndex:2},children:Object(k.jsx)(w.a,{children:Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:a?"angle-right":"angle-left"}),onClick:function(e){e.stopPropagation(),o(!a)},style:{backgroundColor:"#0f131a"},children:"Toggle"})})}),Object(k.jsx)(g.a.Body,{style:{height:"calc(100%-50px)",marginTop:"50px"},children:Object(k.jsxs)(w.a,{activeKey:c,children:[Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"gears2"}),disabled:!0,style:{backgroundColor:"#0f131a"},eventKey:c,children:"2D Platform Engine"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"th2"}),onSelect:function(){return t.push("/Engine/build")},eventKey:"/Engine/build",children:"Tilemap With Buffer"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"th2"}),onSelect:function(){return t.push("/Engine/build/cave-generate")},eventKey:"/Engine/build/cave-generate",children:"Cave Generate"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"square-o"}),onSelect:function(){return t.push("/Engine/build/viewport")},eventKey:"/Engine/build/viewport",children:"Viewport"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"tint"}),onSelect:function(){return t.push("/Engine/build/liquid-simulation")},eventKey:"/Engine/build/liquid-simulation",disabled:!0,children:"Liquid Simulation"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"tint"}),onSelect:function(){return t.push("/Engine/build/liquid-simulation-2")},eventKey:"/Engine/build/liquid-simulation-2",disabled:!0,children:"Liquid Simulation 2"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"tint"}),onSelect:function(){return t.push("/Engine/build/liquid-stress-test")},eventKey:"/Engine/build/liquid-stress-test",disabled:!0,children:"Liquid Stress Test"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"close"}),onSelect:function(){return t.push("/Engine/build/line-intersection")},eventKey:"/Engine/build/line-intersection",disabled:!0,children:"Line Intersection"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"lightbulb-o"}),onSelect:function(){return t.push("/Engine/build/lighting-area")},eventKey:"/Engine/build/lighting-area",disabled:!0,children:"Lighting Area"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"lightbulb-o"}),onSelect:function(){return t.push("/Engine/build/lighting-area-2")},eventKey:"/Engine/build/lighting-area-2",disabled:!0,children:"Lighting Area 2"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"lightbulb-o"}),onSelect:function(){return t.push("/Engine/build/lighting-stress-test")},eventKey:"/Engine/build/lighting-stress-test",disabled:!0,children:"Lighting Stress Test"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"lightbulb-o"}),onSelect:function(){return t.push("/Engine/build/lighting-with-viewport")},eventKey:"/Engine/build/lighting-with-viewport",disabled:!0,children:"Lighting With Viewport"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"object-ungroup"}),onSelect:function(){return t.push("/Engine/build/aabb-collision")},eventKey:"/Engine/build/aabb-collision",disabled:!0,children:"AABB Collision"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"object-ungroup"}),onSelect:function(){return t.push("/Engine/build/aabb-collision-2")},eventKey:"/Engine/build/aabb-collision-2",disabled:!0,children:"AABB Collision 2"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"object-ungroup"}),onSelect:function(){return t.push("/Engine/build/aabb-stress-test")},eventKey:"/Engine/build/aabb-stress-test",disabled:!0,children:"AABB Stress Test"}),Object(k.jsx)(w.a.Item,{icon:Object(k.jsx)(f.a,{icon:"globe"}),onSelect:function(){return t.push("/Engine/build/sample-world")},eventKey:"/Engine/build/sample-world",disabled:!0,children:"Sample World 1"})]})})]})}),Object(k.jsxs)(u.a,{id:"content",children:[Object(k.jsx)(s.a,{exact:!0,path:"/Engine/build",component:H}),Object(k.jsx)(s.a,{exact:!0,path:"/Engine/build/cave-generate",component:R}),Object(k.jsx)(s.a,{exact:!0,path:"/Engine/build/viewport",component:D}),Object(k.jsx)("div",{style:{position:"absolute",bottom:0,right:0,color:"#FFFFFF"},children:Object(k.jsx)("a",{href:"https://github.com/SimDaeSoo",children:"Created by daesoo94"})})]})]})})};i(329);h.a.render(Object(k.jsx)(o.a.StrictMode,{children:Object(k.jsx)(d.a,{children:Object(k.jsx)(_,{})})}),document.getElementById("root"))}},[[330,1,2]]]);
//# sourceMappingURL=main.d438e6fb.chunk.js.map