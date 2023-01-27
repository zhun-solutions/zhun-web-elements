 import home from '../../../../../../../public/static/js/views/basic-info/home';
import {_render} from './zwe-app-base-render'
import { ZweAppBaseRouter } from './zwe-app-base-router';
 import contact  from '../../../../../../../public/static/js/views/basic-info/contact';
import aboutus  from '../../../../../../../public/static/js/views/basic-info/aboutus';
import abstractRouteView from '../../../../../../../public/static/js/views/abstract-route-view';
 export class ZweAppBase extends HTMLElement {
    routerviewprot;

   routes= new Map();
   match;
     constructor(){
        super();
        
        this.shadow=this.attachShadow({mode:"open"});
         this.initRoutesHashed();
        this.router=new ZweAppBaseRouter(false,this.routes,this);
      
      }
    
    
      initRoutesHashed(){
        let attrmap=new Map();
        attrmap.set("slot","app-base");
        attrmap.set("metadatakId","caas");
        attrmap.set("id","corehome")
        this.routes.set("/home",{path:"/home", tagname:"zwe-home", view :abstractRouteView,attrs:attrmap });
      this.routes.set("/default",{path:"/home", tagname:"zwe-home",view :abstractRouteView,slot:"app-base",attrs:attrmap });
       this.routes.set("#aboutus",{path:"#aboutus", view :aboutus,slot:"app-base"});       
      this.routes.set("#contactus",{path:"#contactus", view :contact,slot:"app-base"});       
      this.routes.set("/dashboard",{path:"/dashboard", tagname:"zwe-render-slot",view :abstractRouteView,slot:"app-base",attrs:attrmap });
      
  }
    connectedCallback(){ 
      this.render();
      // alert( "after render of appbase:");
      this.enablereroute();
          
       } 

      render(){
      
       _render(this);  
   
     }  

     enablereroute=()=>{
//console.log("UnderEnableRoute of ZweAppbase: passing true to enablepopstate");
       this.router.enablePopState();//this can be by default called for any router that is initilized 
       this.router.executeRoute();
       this.shadow.addEventListener("click", e=>{
        if(e.target.matches("[data-link]")){
       alert("zwe appbase under e of data link"+e.target);
          e.preventDefault();
          e.stopPropagation();
          this.router.navigtTo(e.target.href,true);
        }
      })
     }
  renderRoute= async (match)=>{ 
      if(match.pathdefaulted){
        //since path is defaulted , location path should be changed to defaulted value.
       this.router.navigtTo(match.route.path,null);
   }
//console.log("new match value is")
//console.log(match);
   const view=new match.route.view(this.router.getParams(match));
//console.log("match.route.attrs to be passed are");
//console.log(match.route.attrs);
//console.log("subroutes in render are")
//console.log(match.subroute);
  // let attrs2p=match.route.attrs;
  if(match.subroute!==null){
   match.route.attrs.set("subroute",match.subroute);
  }
//console.log("match-route-attrs-set are:");
//console.log(match.route.attrs);
     this.shadowRoot.querySelector("[name='app-base']").innerHTML=await view.getHtml(match.route.tagname,match.route.attrs);

     }
     disconnectedCallback(){
//console.log("call under disconnected callback");
       this.router.disablePopState();
       this.shadow.removeEventListener(click);
     }
}
customElements.define('zwe-app-base',ZweAppBase)
