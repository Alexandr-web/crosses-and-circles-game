!function(e){var t={};function r(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(s,i,function(t){return e[t]}.bind(null,i));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){(()=>{const e=document.querySelector(".wrapper__list"),t=document.querySelectorAll(".wrapper__results-item-block[data-figure]"),r=document.querySelector(".wrapper__info span"),s=document.querySelector(".wrapper__move span"),i=document.querySelector(".wrapper__btn-reset"),n=document.querySelector(".wrapper__main-block"),c=document.querySelectorAll(".wrapper__main-block-back-statistic-item-block"),o=document.querySelector(".wrapper__show-statistic-btn");let a=!1,l="",u={cross:{win:0,lose:0},circle:{win:0,lose:0},draw:0};localStorage.getItem("points")&&(u=JSON.parse(localStorage.getItem("points")),m(),g());for(let t=0;t<3;t++)for(let r=0;r<3;r++){const s=document.createElement("li");s.classList.add("wrapper__list-item"),s.dataset.num=r,s.dataset.column=t,s.dataset.figure="",e.appendChild(s)}const f=document.querySelectorAll(".wrapper__list-item");function d(e){e&&f.forEach(e=>{e.innerHTML="",e.dataset.figure=""}),function(e){"cross"===e?(u.cross.win++,u.circle.lose++,r.innerHTML="Победил крестик!",setTimeout(()=>{r.innerHTML="Идет игра"},1500)):"circle"===e&&(u.circle.win++,u.cross.lose++,r.innerHTML="Победил нолик!",setTimeout(()=>{r.innerHTML="Идет игра"},1500));g(),p(),localStorage.setItem("points",JSON.stringify(u))}(e),m()}function p(){const e=document.querySelectorAll(".wrapper__results-item");u.cross.win>u.circle.win?(e[0].classList.add("win"),e[1].classList.remove("win"),e[0].classList.remove("lose"),e[1].classList.add("lose")):u.cross.win<u.circle.win?(e[0].classList.remove("win"),e[1].classList.add("win"),e[0].classList.add("lose"),e[1].classList.remove("lose")):(e[0].classList.remove("win"),e[1].classList.remove("win"),e[0].classList.remove("lose"),e[1].classList.remove("lose"))}function m(){t.forEach(e=>{const t=e.dataset.figure;"cross"===t?e.innerHTML=u.cross.win:"circle"===t&&(e.innerHTML=u.circle.win)})}function g(){c.forEach(e=>{const t=e.dataset.statistic;if("wins"===t){const t=Array.from(Object.values(u)).reduce((e,t)=>("object"==typeof t&&(e+=t.win),e),0);e.innerHTML=t}if("lose"===t){const t=Array.from(Object.values(u)).reduce((e,t)=>("object"==typeof t&&(e+=t.lose),e),0);e.innerHTML=t}"draw"===t&&(e.innerHTML=u.draw)})}f.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.num,i=e.dataset.column;e.dataset.figure||(a=!a,function(e){l=a?"cross":"circle",a?(e.innerHTML='<span class="cross-big"></span>',s.classList.remove("cross"),s.classList.add("circle")):(e.innerHTML='<span class="circle-big"></span>',s.classList.add("cross"),s.classList.remove("circle"))}(e),e.dataset.figure=l);const n=e.dataset.figure,c={1:{count:0,func(){if(this.count=[...f].filter(e=>{if(e.dataset.column===i&&e.dataset.figure===n)return e}).length,this.count>2)return d(n)}},2:{count:0,func(){if(this.count=[...f].filter(e=>{if(e.dataset.num===t&&e.dataset.figure===n)return e}).length,this.count>2)return d(n)}},3:{figure:n,func(){if(this.figure=f[0].dataset.figure,this.figure&&f[4].dataset.figure===this.figure&&f[8].dataset.figure===this.figure)return d(n)}},4:{figure:n,func(){if(this.figure=f[2].dataset.figure,this.figure&&f[4].dataset.figure===this.figure&&f[6].dataset.figure===this.figure)return d(n)}}};for(let e in c)c[e].func();[...f].every(e=>e.dataset.figure)&&(u.draw++,r.innerHTML="Ничья!",setTimeout(()=>{r.innerHTML="Идет игра"},1500),f.forEach(e=>{e.innerHTML="",e.dataset.figure=""}),localStorage.setItem("points",JSON.stringify(u)),p(),m())})}),p(),i.addEventListener("click",()=>{u={cross:{win:0,lose:0},circle:{win:0,lose:0},draw:0},m(),g(),p(),localStorage.setItem("points",JSON.stringify(u))}),o.addEventListener("click",()=>{n.classList.toggle("rotate-y")}),g()})()}]);