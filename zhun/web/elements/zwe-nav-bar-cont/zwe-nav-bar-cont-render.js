   import styles from './zwe-nav-bar-cont.styles.scss'; 
  const _render =(host,home_menu_bar_navs)=>{ 
    
  host.shadow.innerHTML=  `
         <style>   ${styles}</style>
         <zwe-nav-bar navdetails=${home_menu_bar_navs.getId()}></zwe-nav-bar> 
         `
  
};

export {_render}