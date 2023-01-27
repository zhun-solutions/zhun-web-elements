const  filterOutElements=(array,ele)=>{
    return array.filter((elee)=>{
    return  elee.id !== ele.id
     })}


export {filterOutElements}


