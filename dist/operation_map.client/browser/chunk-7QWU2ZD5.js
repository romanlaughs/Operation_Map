import{b as _e,g as _,i as X,l as ve,m as be,s as J,t as ye}from"./chunk-TQY73KEU.js";import{$ as O,$b as A,Bb as G,Ga as Y,Hb as j,Ia as y,Ja as z,La as u,Na as D,Sb as ue,Ta as l,Tb as pe,Ua as c,Wa as W,X as f,Xa as Q,Y as le,Yb as ge,Za as M,_ as de,aa as h,ab as R,ba as w,ca as ce,cb as d,ea as N,fa as v,ga as b,ja as me,kb as p,lb as m,ma as E,mb as S,nb as I,ob as he,tb as P,wa as o,xa as C,za as fe,zb as Z}from"./chunk-NZE57U5H.js";var re=(()=>{let t=class t{constructor(n){this.template=n}};t.\u0275fac=function(a){return new(a||t)(C(fe))},t.\u0275dir=w({type:t,selectors:[["","cdkCellDef",""]],standalone:!0});let i=t;return i})();var Re=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=h({type:t}),t.\u0275inj=f({imports:[be]});let i=t;return i})();var Mt=(()=>{let t=class t extends re{};t.\u0275fac=(()=>{let n;return function(r){return(n||(n=me(t)))(r||t)}})(),t.\u0275dir=w({type:t,selectors:[["","matCellDef",""]],standalone:!0,features:[P([{provide:re,useExisting:t}]),Y]});let i=t;return i})();var Ft=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=h({type:t}),t.\u0275inj=f({imports:[_,Re,_]});let i=t;return i})();function Pe(i,t){if(i&1){let e=M();l(0,"a",12),R("keyup.enter",function(){v(e),d(3);let a=p(1);return b(a.previous())})("click",function(){v(e),d(3);let a=p(1);return b(a.previous())}),m(1),l(2,"span",13),m(3),c()()}if(i&2){let e=d(3);o(),I(" ",e.previousLabel," "),o(2),S(e.screenReaderPageLabel)}}function Ae(i,t){if(i&1&&(l(0,"span",14),m(1),l(2,"span",13),m(3),c()()),i&2){let e=d(3);o(),I(" ",e.previousLabel," "),o(2),S(e.screenReaderPageLabel)}}function Le(i,t){if(i&1&&(l(0,"li",9),y(1,Pe,4,2,"a",10)(2,Ae,4,2,"span",11),c()),i&2){d(2);let e=p(1);D("disabled",e.isFirstPage()),o(),u("ngIf",1<e.getCurrent()),o(),u("ngIf",e.isFirstPage())}}function Ne(i,t){if(i&1){let e=M();l(0,"a",12),R("keyup.enter",function(){v(e);let a=d().$implicit;d(2);let r=p(1);return b(r.setCurrent(a.value))})("click",function(){v(e);let a=d().$implicit;d(2);let r=p(1);return b(r.setCurrent(a.value))}),l(1,"span",13),m(2),c(),l(3,"span"),m(4),Z(5,"number"),c()()}if(i&2){let e=d().$implicit,n=d(2);o(2),I("",n.screenReaderPageLabel," "),o(2),S(e.label==="..."?e.label:G(5,2,e.label,""))}}function ze(i,t){if(i&1&&(W(0),l(1,"span",16)(2,"span",13),m(3),c(),l(4,"span"),m(5),Z(6,"number"),c()(),Q()),i&2){let e=d().$implicit,n=d(2);o(3),I("",n.screenReaderCurrentLabel," "),o(2),S(e.label==="..."?e.label:G(6,2,e.label,""))}}function je(i,t){if(i&1&&(l(0,"li"),y(1,Ne,6,5,"a",10)(2,ze,7,5,"ng-container",15),c()),i&2){let e=t.$implicit;d(2);let n=p(1);D("current",n.getCurrent()===e.value)("ellipsis",e.label==="..."),o(),u("ngIf",n.getCurrent()!==e.value),o(),u("ngIf",n.getCurrent()===e.value)}}function Be(i,t){if(i&1){let e=M();l(0,"a",12),R("keyup.enter",function(){v(e),d(3);let a=p(1);return b(a.next())})("click",function(){v(e),d(3);let a=p(1);return b(a.next())}),m(1),l(2,"span",13),m(3),c()()}if(i&2){let e=d(3);o(),I(" ",e.nextLabel," "),o(2),S(e.screenReaderPageLabel)}}function He(i,t){if(i&1&&(l(0,"span",14),m(1),l(2,"span",13),m(3),c()()),i&2){let e=d(3);o(),I(" ",e.nextLabel," "),o(2),S(e.screenReaderPageLabel)}}function Ve(i,t){if(i&1&&(l(0,"li",17),y(1,Be,4,2,"a",10)(2,He,4,2,"span",11),c()),i&2){d(2);let e=p(1);D("disabled",e.isLastPage()),o(),u("ngIf",!e.isLastPage()),o(),u("ngIf",e.isLastPage())}}function qe(i,t){if(i&1&&(l(0,"ul",4),y(1,Le,3,4,"li",5),l(2,"li",6),m(3),c(),y(4,je,3,6,"li",7)(5,Ve,3,4,"li",8),c()),i&2){let e=d(),n=p(1);D("responsive",e.responsive),o(),u("ngIf",e.directionLinks),o(2),he(" ",n.getCurrent()," / ",n.getLastPage()," "),o(),u("ngForOf",n.pages)("ngForTrackBy",e.trackByIndex),o(),u("ngIf",e.directionLinks)}}var B=class{constructor(){this.change=new E,this.instances={},this.DEFAULT_ID="DEFAULT_PAGINATION_ID"}defaultId(){return this.DEFAULT_ID}register(t){return t.id==null&&(t.id=this.DEFAULT_ID),this.instances[t.id]?this.updateInstance(t):(this.instances[t.id]=t,!0)}updateInstance(t){let e=!1;for(let n in this.instances[t.id])t[n]!==this.instances[t.id][n]&&(this.instances[t.id][n]=t[n],e=!0);return e}getCurrentPage(t){return this.instances[t]?this.instances[t].currentPage:1}setCurrentPage(t,e){if(this.instances[t]){let n=this.instances[t],a=Math.ceil(n.totalItems/n.itemsPerPage);e<=a&&1<=e&&(this.instances[t].currentPage=e,this.change.emit(t))}}setTotalItems(t,e){this.instances[t]&&0<=e&&(this.instances[t].totalItems=e,this.change.emit(t))}setItemsPerPage(t,e){this.instances[t]&&(this.instances[t].itemsPerPage=e,this.change.emit(t))}getInstance(t=this.DEFAULT_ID){return this.instances[t]?this.clone(this.instances[t]):{}}clone(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}},We=Number.MAX_SAFE_INTEGER,Wt=(()=>{class i{constructor(e){this.service=e,this.state={}}transform(e,n){if(!(e instanceof Array)){let F=n.id||this.service.defaultId();return this.state[F]?this.state[F].slice:e}let a=n.totalItems&&n.totalItems!==e.length,r=this.createInstance(e,n),s=r.id,g,x,k=r.itemsPerPage,V=this.service.register(r);if(!a&&e instanceof Array){if(k=+k||We,g=(r.currentPage-1)*k,x=g+k,this.stateIsIdentical(s,e,g,x))return this.state[s].slice;{let q=e.slice(g,x);return this.saveState(s,e,q,g,x),this.service.change.emit(s),q}}else return V&&this.service.change.emit(s),this.saveState(s,e,e,g,x),e}createInstance(e,n){return this.checkConfig(n),{id:n.id!=null?n.id:this.service.defaultId(),itemsPerPage:+n.itemsPerPage||0,currentPage:+n.currentPage||1,totalItems:+n.totalItems||e.length}}checkConfig(e){let a=["itemsPerPage","currentPage"].filter(r=>!(r in e));if(0<a.length)throw new Error(`PaginatePipe: Argument is missing the following required properties: ${a.join(", ")}`)}saveState(e,n,a,r,s){this.state[e]={collection:n,size:n.length,slice:a,start:r,end:s}}stateIsIdentical(e,n,a,r){let s=this.state[e];return!s||!(s.size===n.length&&s.start===a&&s.end===r)?!1:s.slice.every((x,k)=>x===n[a+k])}}return i.\u0275fac=function(e){return new(e||i)(C(B,16))},i.\u0275pipe=ce({name:"paginate",type:i,pure:!1}),i})();var Qe=(()=>{class i{constructor(e,n){this.service=e,this.changeDetectorRef=n,this.maxSize=7,this.pageChange=new E,this.pageBoundsCorrection=new E,this.pages=[],this.changeSub=this.service.change.subscribe(a=>{this.id===a&&(this.updatePageLinks(),this.changeDetectorRef.markForCheck(),this.changeDetectorRef.detectChanges())})}ngOnInit(){this.id===void 0&&(this.id=this.service.defaultId()),this.updatePageLinks()}ngOnChanges(e){this.updatePageLinks()}ngOnDestroy(){this.changeSub.unsubscribe()}previous(){this.checkValidId(),this.setCurrent(this.getCurrent()-1)}next(){this.checkValidId(),this.setCurrent(this.getCurrent()+1)}isFirstPage(){return this.getCurrent()===1}isLastPage(){return this.getLastPage()===this.getCurrent()}setCurrent(e){this.pageChange.emit(e)}getCurrent(){return this.service.getCurrentPage(this.id)}getLastPage(){let e=this.service.getInstance(this.id);return e.totalItems<1?1:Math.ceil(e.totalItems/e.itemsPerPage)}getTotalItems(){return this.service.getInstance(this.id).totalItems}checkValidId(){this.service.getInstance(this.id).id==null&&console.warn(`PaginationControlsDirective: the specified id "${this.id}" does not match any registered PaginationInstance`)}updatePageLinks(){let e=this.service.getInstance(this.id),n=this.outOfBoundCorrection(e);n!==e.currentPage?setTimeout(()=>{this.pageBoundsCorrection.emit(n),this.pages=this.createPageArray(e.currentPage,e.itemsPerPage,e.totalItems,this.maxSize)}):this.pages=this.createPageArray(e.currentPage,e.itemsPerPage,e.totalItems,this.maxSize)}outOfBoundCorrection(e){let n=Math.ceil(e.totalItems/e.itemsPerPage);return n<e.currentPage&&0<n?n:e.currentPage<1?1:e.currentPage}createPageArray(e,n,a,r){r=+r;let s=[],g=Math.max(Math.ceil(a/n),1),x=Math.ceil(r/2),k=e<=x,V=g-x<e,F=!k&&!V,q=r<g,T=1;for(;T<=g&&T<=r;){let K,se=this.calculatePageNumber(T,e,r,g),Ie=T===2&&(F||V),Ee=T===r-1&&(F||k);q&&(Ie||Ee)?K="...":K=se,s.push({label:K,value:se}),T++}return s}calculatePageNumber(e,n,a,r){let s=Math.ceil(a/2);return e===a?r:e===1?e:a<r?r-s<n?r-a+e:s<n?n-s+e:e:e}}return i.\u0275fac=function(e){return new(e||i)(C(B),C(j))},i.\u0275dir=w({type:i,selectors:[["pagination-template"],["","pagination-template",""]],inputs:{id:"id",maxSize:"maxSize"},outputs:{pageChange:"pageChange",pageBoundsCorrection:"pageBoundsCorrection"},exportAs:["paginationApi"],features:[N]}),i})();function oe(i){return!!i&&i!=="false"}var Qt=(()=>{class i{constructor(){this.maxSize=7,this.previousLabel="Previous",this.nextLabel="Next",this.screenReaderPaginationLabel="Pagination",this.screenReaderPageLabel="page",this.screenReaderCurrentLabel="You're on page",this.pageChange=new E,this.pageBoundsCorrection=new E,this._directionLinks=!0,this._autoHide=!1,this._responsive=!1}get directionLinks(){return this._directionLinks}set directionLinks(e){this._directionLinks=oe(e)}get autoHide(){return this._autoHide}set autoHide(e){this._autoHide=oe(e)}get responsive(){return this._responsive}set responsive(e){this._responsive=oe(e)}trackByIndex(e){return e}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=O({type:i,selectors:[["pagination-controls"]],inputs:{id:"id",maxSize:"maxSize",directionLinks:"directionLinks",autoHide:"autoHide",responsive:"responsive",previousLabel:"previousLabel",nextLabel:"nextLabel",screenReaderPaginationLabel:"screenReaderPaginationLabel",screenReaderPageLabel:"screenReaderPageLabel",screenReaderCurrentLabel:"screenReaderCurrentLabel"},outputs:{pageChange:"pageChange",pageBoundsCorrection:"pageBoundsCorrection"},decls:4,vars:4,consts:[["p","paginationApi"],[3,"pageChange","pageBoundsCorrection","id","maxSize"],["role","navigation"],["class","ngx-pagination",3,"responsive",4,"ngIf"],[1,"ngx-pagination"],["class","pagination-previous",3,"disabled",4,"ngIf"],[1,"small-screen"],[3,"current","ellipsis",4,"ngFor","ngForOf","ngForTrackBy"],["class","pagination-next",3,"disabled",4,"ngIf"],[1,"pagination-previous"],["tabindex","0",3,"keyup.enter","click",4,"ngIf"],["aria-disabled","true",4,"ngIf"],["tabindex","0",3,"keyup.enter","click"],[1,"show-for-sr"],["aria-disabled","true"],[4,"ngIf"],["aria-live","polite"],[1,"pagination-next"]],template:function(e,n){if(e&1){let a=M();l(0,"pagination-template",1,0),R("pageChange",function(s){return v(a),b(n.pageChange.emit(s))})("pageBoundsCorrection",function(s){return v(a),b(n.pageBoundsCorrection.emit(s))}),l(2,"nav",2),y(3,qe,6,8,"ul",3),c()()}if(e&2){let a=p(1);u("id",n.id)("maxSize",n.maxSize),o(2),z("aria-label",n.screenReaderPaginationLabel),o(),u("ngIf",!(n.autoHide&&a.pages.length<=1))}},dependencies:[Qe,pe,ue,ge],styles:[`.ngx-pagination{margin-left:0;margin-bottom:1rem}.ngx-pagination:before,.ngx-pagination:after{content:" ";display:table}.ngx-pagination:after{clear:both}.ngx-pagination li{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;margin-right:.0625rem;border-radius:0}.ngx-pagination li{display:inline-block}.ngx-pagination a,.ngx-pagination button{color:#0a0a0a;display:block;padding:.1875rem .625rem;border-radius:0}.ngx-pagination a:hover,.ngx-pagination button:hover{background:#e6e6e6}.ngx-pagination .current{padding:.1875rem .625rem;background:#2199e8;color:#fefefe;cursor:default}.ngx-pagination .disabled{padding:.1875rem .625rem;color:#cacaca;cursor:default}.ngx-pagination .disabled:hover{background:transparent}.ngx-pagination a,.ngx-pagination button{cursor:pointer}.ngx-pagination .pagination-previous a:before,.ngx-pagination .pagination-previous.disabled:before{content:"\\ab";display:inline-block;margin-right:.5rem}.ngx-pagination .pagination-next a:after,.ngx-pagination .pagination-next.disabled:after{content:"\\bb";display:inline-block;margin-left:.5rem}.ngx-pagination .show-for-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.ngx-pagination .small-screen{display:none}@media screen and (max-width: 601px){.ngx-pagination.responsive .small-screen{display:inline-block}.ngx-pagination.responsive li:not(.small-screen):not(.pagination-previous):not(.pagination-next){display:none}}
`],encapsulation:2,changeDetection:0}),i})(),Ut=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=h({type:i}),i.\u0275inj=f({providers:[B],imports:[[A]]}),i})();var H=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=h({type:t}),t.\u0275inj=f({imports:[_,A,_e,_]});let i=t;return i})();var Ge=new le("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let i=de(J);return()=>i.scrollStrategies.reposition()}});function Xe(i){return()=>i.scrollStrategies.reposition()}var Je={provide:Ge,deps:[J],useFactory:Xe};var Ai=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=h({type:t}),t.\u0275inj=f({providers:[Je],imports:[A,ye,X,_,ve,H,X,_]});let i=t;return i})();var Se=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=h({type:t}),t.\u0275inj=f({});let i=t;return i})();var Hi=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=h({type:t}),t.\u0275inj=f({imports:[_,H,H,Se,_]});let i=t;return i})();export{Mt as a,Ft as b,H as c,Ai as d,Hi as e,Wt as f,Qt as g,Ut as h};
