  import {_render} from './zwe-home-render.js'
 import { home_layout, home_menu_bar_navs } from '../../../std/elements/templates/data/template-data.js';
import { ZweAppBaseRouter } from '../app/base/zwe-app-base-router.js';
import products from '../../../../../../public/static/js/views/work/products.js';
import abstractRouteView from '../../../../../../public/static/js/views/abstract-route-view';
import home from '../../../../../../public/static/js/views/basic-info/home.js';
import aboutus from '../../../../../../public/static/js/views/basic-info/aboutus.js';
import contact from '../../../../../../public/static/js/views/basic-info/contact.js';
import { Item, ItemData } from '../../../../../zhun-data-elements/zhun-data-elements';
import { ItemService } from '../../../../../zhun-store-adapter/firestore-adapter/item.service.js';
export class ZweHome extends HTMLElement{

    routerviewprot;

    routes= new Map();
    match;
       
  subroteonrender=null;
    routeItem;
      navbmdItm=home_menu_bar_navs();
      layomditm=home_layout();
       constructor(){
        super(); 
        
        this.shadow=this.attachShadow({mode:"open"});
        this.initRoutesHashed();
        let sroute=this.getAttribute("subroute");
//console.log("SRoute in homeconstruction is");
           this.subroteonrender=sroute;
//console.log(this.subroteonrender);
        this.router=new ZweAppBaseRouter(true,this.routes,this);
      
    } 
   

