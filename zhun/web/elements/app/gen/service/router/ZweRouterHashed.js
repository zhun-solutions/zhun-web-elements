import {getParams} from "../../../../../../../../../public/static/js/router/routes-util" ;
 
  class ZweRouterHashed{
    routes;
    host; 
    hostname;
    forrelativepaths;
 constructor (forrelativepaths,routes,host){
     this.routes=routes;
     this.host=host;
     this.forrelativepaths=forrelativepaths;
 }
  getPotentialmatches = (pathtomatch)=>{
//console.log(`$pattobmatchedis ${pathtomatch}`);
    let pmatches=Array.from(this.routes.keys()).map(key=>{
      
        return {
            route:this.routes.get(key),
            result:pathtomatch.match(this.pathToRegxo(this.routes.get(key).path)),
            pathdefaulted:false
        }
    })
    return pmatches;
 }

 getPathMatch = (pathtomatch)=>{
    const potentialMatches=this.getPotentialmatches(pathtomatch);
//console.log("potentialMatches are");
 //   console.log(potentialMatches);
    let match=potentialMatches.find(potentialMatche => potentialMatche.result !== null && (potentialMatche.route !== null || potentialMatche.route !== undeifned))
//console.log("value of match afte potential match find is");
//console.log( match); 
   return match;
 }


 executeRouteOnUrl=async (urlpath)=>{
    
//console.log(`ZweRouterHashed^executeRouteOnUrl^location pathname is ${location.pathname} :: and location hash is: ${location.hash} and url path passsed is:${urlpath}`);
//console.log("All routes are:");
//console.log(this.routes); 
//console.log("ZweRouterHashed^executeRouteOnUrl^execute route this.host is");
//console.log(this.host);
  let path2bmatched=urlpath;
  // if(this.host.routeItem){
  //   path2bmatched=this.host.routeItem.getData('hash').fieldValue;
  // }
 let match=this.getPathMatch(path2bmatched); 
  if(!match){
//console.log(`!match  satisfed for match:${match}`);
     let   newpaths=   this.pathToRegxpathSplitter();
//console.log("derived paths are:");
//console.log(newpaths); 
    if(newpaths.basepath==null){
      //alert(`since we are defaulting to base path,we default the path without the hash`);
       match={
          route:this.routes.get("/default"),
          result:[`${location.pathname}`],
          pathdefaulted:true
      }
  }else{
       match=this.getPathMatch(newpaths.basepath);
//console.log(`new match after mashup is is: `);
//console.log(match);
   //   match.subroute=newpaths.childpath;
      match.route.attrs.set("subroute", newpaths.childpath)
  }
     
  } 
  this.host.renderRoute(match);
//console.log("hosts elements are : subroteonrender: ");
//console.log(this.host.subroteonrender);

//console.log("hosts elements are : routeItem: ");
//console.log(this.host.routeItem);
 

} 




 executeRoute=async ()=>{
    
//console.log(`ZweRouterHashed^executeRoute^location pathname is ${location.pathname} :: and location hash is: ${location.hash}`);
//console.log("All routes are:");
//console.log(this.routes); 
//console.log("ZweRouterHashed^executeRoute^execute route this.host is");
//console.log(this.host);
    let path2bmatched=location.pathname+location.hash;
    if(this.host.routeItem){
      path2bmatched=this.host.routeItem.getData('hash').fieldValue;
    }
   let match=this.getPathMatch(path2bmatched); 
    if(!match){
//console.log(`!match  satisfed for match:${match}`);
       let   newpaths=   this.pathToRegxpathSplitter();
//console.log("derived paths are:");
//console.log(newpaths); 
       let sr=null;
      if(newpaths.basepath==null){
     //   alert("since we are defaulting to base path,we default the path without the hash");

        if(location.pathname!=="/"){
          sr=location.pathname;
        }
        match={
            route:this.routes.get("/default"),
            result:[`${this.routes.get("/default").path}`],
            pathdefaulted:true,
            subroute:sr
        }
    }else{
         match=this.getPathMatch(newpaths.basepath);
//console.log(`new match after mashup is is: `);
//console.log(match);
     //   match.subroute=newpaths.childpath;
        match.route.attrs.set("subroute", newpaths.childpath)
    }
       
    } 
//console.log("match vlaue before renderORute of home");
//console.log(match);
    this.host.renderRoute(match);
//console.log("executeRoute^hosts elements are : subroteonrender: on host is");
//console.log(this.host);
//console.log(this.host.subroteonrender);

//console.log("executeRoute^hosts elements are : routeItem: ");
//console.log(this.host.routeItem);
   

} 

//to handle popstat events rendering form the router has to be done in the context of executeroute so we cannot return view from here to outside. 
  enablePopState=()=>{
      window.addEventListener("popstate",this.executeRoutePopstate);

    // console.log("zweRouterHashed^enablePopstate^execRoute is^"+execRoute);
    
}
funcRef=(event)=>{
//console.log("funcRef hashchange received is");
//console.log(event);
}
executeRoutePopstate=(event)=>{
//console.log("eventpopstatereceived is in host");
//console.log(this.host.tagName);
//console.log("eventpopstatereceived is");
//console.log(event);
  let psItem=event.state;
//console.log(`PS ITEM CREATED FROM POP EVENT IS`);
//console.log(psItem);
 // alert(`popstateroutelister for host ${this.host.tagName} with event state as : ${psItem.pushstatehosttag} and url:${psItem.url}`);
 if(this.host.tagName === psItem.pushstatehosttag){
   let urltopass=psItem.url;
   if(psItem.burl){
    urltopass=psItem.burl;
   }
  this.executeRouteOnUrl(urltopass);
  event.stopPropagation();
} 
  }
disablePopState(){
    window.removeEventListener("popstate",this.executeRoute);
}
 
getParams(match){
    return getParams(match);
}
pathToRegxo = (path)=>{
    // console.log("path recevied in pathtoregx to get the regx to match");
    // console.log(path);
   // new RegExp("^" /**matching the start of strign */+path.replace(/** replace every occurence of / with regular expression equivalent of the match */))
  /*both hashed and path/*/ 
let  regx=   new RegExp("^" + path.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)")+"$");
//console.log(`regx created is: ${regx} for path:${path}`);
// /**hashedpath regx**/ return new RegExp("^" + path.replace(/#/g,"#").replace(/:\w+/g,"(.+)")+"$");
return regx
}

pathToRegxpathSplitter = ()=>{
    let regx = /^([#\/].*?)([#\/].*)/g;
//console.log(`location.pathname:: ${location.pathname} `);
    let res;
    let bpath=null;
    let cpath=null;
    while(res=regx.exec(location.pathname+location.hash)){
        bpath=res[1];
        cpath=res[2];
//console.log("call uunder wihle of reg x cvalues are ");
//console.log(`$BASEPATGH:${bpath} :: $CHILDPATH: ${cpath}`);
    } 
    // if(bpath===null && cpath===null){
    //   //alert("both paths null reevaluating")
    //   regx = /^([#\/].*)([#\/].*)?/g;
    // console.log(`location.pathname:: ${location.pathname} `);
     
    // while(res=regx.exec(location.pathname+location.hash)){
    //     bpath=res[1];
    //     cpath=res[2];
    //       console.log("call uunder2nd wihle of reg x cvalues are ");
    //       console.log(`$BASEPATGH:${bpath} :: $CHILDPATH: ${cpath}`);
    // } 
    // }
     return {
        basepath:bpath,
        childpath:cpath}
  
}

  navigtTo=(url,reroute)=>{
    let    ritem=this.host.routeItem;
    let burl=null;
    if(ritem){
        let    rerouteurl=this.host.routeItem.getData('rerouteurl');
      if(rerouteurl){
    //    alert( `rerouteurl is set on host so changing url hash ${url} to rerorute url of : ${rerouteurl.fieldValue}`)
        burl=url;
        url=rerouteurl.fieldValue;

    }}

    let rtstateItem={
      pushstatehosttag:this.host.tagName,
      url:url,
      burl:burl
    }
//console.log(`called navigate to: with url as ${url} and reroute as ${reroute} on host. ${this.host.tagName}`)
    history.pushState(rtstateItem,null,url);
    if(reroute){
   this.executeRouteOnUrl(url);
}
};
 
}

export {ZweRouterHashed}
