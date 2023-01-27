const searchRMItemOnId=(item,id)=>{ 
    return Array.from(item.getRelElementsOnType("RNDR_MDT").values()).find(subelement=> {
      console.log("subelement is");
      console.log(subelement);
      console.log("id is:"+id);
    return  subelement.uiid===id} ) 
   } 

   export {searchRMItemOnId}
