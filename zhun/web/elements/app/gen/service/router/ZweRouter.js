import { getParams, pathToRegex } from "../../../../../../../router/routes-util";


//wil lbe called with router data only when the first load is completed and a new link is clicked on th loaded page. 

  class ZweRouter{
    routes;
    host; 
 constructor (routes,host){
     this.routes=routes;
     this.host=host;
 }
enablePopState(){
    window.addEventListener("popstate",this.executeRoute);
    this.executeRoute();
}
disablePopState(){
    window.removeEventListener("popstate",this.executeRoute);
}

 executeRoute=async ()=>{

//console.log(this.routes);


//console.log("execute route this.host is");
//console.log(this.host);

    // if(this.routes.get(" "))

    // Test eatch route for potential match
    const potentialMatches= Array.from(this.routes.keys()).map(key=>{
      
        return {
            route:this.routes.get(key),
            result:location.pathname.match(pathToRegex(this.routes.get(key).path))
        }
    })
//console.log("potentialMatches are");
//console.log(potentialMatches);
     let pathdefaulted=false;
    let match=potentialMatches.find(potentialMatche => potentialMatche.result !== null && (potentialMatche.route !== null || potentialMatche.route !== undeifned))
//console.log("value of match afte potential match find is");
//console.log( match);  
    if(!match){
//console.log(`!match  satisfed for match:${match}`);

        match={

            route:this.routes.get("/default"),
            result:[`${location.pathname}`]
        };
        pathdefaulted=true;
        //since path is defaulted , location path should be changed to defaulted value.
        this.navigtTo(match.route.path,null);
    } 

//console.log("new match value is")
//console.log(match);
        const view=new match.route.view(getParams(match));
//console.log(" this.host.shadow is");
//console.log( this.host.shadow);
//console.log(" this.host is");
//console.log(`         this.host.shadowRoot.querySelector('[name="app-base"]')`);
//console.log(         this.host.shadowRoot.querySelector('[name="app-base"]'));
//console.log("append host is");
//console.log(this.host);
        this.host.shadowRoot.querySelector("[name='app-base']").innerHTML=await view.getHtml();
 

}
  navigtTo=(url,reroute)=>{
    history.pushState(null,null,url);
    if(reroute){
   this.executeRoute();
}
};
 
}

export {ZweRouter}