    initRoutesHashed(){
        let attrmap=new Map();
        this.routes.set("/products#:productid",{path:"/products#:productid", view :products });       
        this.routes.set("/default",{path:"/home", view :home,slot:"app-base" });
        this.routes.set("/manage-trainings",{path:"/manage-trainings", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Manage Trainings" });
        this.routes.set("/manage-product-domain-md",{path:"/manage-product-domain-md", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product Domain" });
    
    /*
 
    */
  this.routes.set("/manage-product-sub-domain-md",{path:"/manage-product-sub-domain-md", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product Sub Domain" });
  this.routes.set("/manage-product-category-md",{path:"/manage-product-category-md", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product Category" });
  this.routes.set("/manage-product-sub-category-md",{path:"/manage-product-sub-category-md", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product Sub Category" });
  this.routes.set("/manage-product-type-md",{path:"/manage-product-type-md", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product Type" });
  this.routes.set("/manage-product-attribute-md",{path:"/manage-product-attribute-md", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product Attribute" });
  this.routes.set("/manage-product-md",{path:"/manage-product-md", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product" });
  this.routes.set("/manage-product-variant-md",{path:"/manage-product-variant-md", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product Variant" });
  this.routes.set("/manage-product",{path:"/manage-product", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Product" });
  this.routes.set("/manage-product",{path:"/manage-products", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Upload Products" });


        this.routes.set("/manage-mentors",{path:"/manage-mentors", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Manage Mentors" });
        this.routes.set("/manage-metadata",{path:"/manage-metadata", tagname:"zwe-tab-layout", view :abstractRouteView,attrs:attrmap,rekey:"Manage Metadata" });
      
       this.routes.set("/products",{path:"/products", view :products,attrs:attrmap });       
      //  this.routes.set("#home#:products#:productid",{path:"#home#:products#:productid", view :products });       
      this.routes.set("#aboutus",{path:"#home#aboutus", view :aboutus,slot:"app-base"});       
      this.routes.set("#contactus",{path:"#home#contactus", view :contact,slot:"app-base"});       
      
  }



  
    connectedCallback(){ 
        zhun_web_metadata_fiber.subscribe("route-clicked",this.renderRoutes); 
         this.router.enablePopState(false); 
        _render(this); 
          //  console.log("data received in zwe home is:");
          //   console.log(data);
              //  this.navbmdItm= data.getRelElementOnType("RNDR_MDT","nav");
                
              //  this.navbmdItm= data.getRelElementOnType("RNDR_MDT","layout");
               zhun_web_metadata_fiber.push(this.navbmdItm.getId(),this.navbmdItm);
              //  console.log("layomditm in zwe home before sending on fiber");
              //  console.log(this.layomditm);
                       zhun_web_metadata_fiber.push(this.layomditm.getId(),this.layomditm);
                       
        if(this.subroteonrender){
         let  ritem=new Item();   
           ritem.addData("hash", new ItemData("hash", location.pathname+location.hash)) ;
           ritem.addData("rerouteurl", new ItemData("rerouteurl",this.subroteonrender));
 console.log("subroute found to be true routing to reroute to url ");
 console.log(ritem);
           zhun_web_metadata_fiber.push("route-clicked",ritem);
          }
         this.shadowRoot.addEventListener('click',(event)=>{
             if(event.target.matches(`[${this.navbmdItm.getData("routing-attribute").fieldValue}]`)){
     //    alert("routeitem clicked")
            let href=event.target.getAttribute('href');
        
           let reg="/.#^/";
            let newhash=href;
 //console.log("newhash is"+newhash);
            let ritem=this.navbmdItm.getRelElementsOnType('RNDR_MDT').get(event.target.textContent);
             if(!ritem){
 console.log("ritem is not avaiable");
 console.log(ritem);
                ritem=new Item();   
               ritem.addData("hash", new ItemData("hash",event.target.getAttribute('href')))  
               ritem.addData("rerouteurl", new ItemData("rerouteurl","/home"+newhash))
             }
             console.log("after check for ritem is not avaiable");
             console.log(ritem);
            zhun_web_metadata_fiber.push("route-clicked",ritem);
            event.preventDefault();
             event.stopPropagation();
          }
           })
     
//console.log("ZweHome^^connectedCallback^ fouchecking subroteonrender "+this.subroteonrender);

    } 
//     connectedCallback(){ 
//         zhun_web_metadata_fiber.subscribe("route-clicked",this.renderRoutes); 
//          this.router.enablePopState(false); 
//         _render(this); 
//        let itemservice=new ItemService ();
//        let quertItem= new Item();
//        quertItem.contextId='cass_schema';
//        quertItem.name="caas_schema";
//        let nav2=new Item();
//        nav2.id=this.navbmdItm.id;
//        nav2.name=this.navbmdItm.name;

//       let lay2= new Item();
//       lay2.id=this.layomditm.id;
//       lay2.name=this.layomditm.name;

//        quertItem.addRelElementsOnType("RNDR_MDT",this.navbmdItm.name,nav2);
//        quertItem.addRelElementsOnType("RNDR_MDT",this.layomditm.name,lay2);
//           // itemservice.add("records","caas_form_schema",quertItem).then(resp=>{
//             itemservice.getOnContextIdasync("records","caas"+"_form_schema",quertItem).then(
//               data=>{
//                 console.log("data received in zwe home is:");
//                 console.log(data);
//                 this.navbmdItm= data.getRelElementOnType("RNDR_MDT","nav");
                 
//                 this.navbmdItm= data.getRelElementOnType("RNDR_MDT","layout");
//                 zhun_web_metadata_fiber.push(this.navbmdItm.getId(),this.navbmdItm);
//                 console.log("layomditm in zwe home before sending on fiber");
//                 console.log(this.layomditm);
//                         zhun_web_metadata_fiber.push(this.layomditm.getId(),this.layomditm);
                        
//          if(this.subroteonrender){
//           let  ritem=new Item();   
//             ritem.addData("hash", new ItemData("hash", location.pathname+location.hash)) ;
//             ritem.addData("rerouteurl", new ItemData("rerouteurl",this.subroteonrender));
//   console.log("subroute found to be true routing to reroute to url ");
//   console.log(ritem);
//             zhun_web_metadata_fiber.push("route-clicked",ritem);
//            }
//           this.shadowRoot.addEventListener('click',(event)=>{
//               if(event.target.matches(`[${this.navbmdItm.getData("routing-attribute").fieldValue}]`)){
//       //    alert("routeitem clicked")
//              let href=event.target.getAttribute('href');
         
//             let reg="/.#^/";
//              let newhash=href;
//   //console.log("newhash is"+newhash);
//              let ritem=this.navbmdItm.getRelElementsOnType('RNDR_MDT').get(event.target.textContent);
//               if(!ritem){
//   console.log("ritem is not avaiable");
//   console.log(ritem);
//                  ritem=new Item();   
//                 ritem.addData("hash", new ItemData("hash",event.target.getAttribute('href')))  
//                 ritem.addData("rerouteurl", new ItemData("rerouteurl","/home"+newhash))
//               }
//               console.log("after check for ritem is not avaiable");
//               console.log(ritem);
//              zhun_web_metadata_fiber.push("route-clicked",ritem);
//              event.preventDefault();
//               event.stopPropagation();
//            }
//             })
//               }
//                );
          
//           // });
  
     
// //console.log("ZweHome^^connectedCallback^ fouchecking subroteonrender "+this.subroteonrender);

//     } 

    
    renderRoutes=async (event)=>{ 
      this.subroteonrender=null;
      this.routeItem=event.detail;
    this.routeItem.parentId=this.navbmdItm.getId();
console.log("ZhunHome route captured in zhunhome is");
  // alert("zhunhome render route invoked")     
console.log(this.routeItem);
    event.preventDefault();
    event.stopPropagation();
    this.router.navigtTo(this.routeItem.getData('hash').fieldValue,true);    
}

 
renderRoute= async (match)=>{ 
   if(match.pathdefaulted){
    this.router.navigtTo(match.route.path,null);
  } else{
// console.log(`match.route in renderRoute of zwe home`);
// console.log(match);
// console.log(`routeitem from the routeitem is`);
// console.log(this.routeItem);
// console.log(`renderitem from the routeitem is`);
// console.log("layout metadata item in home is:");
// console.log(this.layomditm);
  let itemTorender=null;  
  if(this.routeItem.getData("render-item-key")){
       itemTorender=this.routeItem.getRelElementOnType("render-item",this.routeItem.getData("render-item-key").fieldValue);
       match.route.attrs.set("metadatakeyid",itemTorender.getId());
      }
//console.log(itemTorender);  
  const view=new match.route.view(this.router.getParams(match)); 
  let viewportItem=this.layomditm.getData("routing-view-port").fieldValue;  
   let rolet=this.shadowRoot.querySelector(`#rolet-${this.navbmdItm.getId()}`).querySelector(viewportItem.getData("view-port-id").fieldValue).querySelector('[slot="main-content"]');
   rolet.innerHTML=await view.getHtml(match.route.tagname,match.route.attrs);
   if(itemTorender)
   {
     zhun_web_metadata_fiber.push(itemTorender.getId(),itemTorender)
   }else { 
     console.log("searching routes for  this.layomditm,match.route.rekey");
    console.log(this.layomditm);
    console.log(match.route.rekey);
     let itmtopushonroute=this.searchRoutes(this.layomditm,match.route.rekey);
console.log("itemtopushonroute after search is");
console.log(itmtopushonroute); 
     zhun_web_metadata_fiber.push("route-clicked",itmtopushonroute);

   }
  } }

y=0;
  searchRoutes=(item,routekey)=>{
    if(item.name===routekey){
      return item;
    }
   let x=0;
    let ritem=item.getRelElementsOnType("RNDR_MDT").get(routekey);
//console.log(this.y+"::"+x+"ritem at iteration:"+x+"is");
//console.log(ritem);
      if(ritem){ 
        return ritem;
      }else{
        
        Array.from(item.getRelElementsOnType("RNDR_MDT").values()).every(subelement=>{
        x=x+1; 
        // console.log(this.y+"::"+x+"at iteration: searchRoutes working on subelement:");
//console.log(subelement);

          let ele=this.searchRoutes(subelement,routekey);
//console.log(this.y+"::"+x+"ele on getRelElement is");
//console.log(ele);
          if(ele){ 
            
              ritem=ele;
              return false;
          } else{
            return true;
          }
        })
      }
      this.y=this.y+1;
      return ritem;
   }
disconnectedCallback(){ 
//console.log("ZhunHome call under disconnected callback");
    zhun_web_metadata_fiber.remove("route-clicked",undefined); 
    this.router.disablePopState();
  
} 
}
customElements.define('zwe-home',ZweHome)
