(this.webpackJsonpEngine=this.webpackJsonpEngine||[]).push([[0],{320:function(e,t,n){"use strict";n.r(t);var i,a,r=n(0),c=n.n(r),o=n(35),l=n.n(o),s=n(93),d=n(16),h=n.n(d),u=n(57),f=n(19),b=n(9),g=n(323),v=n(20),w=n(23),j=n(4),p=n(146),m=n.n(p);function x(e){return y.apply(this,arguments)}function y(){return(y=Object(u.a)(h.a.mark((function e(t){var n,i,a,r,c,o,l,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for("https://simdaesoo.github.io/Engine/build",n=[],i=[],a=1;a<=61;a++)i.push("tiles/Tile_".concat(a.toString().padStart(2,"0"),".png"));for(r=0;r<=36;r++)i.push("waters/".concat(r.toString().padStart(2,"0"),".png"));for(i.push("characters/ellie/idle.png"),i.push("sample.jpeg"),c=0,o=i;c<o.length;c++)l=o[c],n.push([l,"".concat("https://simdaesoo.github.io/Engine/build","/").concat(l)]);return s=0,j.e.shared.onLoad.add((function(){var e=arguments.length<=1?void 0:arguments[1];t(++s/n.length,e.name)})),e.abrupt("return",new Promise((function(e){var t,i=Object(w.a)(n);try{for(i.s();!(t=i.n()).done;){var a,r=t.value;(a=j.e.shared).add.apply(a,Object(v.a)(r))}}catch(c){i.e(c)}finally{i.f()}j.e.shared.load((function(){e()}))})));case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){if(a)return a.stage.removeAllListeners(),a.stage.removeChildren(),a;var e=window.devicePixelRatio||1;j.k.SCALE_MODE=j.g.NEAREST,j.k.MIPMAP_TEXTURES=j.f.OFF,j.k.STRICT_TEXTURE_CACHE=!0;var t=new m.a;(a=new j.a({width:window.innerWidth,height:window.innerHeight,sharedLoader:!0,powerPreference:"high-performance",backgroundColor:2105376,backgroundAlpha:0,autoStart:!1,antialias:!1,forceCanvas:!1,preserveDrawingBuffer:!1,resolution:e})).view.className="renderer",a.view.style.width="100%",a.view.style.height="100%",t.dom.style.right="0",t.dom.style.removeProperty("left");var n=document.getElementById("content");n.appendChild(a.view),n.appendChild(t.dom);return window.requestAnimationFrame((function e(){i&&i(),t.update(),a.render(),window.requestAnimationFrame(e)})),a}function S(e){i=e}var M=n(2),k=function(){return Object(M.jsx)("div",{style:{position:"absolute",bottom:0,right:0,color:"#FFFFFF",backgroundColor:"rgba(0,0,0,0.5)",padding:"1px 4px"},className:"noselect",children:Object(M.jsx)("a",{href:"https://github.com/SimDaeSoo",children:"Created by daesoo94"})})},C=n(326),A=n(322),L=n(324),E=n(156),T=function(){var e=Object(b.f)(),t=Object(b.e)(),n=Object(r.useState)(!0),i=Object(f.a)(n,2),a=i[0],c=i[1],o=e.pathname;return Object(M.jsx)(C.a,{collapsible:!0,width:a?0:250,style:{position:"absolute",height:"100%",overflow:"auto",backgroundColor:"#1a1d24"},children:Object(M.jsxs)(A.a,{children:[Object(M.jsx)(A.a.Header,{style:{position:"fixed",top:0,height:"50px",width:a?56:250,zIndex:2},children:Object(M.jsx)(L.a,{children:Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:a?"external-link-square":"gears2"}),onClick:function(e){e.stopPropagation(),c(!a)},style:{backgroundColor:"#0f131a"},children:a?"-":"Ellie Engine v0.0.1"})})}),Object(M.jsx)(A.a.Body,{style:{height:"calc(100%-50px)",marginTop:"50px"},children:Object(M.jsxs)(L.a,{activeKey:o,children:[Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"th2"}),onSelect:function(){return t.push("/")},eventKey:"/",children:"Tilemap With Buffer"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"th2"}),onSelect:function(){return t.push("/cave-generate")},eventKey:"/cave-generate",children:"Cave Generate"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"th2"}),onSelect:function(){return t.push("/cave-generate-texture")},eventKey:"/cave-generate-texture",children:"Cave With Texture"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"tint"}),onSelect:function(){return t.push("/liquid-simulation")},eventKey:"/liquid-simulation",children:"Liquid Simulation"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"tint"}),onSelect:function(){return t.push("/liquid-simulation-2")},eventKey:"/liquid-simulation-2",children:"Liquid Simulation 2"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"tint"}),onSelect:function(){return t.push("/liquid-stress-test")},eventKey:"/liquid-stress-test",children:"Liquid Stress Test"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"close"}),onSelect:function(){return t.push("/line-intersection")},eventKey:"/line-intersection",children:"Line Intersection"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"close"}),onSelect:function(){return t.push("/line-intersection-2")},eventKey:"/line-intersection-2",children:"Line Intersection 2"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"lightbulb-o"}),onSelect:function(){return t.push("/lighting-area")},eventKey:"/lighting-area",disabled:!0,children:"Lighting Area"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"lightbulb-o"}),onSelect:function(){return t.push("/lighting-area-2")},eventKey:"/lighting-area-2",disabled:!0,children:"Lighting Area 2"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"lightbulb-o"}),onSelect:function(){return t.push("/lighting-stress-test")},eventKey:"/lighting-stress-test",disabled:!0,children:"Lighting Stress Test"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"object-ungroup"}),onSelect:function(){return t.push("/aabb-collision")},eventKey:"/aabb-collision",disabled:!0,children:"AABB Collision"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"object-ungroup"}),onSelect:function(){return t.push("/aabb-collision-2")},eventKey:"/aabb-collision-2",disabled:!0,children:"AABB Collision 2"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"object-ungroup"}),onSelect:function(){return t.push("/aabb-stress-test")},eventKey:"/aabb-stress-test",disabled:!0,children:"AABB Stress Test"}),Object(M.jsx)(L.a.Item,{icon:Object(M.jsx)(E.a,{icon:"globe"}),onSelect:function(){return t.push("/sample-world")},eventKey:"/sample-world",disabled:!0,children:"Sample World"})]})})]})})},F=n(325),I=function(e){var t=e.hide,n=e.asset,i=e.percentage;return Object(M.jsxs)("div",{style:{width:"100%",position:"absolute",bottom:"20px",opacity:t?0:1,transitionProperty:"opacity",transitionDuration:"1s"},children:[Object(M.jsxs)("div",{style:{width:"100%",textAlign:"center"},className:"noselect",children:["Loading Asset : ",n]}),Object(M.jsx)(F.a.Line,{className:"notransition",percent:i,status:100===i?"success":"active"})]})};function q(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:6710886;e.beginFill(i);for(var a=0;a<t.length;a++)for(var r=0;r<t[a].length;r++)t[a][r][0][0]&&e.drawRect(r*n,a*n,n,n);e.endFill()}function B(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:16711680;e.beginFill(i);var a,r=Object(w.a)(t);try{for(r.s();!(a=r.n()).done;){var c=a.value;e.drawCircle(c[0],c[1],n)}}catch(o){r.e(o)}finally{r.f()}e.endFill()}function K(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{width:1,color:65280};e.lineStyle(n);var i,a=Object(w.a)(t);try{for(a.s();!(i=a.n()).done;){var r=Object(f.a)(i.value,2),c=r[0],o=r[1];e.moveTo.apply(e,Object(v.a)(c)),e.lineTo.apply(e,Object(v.a)(o))}}catch(l){a.e(l)}finally{a.f()}e.endFill(),e.line.reset()}function W(e,t,n){var i=n||{},a=i.splitSize,r=void 0===a?0:a,c=i.density,o=void 0===c?{block:.5,liquid:.5}:c;if(0===r){for(var l=new ArrayBuffer(e*t*8+16),s=0;s<e*t;s++){var d=new Uint8Array(l,8*s,4),h=new Float32Array(l,8*s+4,1),u=Math.random()<o.block?1:0;d[0]=u,d[1]=0,d[2]=0,d[3]=0,h[0]=0===u&&Math.random()<o.liquid?1:0}var f=new Float64Array(l,l.byteLength-16,2);return f[0]=t,f[1]=e,[[l]]}if(e%r!==0||t%r!==0)throw new Error("width and height must be perfectly was divided by split size");for(var b=new Array(t/r).fill(!0).map((function(){return new Array(e/r)})),g=0;g<t/r;g++)for(var v=0;v<e/r;v++){for(var w=new ArrayBuffer(8*Math.pow(r,2)+16),j=0;j<Math.pow(r,2);j++){var p=new Uint8Array(w,8*j,4),m=new Float32Array(w,8*j+4,1),x=Math.random()<o.block?1:0;p[0]=x,p[1]=0,p[2]=0,p[3]=0,m[0]=0===x&&Math.random()<o.liquid?1:0}var y=new Float64Array(w,w.byteLength-16,2);y[0]=r,y[1]=r,b[g][v]=w}return b}function P(e){for(var t=new Float64Array(e[0][0],e[0][0].byteLength-16,2),n=t[0],i=t[1],a=new Array(n*e.length).fill(!0).map((function(){return new Array(i*e[0].length)})),r=0;r<a.length;r++)for(var c=[Math.floor(r/n),r%n],o=c[0],l=c[1],s=0;s<a[r].length;s++){var d=[Math.floor(s/i),s%i],h=d[0],u=d[1];a[r][s]=[new Uint8Array(e[o][h],8*(l*i+u),4),new Float32Array(e[o][h],8*(l*i+u)+4,1)]}return a}function _(e,t){return new Array(t).fill(!0).map((function(){return new Array(e).fill(!0).map((function(){return{diff:0,isStable:!1,stableLevel:0}}))}))}var Y=function(){return Object(r.useEffect)((function(){var e=P(W(Math.ceil(window.innerWidth/8),Math.ceil(window.innerHeight/8))),t=O(),n=new j.c;n.clear(),q(n,e),t.stage.addChild(n)}),[]),Object(M.jsx)(M.Fragment,{})};function H(e,t,n){for(var i=0,a=-1;a<=1;a++)for(var r=-1;r<=1;r++){var c=e+r,o=t+a;0===r&&0===a||(c<0||o<0||c>=n[0].length||o>=n.length||n[o][c][0][0])&&i++}return i}function D(e,t){for(var n=new Array(e.length).fill(!0).map((function(){return new Array(e[0].length).fill(!1)})),i=t.deathLimit,a=t.birthLimit,r=0;r<e.length;r++)for(var c=0;c<e[0].length;c++){var o=H(c,r,e);e[r][c][0][0]?n[r][c]=!(o<a):n[r][c]=o>i}for(var l=0;l<n.length;l++)for(var s=0;s<n[0].length;s++)e[l][s][0][0]=n[l][s]?1:0}var R=function(){return Object(r.useEffect)((function(){var e=P(W(Math.ceil(window.innerWidth/8),Math.ceil(window.innerHeight/8))),t=O(),n=new j.c;n.clear(),q(n,e),t.stage.addChild(n);var i=0,a=0;S((function(){i++>=10&&a<10&&(D(e,a<4?{deathLimit:3,birthLimit:5}:{deathLimit:4,birthLimit:4}),n.clear(),q(n,e),a++,i=0)}))}),[]),Object(M.jsx)(M.Fragment,{})};function X(e,t,n){var i=t>0&&e>0&&n[t-1][e-1][0][0]===n[t][e][0][0],a=t>0&&n[t-1][e][0][0]===n[t][e][0][0],r=t>0&&e<n[0].length-1&&n[t-1][e+1][0][0]===n[t][e][0][0],c=e>0&&n[t][e-1][0][0]===n[t][e][0][0],o=e<n[0].length-1&&n[t][e+1][0][0]===n[t][e][0][0],l=t<n.length-1&&e>0&&n[t+1][e-1][0][0]===n[t][e][0][0],s=t<n.length-1&&n[t+1][e][0][0]===n[t][e][0][0],d=t<n.length-1&&e<n[0].length-1&&n[t+1][e+1][0][0]===n[t][e+1][0][0];return!a&&!c&&o&&s?1:!a&&c&&o&&s&&!l&&d?41:!a&&c&&o&&s&&!l&&!d?42:!a&&c&&o&&s&&l&&!d?43:!a&&c&&o&&s?2:!a&&c&&!o&&s?3:a&&c&&o&&s&&i&&r&&l&&!d?4:a&&c&&o&&!s&&!i&&r?51:a&&c&&o&&!s&&i&&!r?53:a&&c&&o&&!s&&!i&&!r?52:a&&c&&o&&!s?5:a&&c&&o&&s&&i&&r&&!l&&d?6:a&&c&&o&&s&&i&&r&&l&&d?12:a&&!c&&o&&s&&!r&&d?36:a&&!c&&o&&s&&!r&&!d?37:a&&!c&&o&&s&&r&&!d?38:a&&!c&&o&&s?11:a&&c&&!o&&s&&i&&!l?44:a&&c&&!o&&s&&!i&&!l?45:a&&c&&!o&&s&&!i&&l?46:a&&c&&!o&&s?13:a&&c&&o&&s&&!i&&r&&!l&&d?17:a&&c&&o&&s&&i&&r&&!l&&!d?18:a&&c&&o&&s&&!i&&r&&l&&!d?19:a&&!c&&o&&!s?21:a&&c&&!o&&!s?23:a&&c&&o&&s&&i&&!r&&l&&d?24:a&&c&&o&&s&&!i&&r&&l&&d?57:a&&c&&o&&s&&i&&!r&&l&&!d?27:a&&c&&o&&s&&!i&&!r&&l&&d?28:a&&c&&o&&s&&i&&!r&&!l&&d?29:a||c||!o||s?!a&&c&&o&&!s?33:a||!c||o||s?!(a&&c&&o&&s)||i||r||l||d?a||c||o||!s?a&&!c&&!o&&s?55:!a||c||o||s?a&&c&&o&&s&&i&&!r&&!l&&!d||a&&c&&o&&s&&!i&&r&&!l&&!d||a&&c&&o&&s&&!i&&!r&&l&&!d||a&&c&&o&&s&&!i&&!r&&!l&&d?35:31:56:54:35:34:32}function z(e,t,n){var i=Math.floor(33-33*Math.min(n[t][e][1][0],1));if(t<n.length-1&&t>0&&e<n[0].length-1&&e>0&&!n[t-1][e][1][0]&&n[t+1][e][1][0]&&(n[t][e-1][1][0]&&n[t-1][e-1][1][0]&&n[t][e-1][1][0]<1&&n[t-1][e-1][1][0]<1&&n[t+1][e+1][1][0]<1||n[t][e+1][1][0]&&n[t-1][e+1][1][0]&&n[t][e+1][1][0]<1&&n[t-1][e+1][1][0]<1&&n[t+1][e-1][1][0]<1)){if(n[t-1][e-1][1][0]&&n[t-1][e+1][1][0]&&(!n[t][e+1][1][0]||n[t][e+1][0][0])&&(!n[t][e-1][1][0]||n[t][e-1][0][0]))return 36;if(n[t-1][e-1][1][0]&&!n[t][e+1][1][0])return 35;if(n[t-1][e+1][1][0]&&!n[t][e-1][1][0])return 34}return i<=1&&(0===t||!n[t-1][e][0][0]&&!n[t-1][e][1][0])?2:t>0&&n[t-1][e][1][0]&&!n[t-1][e][0][0]?0:i}var N=function(){return Object(r.useEffect)((function(){var e=Math.ceil(window.innerWidth/8),t=Math.ceil(window.innerHeight/8),n=P(W(e,t)),i=O(),a=new j.c;a.clear(),q(a,n),i.stage.addChild(a);var r=0,c=0;S((function(){if(r++>=10&&c<10&&(D(n,c<4?{deathLimit:3,birthLimit:5}:{deathLimit:4,birthLimit:4}),a.clear(),q(a,n),c++,r=0,10===c)){i.stage.removeChild(a);for(var o=new j.b,l=new Array(t).fill(!0).map((function(){return new Array(e)})),s=0;s<t;s++)for(var d=0;d<e;d++){var h=new j.h(n[s][d][0][0]?j.j.from("tiles/Tile_".concat(X(d,s,n).toString().padStart(2,"0"),".png")):j.j.from("tiles/Tile_61.png"));h.width=8,h.height=8,h.x=8*d,h.y=8*s,l[s][d]=h,o.addChild(h)}i.stage.addChild(o),o.cacheAsBitmap=!0}}))}),[]),Object(M.jsx)(M.Fragment,{})},U=h.a.mark(ee),J=h.a.mark(te),G=.005,Q=.125,V=.005,Z=.5;function $(e,t){var n=e+t[1][0];return n<=1?1:n<2.125?(1+n*Q)/1.125:(n+Q)/2}function ee(e,t,n){var i,a,r,c,o,l,s,d,u,f,b,g,v;return h.a.wrap((function(h){for(;;)switch(h.prev=h.next){case 0:i=0,a=5e3,r=Date.now(),l=0,d=0;case 4:if(!(d<t.length)){h.next=20;break}u=0;case 6:if(!(u<t[0].length)){h.next=17;break}if(t[d][u].diff=0,!(++i>a)){h.next=14;break}if(i=0,!(Date.now()-r>=n)){h.next=14;break}return void(h.next=13);case 13:r=h.sent;case 14:u++,h.next=6;break;case 17:d++,h.next=4;break;case 20:f=0;case 21:if(!(f<e.length)){h.next=66;break}b=0;case 23:if(!(b<e[f].length)){h.next=63;break}if(s=e[f][b],c=s[1][0],o=s[1][0],l=0,!s[0][0]){h.next=30;break}return h.abrupt("continue",60);case 30:if(0!==s[1][0]){h.next=32;break}return h.abrupt("continue",60);case 32:if(!t[f][b].isStable){h.next=34;break}return h.abrupt("continue",60);case 34:if(!(s[1][0]<G)){h.next=37;break}return s[1][0]=0,h.abrupt("continue",60);case 37:if(f<e.length-1&&!e[f+1][b][0][0]&&(l=$(s[1][0],e[f+1][b])-e[f+1][b][1][0],e[f+1][b][1][0]>0&&l>V&&(l*=Z),(l=Math.max(l,0))>Math.min(4,s[1][0])&&(l=Math.min(4,s[1][0])),0!==l&&(o-=l,t[f][b].diff-=l,t[f+1][b].diff+=l,t[f+1][b].isStable=!1)),!(o<G)){h.next=41;break}return t[f][b].diff-=o,h.abrupt("continue",60);case 41:if(b>0&&!e[f][b-1][0][0]&&((l=(o-e[f][b-1][1][0])/4)>V&&(l*=Z),(l=Math.max(l,0))>Math.min(4,o)&&(l=Math.min(4,o)),0!==l&&(o-=l,t[f][b].diff-=l,t[f][b-1].diff+=l,t[f][b-1].isStable=!1)),!(o<G)){h.next=45;break}return t[f][b].diff-=o,h.abrupt("continue",60);case 45:if(b<e[f].length-1&&!e[f][b+1][0][0]&&((l=(o-e[f][b+1][1][0])/3)>V&&(l*=Z),(l=Math.max(l,0))>Math.min(4,o)&&(l=Math.min(4,o)),0!==l&&(o-=l,t[f][b].diff-=l,t[f][b+1].diff+=l,t[f][b+1].isStable=!1)),!(o<G)){h.next=49;break}return t[f][b].diff-=o,h.abrupt("continue",60);case 49:if(f>0&&!e[f-1][b][0][0]&&((l=o-$(o,e[f-1][b]))>V&&(l*=Z),(l=Math.max(l,0))>Math.min(4,o)&&(l=Math.min(4,o)),0!==l&&(o-=l,t[f][b].diff-=l,t[f-1][b].diff+=l,t[f-1][b].isStable=!1)),!(o<G)){h.next=53;break}return t[f][b].diff-=o,h.abrupt("continue",60);case 53:if(c===o&&++t[f][b].stableLevel>=10?t[f][b].isStable=!0:(f>0&&e[f-1][b]&&(t[f-1][b].isStable=!1),f<e.length-1&&e[f+1][b]&&(t[f+1][b].isStable=!1),b>0&&e[f][b-1]&&(t[f][b-1].isStable=!1),b<e[0].length-1&&e[f][b+1]&&(t[f][b+1].isStable=!1)),!(++i>a)){h.next=60;break}if(i=0,!(Date.now()-r>=n)){h.next=60;break}return void(h.next=59);case 59:r=h.sent;case 60:b++,h.next=23;break;case 63:f++,h.next=21;break;case 66:g=0;case 67:if(!(g<e.length)){h.next=84;break}v=0;case 69:if(!(v<e[g].length)){h.next=81;break}if(e[g][v][1][0]+=t[g][v].diff,e[g][v][1][0]<G&&(e[g][v][1][0]=0),!(++i>a)){h.next=78;break}if(i=0,!(Date.now()-r>=n)){h.next=78;break}return void(h.next=77);case 77:r=h.sent;case 78:v++,h.next=69;break;case 81:g++,h.next=67;break;case 84:return h.abrupt("return");case 85:case"end":return h.stop()}}),U)}function te(e,t){var n,i,a=arguments;return h.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:n=a.length>2&&void 0!==a[2]?a[2]:3,i=ee(e,t,n);case 2:return i.next(Date.now()).done&&(i=ee(e,t,n)),void(r.next=6);case 6:r.next=2;break;case 8:case"end":return r.stop()}}),J)}var ne=function(){return Object(r.useEffect)((function(){for(var e=Math.ceil(window.innerWidth/8),t=Math.ceil(window.innerHeight/8),n=P(W(e,t,{splitSize:0,density:{block:.5,liquid:.5}})),i=_(e,t),a=0;a<10;a++)D(n,a<4?{deathLimit:3,birthLimit:5}:{deathLimit:4,birthLimit:4});for(var r=O(),c=new j.b,o=new j.b,l=new j.b,s=new Array(t).fill(!0).map((function(){return new Array(e)})),d=0;d<t;d++)for(var h=0;h<e;h++)if(n[d][h][0][0]){var u=new j.h(j.j.from("tiles/Tile_".concat(X(h,d,n).toString().padStart(2,"0"),".png")));u.width=8,u.height=8,u.x=8*h,u.y=8*d,s[d][h]=u,o.addChild(u)}else{var f=z(h,d,n),b=new j.h(f>=0?j.j.from("waters/".concat(f.toString().padStart(2,"0"),".png")):j.j.EMPTY);b.width=8,b.height=8,b.x=8*h,b.y=8*d,s[d][h]=b,l.addChild(b);var g=new j.h(j.j.from("tiles/Tile_61.png"));g.width=8,g.height=8,g.x=8*h,g.y=8*d,c.addChild(g)}r.stage.addChild(c),r.stage.addChild(o),r.stage.addChild(l),c.cacheAsBitmap=!0,o.cacheAsBitmap=!0;var v=te(n,i);S((function(){v.next();for(var i=0;i<t;i++)for(var a=0;a<e;a++)if(!n[i][a][0][0]){var r=z(a,i,n);s[i][a].texture=n[i][a][1][0]&&r>=0?j.j.from("waters/".concat(r.toString().padStart(2,"0"),".png")):j.j.EMPTY,s[i][a].alpha=Math.min(.3+.15*n[i][a][1][0],.8)}}))}),[]),Object(M.jsx)(M.Fragment,{})};function ie(e){var t=new j.b,n=new j.c,i=new j.i(e,{fontSize:13,fill:16777215});return i.x=1,i.y=1,n.beginFill(0,.5),n.drawRect(0,0,i.width+2,i.height+2),n.endFill(),t.addChild(n),t.addChild(i),{container:t,label:i}}var ae,re,ce=function(e){var t=[Math.floor(e.targetTouches[0].clientX/8),Math.floor(e.targetTouches[0].clientY/8)];le(t[0],t[1])},oe=function(e){var t=[Math.floor(e.clientX/8),Math.floor(e.clientY/8)];le(t[0],t[1])},le=function(e,t){ae&&ae(e,t)},se=function(){return Object(r.useEffect)((function(){for(var e=Math.ceil(window.innerWidth/8),t=Math.ceil(window.innerHeight/8),n=P(W(e,t,{splitSize:0,density:{block:.5,liquid:0}})),i=_(e,t),a=0;a<10;a++)D(n,a<4?{deathLimit:3,birthLimit:5}:{deathLimit:4,birthLimit:4});window.removeEventListener("touchstart",ce),window.removeEventListener("click",oe),window.addEventListener("touchstart",ce),window.addEventListener("click",oe),ae=function(i,a){for(var r=-3;r<=3;r++)for(var c=-3;c<=3;c++)i+c>=0&&i+c<e&&a+r>=0&&a+r<t&&!n[a+r][i+c][0][0]&&(n[a+r][i+c][1][0]+=1)};var r=O(),c=ie("Click to create water").container;c.x=Math.round(window.innerWidth/2-c.width/2),c.y=60;for(var o=new j.b,l=new j.b,s=new j.b,d=new Array(t).fill(!0).map((function(){return new Array(e)})),h=0;h<t;h++)for(var u=0;u<e;u++)if(n[h][u][0][0]){var f=new j.h(j.j.from("tiles/Tile_".concat(X(u,h,n).toString().padStart(2,"0"),".png")));f.width=8,f.height=8,f.x=8*u,f.y=8*h,d[h][u]=f,l.addChild(f)}else{var b=z(u,h,n),g=new j.h(b>=0?j.j.from("waters/".concat(b.toString().padStart(2,"0"),".png")):j.j.EMPTY);g.width=8,g.height=8,g.x=8*u,g.y=8*h,d[h][u]=g,s.addChild(g);var v=new j.h(j.j.from("tiles/Tile_61.png"));v.width=8,v.height=8,v.x=8*u,v.y=8*h,o.addChild(v)}r.stage.addChild(o),r.stage.addChild(l),r.stage.addChild(s),r.stage.addChild(c),o.cacheAsBitmap=!0,l.cacheAsBitmap=!0;var w=te(n,i);S((function(){w.next();for(var i=0;i<t;i++)for(var a=0;a<e;a++)if(!n[i][a][0][0]){var r=z(a,i,n);d[i][a].texture=n[i][a][1][0]&&r>=0?j.j.from("waters/".concat(r.toString().padStart(2,"0"),".png")):j.j.EMPTY,d[i][a].alpha=Math.min(.3+.15*n[i][a][1][0],.8)}}))}),[]),Object(M.jsx)(M.Fragment,{})},de=function(e){var t=[Math.floor(e.targetTouches[0].clientX/8),Math.floor(e.targetTouches[0].clientY/8)];ue(t[0],t[1])},he=function(e){var t=[Math.floor(e.clientX/8),Math.floor(e.clientY/8)];ue(t[0],t[1])},ue=function(e,t){re&&re(e,t)},fe=function(){return Object(r.useEffect)((function(){var e=Math.ceil(window.innerWidth/8),t=Math.ceil(window.innerHeight/8),n=P(W(e,t,{splitSize:0,density:{block:0,liquid:1}})),i=_(e,t);window.removeEventListener("touchstart",de),window.removeEventListener("click",he),window.addEventListener("touchstart",de),window.addEventListener("click",he),re=function(i,a){for(var r=-5;r<=5;r++)for(var c=-5;c<=5;c++)i+c>=0&&i+c<e&&a+r>=0&&a+r<t&&!n[a+r][i+c][0][0]&&(n[a+r][i+c][1][0]+=1)};var a=O(),r=ie("Click to create water").container;r.x=Math.round(window.innerWidth/2-r.width/2),r.y=60;for(var c=new j.b,o=new j.b,l=new j.b,s=new Array(t).fill(!0).map((function(){return new Array(e)})),d=0;d<t;d++)for(var h=0;h<e;h++)if(n[d][h][0][0]){var u=new j.h(j.j.from("tiles/Tile_".concat(X(h,d,n).toString().padStart(2,"0"),".png")));u.width=8,u.height=8,u.x=8*h,u.y=8*d,s[d][h]=u,o.addChild(u)}else{var f=z(h,d,n),b=new j.h(f>=0?j.j.from("waters/".concat(f.toString().padStart(2,"0"),".png")):j.j.EMPTY);b.width=8,b.height=8,b.x=8*h,b.y=8*d,s[d][h]=b,l.addChild(b);var g=new j.h(j.j.from("tiles/Tile_61.png"));g.width=8,g.height=8,g.x=8*h,g.y=8*d,c.addChild(g)}a.stage.addChild(c),a.stage.addChild(o),a.stage.addChild(l),a.stage.addChild(r),c.cacheAsBitmap=!0,o.cacheAsBitmap=!0;var v=te(n,i);S((function(){v.next();for(var i=0;i<t;i++)for(var a=0;a<e;a++)if(!n[i][a][0][0]){var r=z(a,i,n);s[i][a].texture=n[i][a][1][0]&&r>=0?j.j.from("waters/".concat(r.toString().padStart(2,"0"),".png")):j.j.EMPTY,s[i][a].alpha=Math.min(.3+.15*n[i][a][1][0],.8)}}))}),[]),Object(M.jsx)(M.Fragment,{})};function be(e,t){var n=(e[1][0]-e[0][0])*(t[1][1]-t[0][1])-(t[1][0]-t[0][0])*(e[1][1]-e[0][1]);if(0===n)return-1;var i=((t[1][1]-t[0][1])*(t[1][0]-e[0][0])+(t[0][0]-t[1][0])*(t[1][1]-e[0][1]))/n,a=((e[0][1]-e[1][1])*(t[1][0]-e[0][0])+(e[1][0]-e[0][0])*(t[1][1]-e[0][1]))/n;return 0<=i&&i<=1&&0<=a&&a<=1?i:-1}var ge,ve=function(){return Object(r.useEffect)((function(){var e,t=O(),n=new j.c,i=[Math.floor(window.innerWidth/4),Math.floor(window.innerHeight/4)],a=i[0],r=i[1],c=[[a,r],[3*a,3*r]],o=[[3*a,r],[a,3*r]],l=[].concat(c,o);t.stage.addChild(n);var s,d=Object(w.a)(l);try{for(d.s();!(s=d.n()).done;){var h,u=s.value,f=ie("(".concat(u,")")).container;(h=f.position).set.apply(h,Object(v.a)(u)),t.stage.addChild(f)}}catch(m){d.e(m)}finally{d.f()}n.clear(),K(n,[c,o],{width:1,color:39168}),B(n,l,2);var b=be(c,o),g=[c[0][0]+(c[1][0]-c[0][0])*b,c[0][1]+(c[1][1]-c[0][1])*b];B(n,[g],4,16755302);var p=ie("Intersection at (".concat(g[0].toFixed(2),",").concat(g[1].toFixed(2),")")).container;(e=p.position).set.apply(e,g),t.stage.addChild(p)}),[]),Object(M.jsx)(M.Fragment,{})},we=[[.65125,.73125],[.6275,.7375],[.61,.735],[.5925,.72625],[.57875,.71875],[.56625,.71375],[.54875,.715],[.53125,.72],[.515,.7225],[.50125,.71625],[.48125,.7175],[.46375,.72625],[.44875,.73],[.4375,.7325],[.42625,.7325],[.425,.73625],[.43375,.755],[.44375,.76375],[.45625,.7725],[.4625,.77625],[.48,.7825],[.49875,.785],[.5125,.785],[.5275,.78125],[.53625,.78125],[.55125,.78375],[.56625,.785],[.5775,.785],[.5875,.785],[.60125,.7775],[.6175,.76375],[.6375,.74375],[.64625,.73625],[.65125,.73125],[.6375,.71875],[.6225,.7075],[.60875,.695],[.6,.68625],[.585,.67125],[.57875,.6675],[.5675,.66125],[.55875,.6625],[.54875,.665],[.535,.67375],[.52625,.67375],[.5125,.6675],[.50625,.66375],[.49125,.66625],[.47375,.67375],[.45875,.68875],[.44375,.7],[.43375,.70875],[.42125,.7175],[.4125,.71875],[.40375,.71875],[.4,.71625],[.405,.72125],[.41,.72375],[.41875,.7275],[.435,.72625],[.45125,.7225],[.47625,.6975],[.49125,.685],[.505,.66],[.5125,.63875],[.51375,.61875],[.50625,.60125],[.4975,.595],[.485,.59125],[.47375,.58875],[.4675,.58875],[.4625,.59125],[.4675,.6],[.4775,.60375],[.49,.61],[.505,.61125],[.5225,.6125],[.53375,.6125],[.545,.60625],[.55625,.59625],[.56625,.5925],[.575,.5925],[.5825,.59375],[.565,.605],[.55375,.61],[.54125,.61125],[.5325,.6125],[.565,.6125],[.58375,.61],[.59375,.60125],[.59875,.59375],[.59875,.58375],[.59625,.5725],[.5925,.565],[.58375,.55375],[.57,.54],[.565,.525],[.56125,.49],[.55875,.39],[.56125,.3375],[.5725,.29625],[.585,.2675],[.59625,.24625],[.615,.22375],[.64375,.20375],[.66875,.195],[.6875,.19],[.70875,.18875],[.7325,.19],[.7525,.1925],[.78875,.20375],[.81875,.21875],[.835,.2325],[.84375,.24625],[.85,.2675],[.8525,.2875],[.84875,.30375],[.83875,.32375],[.82625,.3375],[.8025,.35375],[.77125,.37375],[.74375,.38],[.71125,.3825],[.6825,.385],[.6625,.38375],[.64625,.38125],[.62875,.37875],[.615,.3725],[.6075,.3675],[.62625,.34375],[.64125,.33125],[.66125,.31375],[.68875,.3],[.715,.295],[.7525,.2925],[.77375,.29375],[.79625,.3],[.8125,.31],[.8275,.32375],[.83875,.33625],[.85,.35375],[.86875,.39125],[.87875,.4475],[.87625,.49375],[.87625,.54375],[.865,.5975],[.84625,.6525],[.82875,.69625],[.81125,.7375],[.77375,.7925],[.75,.815],[.70625,.85375],[.67125,.87875],[.6375,.89875],[.6075,.91125],[.57625,.9225],[.54375,.925],[.49875,.9275],[.48,.92375],[.45,.9175],[.4225,.90125],[.38625,.88375],[.3475,.8525],[.32,.8325],[.305,.825],[.295,.82125],[.28125,.81875],[.26125,.81875],[.245,.82375],[.22,.83125],[.20625,.84125],[.17875,.84625],[.1675,.8475],[.1575,.8525],[.1375,.85],[.12,.84375],[.09625,.83375],[.0675,.8175],[.04625,.8075],[.035,.80125],[.02625,.7975],[.0225,.7975],[.05625,.77625],[.09125,.7575],[.11375,.74625],[.1475,.7425],[.1625,.7425],[.18,.745],[.20125,.74875],[.21875,.75625],[.24,.76625],[.26375,.78],[.2825,.79375],[.30375,.81125],[.32125,.82625],[.32875,.83625],[.27375,.76875],[.2525,.72875],[.25125,.70875],[.265,.685],[.29375,.66625],[.32375,.6525],[.35375,.635],[.375,.61875],[.39625,.59375],[.4175,.5625],[.4275,.53625],[.43125,.5175],[.43125,.51125],[.4125,.52875],[.3975,.53375],[.3675,.53625],[.36,.53625],[.33375,.5375],[.315,.5425],[.29625,.5475],[.27875,.5625],[.25875,.58375],[.245,.60125],[.2375,.62125],[.2375,.645],[.2375,.6775],[.24125,.69625],[.24625,.71375],[.24875,.72375],[.25125,.72625],[.2325,.65],[.23125,.605],[.2325,.575],[.23375,.53625],[.235,.51],[.23625,.49625],[.26875,.5],[.28875,.49625],[.31375,.48875],[.34,.47875],[.36375,.465],[.3775,.4475],[.39875,.43],[.42375,.41375],[.4475,.40125],[.47,.38375],[.485,.3625],[.49375,.33625],[.4975,.31],[.48375,.27875],[.46625,.26],[.45,.25125],[.4325,.25],[.41,.25125],[.39125,.25875],[.35875,.27875],[.335,.2875],[.315,.29125],[.2975,.29],[.28125,.28125],[.2575,.265],[.23,.245],[.20375,.23125],[.1825,.225],[.1675,.22375],[.15875,.2225],[.18625,.20375],[.23375,.19],[.2625,.185],[.29625,.1775],[.3275,.1775],[.35625,.18375],[.375,.195],[.3925,.21125],[.40875,.22875],[.41875,.24875],[.42375,.2725],[.4275,.30375],[.43125,.33125],[.42375,.35125],[.40625,.36875],[.38,.37875],[.3625,.38375],[.335,.38],[.32,.365],[.3025,.34625],[.2875,.33875],[.27375,.33625],[.2375,.33625],[.21625,.32875],[.19625,.32125],[.1775,.3075],[.16125,.29375],[.14875,.27375],[.13875,.25625],[.135,.24],[.1425,.235],[.16125,.23625],[.1725,.24375],[.18875,.25875],[.1975,.2725],[.21375,.28875],[.22375,.2975],[.24125,.30375],[.255,.3075],[.2775,.3075],[.29875,.3075],[.30875,.31375],[.32125,.325],[.3275,.34625],[.3275,.3725],[.325,.395],[.32125,.4075],[.31625,.43125],[.31375,.45],[.305,.47],[.29,.485],[.27375,.4875],[.24875,.4875],[.2325,.485],[.21875,.475],[.21,.4625],[.1975,.44],[.18875,.405],[.1825,.37625],[.17375,.35125],[.16,.32375],[.14375,.2975],[.125,.27625],[.115,.26375],[.0975,.25375],[.08625,.25125],[.07375,.2525],[.06625,.255],[.0625,.26875],[.0625,.2825],[.07125,.295],[.0775,.3025],[.0925,.3175],[.10125,.3275],[.1125,.3375],[.1225,.35375],[.12625,.3725],[.12875,.3925],[.13375,.41125],[.14125,.425],[.1525,.44],[.1675,.455],[.18,.46625],[.1975,.47625],[.215,.4875],[.2275,.48875],[.24375,.49375],[.25375,.495],[.27875,.49125],[.2925,.4875],[.31125,.47375],[.34,.44375],[.34375,.415],[.35125,.38875],[.35625,.35625],[.36375,.32375],[.36875,.2925],[.3675,.26],[.3625,.24125],[.355,.22625],[.34125,.21125],[.33,.20375],[.30875,.19625],[.29125,.195],[.27625,.1975],[.265,.2],[.2575,.20875],[.2575,.22375],[.26,.23875],[.26875,.24875],[.27875,.25375],[.2925,.25875],[.30625,.26125],[.32125,.25875],[.32875,.255],[.3375,.24875],[.3425,.24125],[.34125,.23125],[.32875,.22],[.31875,.215],[.3025,.21],[.2925,.20875],[.2825,.2125],[.28125,.225],[.28875,.23375],[.2975,.23625],[.30875,.2375],[.315,.23375],[.315,.2275],[.31125,.2225],[.305,.22],[.29875,.22125],[.29625,.225],[.29625,.22625]],je=function(e){var t=[e.targetTouches[0].clientX,e.targetTouches[0].clientY];ge(t[0],t[1])},pe=function(e){var t=[e.clientX,e.clientY];ge(t[0],t[1])},me=function(){return Object(r.useEffect)((function(){for(var e=!0,t=[window.innerWidth,window.innerHeight],n=t[0],i=t[1],a=n<i?i:n,r=[],c=we.map((function(e){var t=Object(f.a)(e,2),r=t[0],c=t[1];return[r*(a/2e3*900)+n/2-a/2e3*450,c*(a/2e3*900)+i/2-a/2e3*500]})),o=0;o<c.length-1;o++)r.push([c[o],c[o+1]]);var l=O(),s=new j.c,d=ie("Click to move line").container;d.x=Math.round(window.innerWidth/2-d.width/2),d.y=60,l.stage.addChild(s);var h=[[Math.round(n/2),Math.round(i/2)],[n,Math.round(i/2)]],u=ie("(".concat(h[0],")")).container,b=ie("(".concat(h[1],")")).container;l.stage.addChild(u),l.stage.addChild(b),l.stage.addChild(d),window.removeEventListener("touchstart",je),window.removeEventListener("click",pe),window.addEventListener("touchstart",je),window.addEventListener("click",pe),ge=function(t,n){h[1][0]=t,h[1][1]=n,e=!0},S((function(){var t,n;if(e){var i,a=[],c=Object(w.a)(r);try{for(c.s();!(i=c.n()).done;){var o=i.value,l=be(h,o);l>=0&&l<=1&&a.push([h[0][0]+(h[1][0]-h[0][0])*l,h[0][1]+(h[1][1]-h[0][1])*l])}}catch(d){c.e(d)}finally{c.f()}s.clear(),K(s,r,{width:2,color:5592405,cap:j.d.ROUND}),K(s,[h],{width:1,color:39168}),B(s,h,1,16711680),B(s,a,3,16755302),(t=u.position).set.apply(t,Object(v.a)(h[0])),(n=b.position).set.apply(n,Object(v.a)(h[1])),e=!1}}))}),[]),Object(M.jsx)(M.Fragment,{})},xe=function(){var e=Object(r.useState)(0),t=Object(f.a)(e,2),n=t[0],i=t[1],a=Object(r.useState)(""),c=Object(f.a)(a,2),o=c[0],l=c[1],s=Object(r.useState)(!1),d=Object(f.a)(s,2),v=d[0],w=d[1];return Object(r.useEffect)((function(){Object(u.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(!1),O(),e.next=4,x((function(e,t){i(Math.round(100*e)),l(t)}));case 4:w(!0);case 5:case"end":return e.stop()}}),e)})))()}),[]),Object(M.jsx)(M.Fragment,{children:Object(M.jsxs)(g.a,{style:{height:"100%"},children:[Object(M.jsxs)(g.a,{id:"content",children:[v&&Object(M.jsx)(b.a,{exact:!0,path:"/",component:Y}),v&&Object(M.jsx)(b.a,{exact:!0,path:"/cave-generate",component:R}),v&&Object(M.jsx)(b.a,{exact:!0,path:"/cave-generate-texture",component:N}),v&&Object(M.jsx)(b.a,{exact:!0,path:"/liquid-simulation",component:ne}),v&&Object(M.jsx)(b.a,{exact:!0,path:"/liquid-simulation-2",component:se}),v&&Object(M.jsx)(b.a,{exact:!0,path:"/liquid-stress-test",component:fe}),v&&Object(M.jsx)(b.a,{exact:!0,path:"/line-intersection",component:ve}),v&&Object(M.jsx)(b.a,{exact:!0,path:"/line-intersection-2",component:me}),Object(M.jsx)(k,{})]}),Object(M.jsx)(I,{hide:v,asset:o,percentage:n}),Object(M.jsx)(T,{})]})})};n(319);l.a.render(Object(M.jsx)(c.a.StrictMode,{children:Object(M.jsx)(s.a,{children:Object(M.jsx)(xe,{})})}),document.getElementById("root"))}},[[320,1,2]]]);
//# sourceMappingURL=main.cb7506d4.chunk.js.map