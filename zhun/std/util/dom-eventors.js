
const addeventlistner_for_classtoggel_on_subelement=(host,event,selectionbaseclass,subchildbaseclass,classtotoggel)=>{
     host.shadowRoot.querySelector(selectionbaseclass).addEventListener(event,()=>{
        host.shadowRoot.querySelector(subchildbaseclass).classList.toggle(classtotoggel);
    })
    
} 


const addeventlistner_for_classtoggel_on_element=(host,event,selectionbaseclass,classtotoggel)=>{
     host.shadowRoot.querySelector(selectionbaseclass).addEventListener(event,()=>{
           host.shadowRoot.querySelector(selectionbaseclass).classList.toggle(classtotoggel);
    })
    
} 



const animate_nav_links=(host,event,selectionbaseclass,classforselect)=>{
    host.shadowRoot.querySelector(selectionbaseclass).addEventListener(event,()=>{
         const  navlinks=host.shadowRoot.querySelectorAll(classforselect);
    navlinks.forEach((link,index)=>{
      if(link.style.animation){

        link.style.animation=''
      }else{
        link.style.animation=`navlinkfade 0.5s ease forwards ${index / 7+.5}s`;
    }

    })});
 }


export{
    addeventlistner_for_classtoggel_on_subelement,
    addeventlistner_for_classtoggel_on_element,animate_nav_links
}