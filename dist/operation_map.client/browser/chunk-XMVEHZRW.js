import{b as A,c as y,d as L}from"./chunk-GR2IEN4H.js";import{$ as m,$b as u,Bb as g,La as h,Qa as _,Ra as E,Sa as P,Ta as r,Ua as o,Va as l,Xb as v,Za as k,_b as M,ab as j,cb as D,fa as b,ga as w,ha as C,lb as c,mb as F,mc as T,nb as x,nc as B,qc as V,ub as p,wa as s,wb as I,xa as S,zb as f}from"./chunk-NZE57U5H.js";var N=(()=>{let t=class t{constructor(){this.user={firstName:"",lastName:"",email:""},this.time=new Date}ngOnInit(){this.intervalId=setInterval(()=>{this.time=new Date},1e3)}ngOnDestroy(){clearInterval(this.intervalId)}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=m({type:t,selectors:[["app-top-default-card"]],standalone:!0,features:[p],decls:24,vars:5,consts:[[1,"card","welcome-banner"],[1,"card-header","p-0","card-no-border"],[1,"welcome-card"],["src","assets/images/dashboard-1/welcome-bg.png",1,"w-100","img-fluid"],["src","assets/images/dashboard-1/img-1.png",1,"position-absolute","img-1","img-fluid"],["src","assets/images/dashboard-1/img-2.png",1,"position-absolute","img-2","img-fluid"],["src","assets/images/dashboard-1/img-3.png",1,"position-absolute","img-3","img-fluid"],["src","assets/images/dashboard-1/img-4.png",1,"position-absolute","img-4","img-fluid"],["src","assets/images/dashboard-1/img-5.png",1,"position-absolute","img-5","img-fluid"],[1,"card-body"],[1,"d-flex","align-center"],["src","assets/images/dashboard-1/hand.png","alt","hand"],[1,"d-flex","align-center","justify-content-between"],["href","",1,"btn","btn-pill","btn-primary"],[1,"stroke-icon"],["href","assets/svg/icon-sprite.svg#watch"]],template:function(e,a){e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2),l(3,"img",3)(4,"img",4)(5,"img",5)(6,"img",6)(7,"img",7)(8,"img",8),o()(),r(9,"div",9)(10,"div",10)(11,"h1"),c(12),l(13,"img",11),o()(),r(14,"p"),c(15,"Welcome back! Let\u2019s start from where you left"),o(),r(16,"div",12)(17,"a",13),c(18,"Whats New!"),o(),r(19,"span"),C(),r(20,"svg",14),l(21,"use",15),o(),c(22),f(23,"date"),o()()()()),e&2&&(s(12),x(" Hello, ",a.user.firstName," "),s(10),x("",g(23,2,a.time,"hh:mm:ss a")," "))},dependencies:[u,v]});let n=t;return n})();var H=n=>["/project/overview/",n];function z(n,t){if(n&1){let d=k();r(0,"li",6)(1,"div",7)(2,"a",8)(3,"h6",9),c(4),o()(),r(5,"p",10),c(6),f(7,"date"),o()(),r(8,"div")(9,"button",11),j("click",function(){let e=b(d).$implicit,a=D();return w(a.updateProjectStatus(e.id,1))}),l(10,"app-feather-icon",12),o(),r(11,"button",13),j("click",function(){let e=b(d).$implicit,a=D();return w(a.deleteProject(e.id))}),l(12,"app-feather-icon",12),o()()()}if(n&2){let d=t.$implicit;s(2),h("routerLink",I(8,H,d.id)),s(2),F(d.name),s(2),x(" Date: ",g(7,5,d.startDate,"shortDate")," "),s(4),h("icon","thumbs-up"),s(2),h("icon","thumbs-down")}}var W=(()=>{let t=class t{constructor(i,e){this.router=i,this.projectService=e,this.projects=[],this.email=y.getEmail()}ngOnInit(){this.getAllProjects(this.email)}getAllProjects(i,e=0){this.projectService.getProjects(i,e).subscribe(a=>{this.projects=a.sort(($,q)=>new Date(q.startDate).getTime()-new Date($.startDate).getTime()).slice(0,4)},a=>{console.error("Error fetching projects:",a)})}updateProjectStatus(i,e){i&&this.projectService.updateProjectStatus(this.email,i,e).subscribe(()=>{this.router.navigate(["/project/list"])})}deleteProject(i){confirm("Are you sure you want to delete this project?")&&i&&this.projectService.deleteProject(this.email,i).subscribe(()=>{this.router.navigate(["/dashboard/default"])})}goToProjectOverview(i){y.setProjectID(i),this.router.navigate(["/project/overview",i])}};t.\u0275fac=function(e){return new(e||t)(S(T),S(L))},t.\u0275cmp=m({type:t,selectors:[["app-dashboard-bids"]],standalone:!0,features:[p],decls:10,vars:3,consts:[[1,"card","height-equal"],[1,"card-header","card-no-border","pb-0"],[1,"header-top"],[1,"fs-4","f-w-700"],[1,"card-body","news-update"],[1,"mb-4"],[1,"d-flex","gap-2"],[1,"flex-grow-1"],[3,"routerLink"],[1,"fs-5","f-w-500"],[1,"text-truncate"],[1,"btn","btn-primary","me-3",3,"click"],[3,"icon"],[1,"btn","btn-danger",3,"click"]],template:function(e,a){e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2)(3,"h3",3),c(4,"Outstanding Bids"),o()()(),r(5,"div",4)(6,"ul",5),E(7,z,13,10,"li",6,_),f(9,"slice"),o()()()),e&2&&(s(7),P(g(9,0,a.projects,-4)))},dependencies:[u,M,v,A,V,B]});let n=t;return n})();var R=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=m({type:t,selectors:[["app-default"]],standalone:!0,features:[p],decls:16,vars:0,consts:[[1,"container-fluid","default-dashboard"],[1,"row"],[1,"col-xl-4","proorder-xxl-1","col-sm-6","box-col-6"],[1,"col-xxl-3","col-xl-4","proorder-xxl-2","col-sm-6","box-col-6"],[1,"col-xxl-5","col-xl-6","proorder-xxl-7","col-lg-12","box-col-12"],[1,"col-xxl-6","col-xl-8","proorder-xxl-8","col-lg-12","col-md-6","box-col-7"],[1,"col-xxl-3","col-xl-4","proorder-xxl-9","col-md-6","box-col-5"],[1,"col-xxl-3","col-xl-4","proorder-xxl-3","col-md-6","box-col-6"],[1,"col-xxl-3","col-xl-4","proorder-xxl-12","col-md-6","box-col-6"],[1,"col-lg-6","proorder-xxl-6","box-col-12"],[1,"col-xxl-3","col-xl-5","proorder-xxl-4","col-md-6","box-col-6"],[1,"col-xxl-3","col-xl-4","proorder-xxl-10","col-md-6","box-col-6"],[1,"col-xxl-3","col-xl-4","proorder-xxl-11","col-md-6","box-col-6"],[1,"col-xxl-6","col-xl-7","proorder-xxl-5","col-md-6","box-col-6"]],template:function(e,a){e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2),l(3,"app-top-default-card"),o(),r(4,"div",3),l(5,"app-dashboard-bids"),o(),l(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"div",8)(11,"div",9)(12,"div",10)(13,"div",11)(14,"div",12)(15,"div",13),o()())},dependencies:[u,N,W]});let n=t;return n})();var le=[{path:"",children:[{path:"default",component:R,data:{title:"Welcome to MAP",breadcrumb:"Default",des:"Welcome back! Let's start from where you left"}}]}];export{le as dashboard};
