import styles from './zwe-app-base.styles.scss'; 
const _render =  ( host,pathmatch)=>{ 
   // eleemt=;
//console.log("ZweAppBaseRendrer^_render^audit^");
//console.log(" ZweAppBaseRendrer appbase view is pathmatch ");
//console.log(pathmatch);
host.shadow.innerHTML=   `
           <style>   ${styles}</style>
         <div> </div>
          <slot name="app-base" > </slot>
    <div>
 
             
             </div>
     `
 /**
  * direct addresse
  * <nav><a href="/products" data-link class="href">Products</a>
             <a href="/home" data-link class="href">Home</a>
             <a href="/aboutus" data-link class="href">About Us</a>
             <a href="/contactus" data-link class="href">Contact Us</a>
             </nav>
  * **/
};

export {_render}
