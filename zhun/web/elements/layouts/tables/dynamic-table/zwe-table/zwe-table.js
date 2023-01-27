import { Item, ItemData } from '../../../../../../../../zhun-data-elements/zhun-data-elements';
import { ItemService } from '../../../../../../../../zhun-store-adapter/firestore-adapter/item.service';
import { zhun_web_data_fiber, zhun_web_metadata_fiber } from '../../../../../../../../zhun-web-fabric/zhun-fabric';
import { _list_table_elements_template } from '../../../../../../std/elements/templates/list/list-templates';
import {   ZweCoreTable } from '../../../../core/zwe-core-table';
 import {_render} from './zwe-table-render'
 export class ZweTable extends ZweCoreTable{
   table;itemservice;dataref;rowmdi;
   columnheader;
     constructor(){
        super();
       
        super.metadatakeyid=this.dataset.metadataKeyId;
console.log(`ZweTabel^constructor^value of metadatakeyid:${this.metadatakeyid}`);
       }   
    
    connectedCallback(){ 
//console.log(`ZweTabel^connected callback^audit^entering connected callback: calling pre`);
//console.log(`ZweTabel^constructor^value of metadatakeyid:${this.metadatakeyid}`);
      this.connectedCallbackpre(this.metadatakeyid);
//console.log(`ZweTabel^connected callback^audit^entering connected callback: after calling pre`);
     } 
     //fetchdata
     prerender=()=>{
    this.rowmdi= this.metadataItem.getRelElementsOnType("row_metadata_item").values().next().value;

       this.dataref=this.metadataItem.getRelElementsOnType("exec-data-ref").values().next().value;
console.log("metadataItem in prerender of zwetable is");
console.log(this.metadataItem);
      zhun_web_metadata_fiber.subscribe("exec-data"+this.metadataItem.getId(),this.prepareTableData)
    this.itemservice=new ItemService();
      let fetchOpref=this.dataref.getRelElement("queryref").getRelElement("operation-ref");
//console.log(  "fetchoperation-ref is" );
//console.log(fetchOpref);
      if(fetchOpref.getData("operation").fieldValue==="get" && fetchOpref.getData("scope").fieldValue==="all"){
      this.itemservice.getAll("records",this.dataref.getData("collection").fieldValue).then(data=>{
console.log("got   recrods from firestore");
console.log(data);
         if(data){ 
         let   dataset=new Item();
        data.forEach(ele=>{
         console.log("ele is  in prerender");
             console.log(ele);
              console.log(typeof ele);
          dataset.addRelElementsOnType("exec-data",ele.getId(),ele)

      })  
          zhun_web_metadata_fiber.push("exec-data"+this.metadataItem.getId(),dataset);
         }
      })
   }else if(fetchOpref.getData("operation").fieldValue==="get" && fetchOpref.getData("scope").fieldValue==="rel") {
         //fetch only relative recrods based on the rel id
         console.log("tables fetch scope is set to rel fetch only we will be fetching based on relative data");
         console.log(this.metadataItem);
         zhun_web_data_fiber.subscribe("rel-exec-data"+this.dataref.getData("collection").fieldValue+this.metadataItem.getData("exec_data_subs_id").fieldValue,this.handleExecDataonSubscription);

   }
   }


   handleExecDataonSubscription=(event)=>{
      console.log("zwe-table^handleExecDataSubscription^");
      console.log(event.detail);
      this.itemservice.getContentById(event.detail,"records",this.dataref.getData("collection").fieldValue).then(data=>{

         console.log("got   recrods from firestore from getContentById");
      console.log(data[0]);
      if(data[0]){ 
         let   dataset=new Item();
        data[0].forEach(ele=>{
             console.log("ele is  in handelexecdatasubs");
             console.log(ele );
             console.log(typeof ele);
          dataset.addRelElementsOnType("exec-data",ele.getId(),ele)

      })
   zhun_web_metadata_fiber.push("exec-data"+this.metadataItem.getId(),dataset);

   }

      })

   }
    prepareTableData=(event)=>{
console.log("prepareTableData event.detail is");
console.log(event.detail);
         this.metadataItem.addAllRelElementsOnType("exec-data",event.detail.getAllRelElements().get("exec-data"))
console.log("this.metadataitem after updating exec-data");
console.log(this.metadataItem);
   //  let tbody=this.table.getElementsByTagName("tbody");
let tbody=this.table.tBodies[0];
   let bodytemplate=`  ${Array.from(this.metadataItem.getRelElementsOnType("exec-data").values()).map(item=>{return _list_table_elements_template(item,this.rowmdi)}).join('')} `
//console.log("body template after processing recrods is");
//console.log("tbody by get element by tagina is");
//console.log(tbody);
//console.log(bodytemplate);
      tbody.innerHTML=bodytemplate;
      console.log(`this.dataref.getData("collection").fieldValue in zwe table for subscription is`);
      console.log(this.dataref.getData("collection"));
      this.addRowActionHandlers(Array.from(this.table.tBodies[0].rows));
    }


    updateRecordRow=(event)=>{
      console.log("call under updated recrod row::event is:");
      console.log(event);
      console.log("old set of rows on table are");
      let   templt=_list_table_elements_template(event.detail,this.rowmdi) ;
      let row=Array.from(this.table.rows).filter(row=>row.id==="tablerow-"+event.detail.getId());
      console.log("row determined to be chagned is");
      console.log(row);
      let rowindex=event.detail.getData("zwe-row-index-int").fieldValue;
      this.table.deleteRow(rowindex);
      let tbody=this.table.tBodies[0];
      tbody.insertAdjacentHTML('afterbegin', templt);
       //row.innerHTML= `${templt}`;
       let  rowa=new Array();
       rowa.push(this.shadowRoot.getElementById(`tablerow-${event.detail.getId()}`))
       this.addRowActionHandlers( rowa);
   
    }
    //TODO enable dynamic row insertion based on flag-activation on metadata
    insertCreatedRecordRow=(event)=>{
      console.log("call under insert created recrod row::event is:");
      console.log(event);
      console.log("old set of rows on table are");
      console.log(this.table.rows);
        console.log("event.detail is"); 
        let newItem=event.detail;
        console.log(newItem);
      let   templt=_list_table_elements_template(newItem,this.rowmdi) ;
      console.log("templt for new row creation is");
      console.log(templt);
      let tbody=this.table.tBodies[0];
      tbody.insertAdjacentHTML('beforeend', templt);
    let  rowa=new Array();
      rowa.push(this.shadowRoot.getElementById(`tablerow-${newItem.getId()}`))
      this.metadataItem.getRelElementsOnType("exec-data").set(newItem.getId(),newItem);
      this.addRowActionHandlers( rowa);
      console.log("new set of rows on table are");
      console.log(this.table.rows);
    }
    
    addRowActionHandlers=(rows)=>{
     rows.forEach(row=>{
//console.log("row to work on is");
//console.log(row);
       //TODO change it to make generic to select the column based on index which had the head as Actions
       let  actioncol=row.cells[0];
//console.log("First column is");
//console.log(firstcol);
         let btns=         actioncol.getElementsByTagName("Button")
//console.log("Buttons are");
//console.log(Array.from(btns));
         Array.from(btns).forEach(btn=>{
            this.addActionButtonHandlers(btn);
            
         })
      })
   }

   addActionButtonHandlers=(btn)=>{
      //TODO validation to avoid - hyphens in action-names
      let regx=new RegExp(/^(.*?)-(.*)/g);
      let execr=regx.exec(btn.id);
    //  console.log("execr is");
     // console.log(execr);
      let action=execr[1];
      let id=execr[2];
    //  console.log("action is[>"+action+"<] for id:[>"+id+"<]");
      if(action.toLowerCase()==="delete"){
      btn.addEventListener("click",this.deleteEventHandler);
   }else if(action.toLowerCase()==="edit"){
      btn.addEventListener("click",this.editEventHandler);
   }
   }

   deleteEventHandler=(event)=>{
     // console.log("handling-delete");
      let regx=new RegExp(/^(.*?)-(.*)/g);
      let execr=regx.exec(event.target.id); 
     //  console.log("execr is");
     // console.log(execr);
      let action=execr[1];
      let id=execr[2];
      console.log("deleteEventHandler action is[>"+action+"<] for id:[>"+id+"<]");
      // this.itemservice.remove()
      this.itemservice.delete("records",this.dataref.getData("collection").fieldValue,id);
     //TODO add validation to ensure that the grandparent-parnetnode is infact a row. 

     let rowfortheItem= event.target.parentNode.parentNode;
     rowfortheItem.remove();
   }

   editEventHandler=(event)=>{
      console.log("handling-edit : event.target.id");
      console.log(event.target.id);
      let regx=new RegExp(/^(.*?)-(.*)/g);
      let execr=regx.exec(event.target.id);
      let rowi=event.target.parentNode.parentNode.rowIndex;
      console.log("rowindex is"+rowi);
      console.log("execr is");
      console.log(execr);
      let action=execr[1];
      let id=execr[2];

      console.log("editEventHandler action is[>"+action+"<] for id:[>"+id+"<]");
      console.log("metadata for finding renderer is");
      console.log("update render id is");
      console.log(this.metadataItem.getData("update-operation-render-id").fieldValue);
      let urid=this.metadataItem.getData("update-operation-render-id").fieldValue;

      let updateItem= new Item();
      let execdata= this.metadataItem.getRelElementsOnType("exec-data").get(id)

      updateItem.addRelElementsOnType("exec-data",execdata.getId(),execdata);
      updateItem.addData("zwe-row-index-int",new ItemData("zwe-row-index-int",rowi));
      zhun_web_metadata_fiber.push(`show-tab-content-ext-${urid}`,updateItem)
      zhun_web_data_fiber.push(`exec-data-${urid}`,updateItem)
   }
     postrendersubs=()=>{
       
      this.publishSubElementsData(); 
      this.addEventHandlers();  } 
   addEventHandlers=()=>{
   let  fe=      this.shadowRoot.getElementById(`fe${this.metadatakeyid}`);
//console.log(`filter elemet is`);
//console.log(fe);
      fe.addEventListener("keyup",this.filterTable);
     let colnms=Array.from(this.metadataItem.getRelElementsOnType("columns").values());
     this.columnheader=  this.table.tHead.getElementsByTagName("tr")[0];
//console.log("FEC IS");
//console.log(this.columnheader);
     this.addSearchColumnHandlers(colnms);
     this.addSortColumnHandlers(colnms);

      //this.sortTableByColumn(this.table,2);
}

addSortColumnHandlers=(columns)=>{
   let sortableCols=columns.filter(col=>(col.getData("is-sortable")&& col.getData("is-sortable").fieldValue));

console.log("sortable columns are");
console.log(sortableCols);
   sortableCols.forEach(col=>{
console.log("value of "+col.name+" in sortable forach is+ value at:"+col.getData("column-index").fieldValue);
//console.log(this.table); 
let aCol=this.columnheader.querySelector(`th:nth-child(${col.getData("column-index").fieldValue+1})`);
  aCol.classList.add("sortable");
//console.log("handle sort function is");
        aCol.addEventListener('click',this.handleSort);
//console.log("After adding click event handler to acol ");
//console.log(aCol);
      })
}

handleSort=(event)=>{
   let colindex=event.target.dataset.index;
//console.log("under handle sort for col index"+colindex);
   let currentisAscending=event.target.classList.contains("th-sort-asc");
   this.sortTableByColumn(this.table,colindex,!currentisAscending);
}

 addSearchColumnHandlers=(columns)=>{
   let searchablesCols=columns.filter(col=>(col.getData("is-searchable")&& col.getData("is-searchable").fieldValue));
    
//console.log("searchable columns are");
//console.log(searchablesCols);
   searchablesCols.forEach(col=>{
//console.log("value of this in sercable forach is");
//console.log(this.table); 
let aCol=this.columnheader.querySelector(`th:nth-child(${col.getData("column-index").fieldValue+1})`);
  aCol.classList.add("searchable");
        let  thsearchinput=aCol.getElementsByTagName("input")[0];
        thsearchinput.dataset.index=aCol.dataset.index;
         thsearchinput.addEventListener("keyup",this.filterTableOnColumn);
   })
 }

/**
 * Sorts an HTML table
 * @param {HTMLTableElement} tab the table to sort
 * @param {number} colIndex The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be ascending
 * **/
sortTableByColumn(tab,colIndex,asc=true){
   let dirModifier=asc ? 1:-1;
//console.log("under sort table by column");
let rows=Array.from(tab.tBodies[0].rows);
//console.log("sortTableByColumn^ROWS AFTER SLICE IS");
//console.log(rows);
let indx=parseInt(colIndex)+1;

let sortedRows=rows.sort((a,b)=>{
//console.log("rows passed are");
//console.log(a);
//console.log(b);
//console.log("colIndex is");
//console.log(colIndex);
//console.log("a.querySelector(`td:nth-child(${parseInt(colIndex)+1})`)");
//console.log(a.querySelector(`td:nth-child(${indx})`));
   let aColText=a.querySelector(`td:nth-child(${indx})`).textContent.trim();
    
   let bColText=b.querySelector(`td:nth-child(${indx})`).textContent.trim();            
//console.log(aColText); 
   return aColText > bColText ? (1*dirModifier):(-1*dirModifier);
})
//console.log("sorted rows are");
//console.log(sortedRows);
//console.log("ROWS AFTER sorted rows IS");
//console.log(rows);
//REMOVE EXISTINGDATA
   rows.forEach(row=>{
//console.log(`working on row : ${row.rowIndex}`);
//console.log(row);
      
      tab.deleteRow(row.rowIndex);
   })
//console.log("table rows are");
//console.log(tab.rows);
   let tbody=tab.tBodies[0];
   tbody.append(...sortedRows);
   this.columnheader.querySelectorAll("th").forEach(th=>th.classList.remove("th-sort-asc","th-sort-desc"));
   this.columnheader.querySelector(`th:nth-child(${indx})`).classList.toggle("th-sort-asc",asc);
   this.columnheader.querySelector(`th:nth-child(${indx})`).classList.toggle("th-sort-desc",!asc);

}

filterTableOnColumn=(event)=>{
//console.log(`eventcvaptured in filtertable oncolunm is ${event.target}`); 
   let filtervalue=event.target.value;


   let colindex=event.target.dataset.index;
//console.log("col index to finter for is:"+colindex);
//console.log("FIlter value on keyup is"+filtervalue);
// let mcf=this.shadowRoot.getElementById(`mcf${this.metadataItem.getId()}`);
// console.log("mcf is");
// console.log(mcf.checked);
let rows=Array.from(this.table.tBodies[0].rows);
 
//console.log("table rows are ");
//console.log(rows);
rows.forEach(row=>{
    
let   col=Array.from(row.getElementsByTagName("td"))[colindex];
   const hasdata= col.innerText.toLowerCase().indexOf(filtervalue.toLowerCase())>-1
//console.log("hasdata is"+hasdata);
   if(!hasdata){
      row.style.display="none";
  }else{
   row.style.display="";
     
  }
})
} 
  filterTable=(event)=>{
      let filtervalue=event.target.value;
//console.log("FIlter value on keyup is"+filtervalue);
   let rows=Array.from(this.table.tBodies[0].rows);
//console.log("table rows are ");
//console.log(rows);
   rows.forEach(row=>{
       
  let   cols=Array.from(row.getElementsByTagName("td")).slice(1);
      const hasdata=      cols.some(col=>col.innerText.toLowerCase().indexOf(filtervalue.toLowerCase())>-1)
//console.log("hasdata is"+hasdata);
      if(!hasdata){
         row.style.display="none";
     }else{
      row.style.display="";
        
     }
   })
  } 
  publishSubElementsData=()=>{
     this.table=this.shadowRoot.getElementById(`ct${this.metadatakeyid}`);
//console.log("call under publsih subelements data publishing zwe Tabel  for elemtns");
     Array.from(this.metadataItem.getRelElementsOnType("RNDR_MDT").values()).map(item=>{
       if(item.getData("contains-subscribeable-ce") && item.getData("contains-subscribeable-ce").fieldValue){ 
         Array.from(item.getRelElementsOnType("RNDR_MDT").values()).map(subitem=>{
               if(subitem.t_type==="subscribeable-ce"){
//console.log("zwe-table subitem is subscribable push data");
//console.log(subitem);
//console.log("this is ")
//console.log( this.shadowRoot.querySelector(`#s${subitem.getId()}`) );
                 let elseis= this.shadowRoot.querySelector(`#s${subitem.getId()}`);
                  elseis.parentNode.classList.add("subscribe-able");
                  zhun_web_metadata_fiber.push(subitem.getId(),subitem);
               }
         })
      }
     }) 
     zhun_web_data_fiber.subscribe("record_created"+"-"+"records"+"-"+this.dataref.getData("collection").fieldValue+this.metadataItem.getId(),this.insertCreatedRecordRow)
     zhun_web_data_fiber.subscribe("record_updated"+"-"+"records"+"-"+this.dataref.getData("collection").fieldValue+this.metadataItem.getId(),this.updateRecordRow)
    
   this.addEventListenersOnRows();
  }
  addEventListenersOnRows=()=>{
     let rows=this.table.rows;
      Array.from(rows).forEach(row=>{
         let buttons=row.getElementsByTagName("button");
         Array.from(buttons).forEach(button=>
            {
            if(button.id.match(/delete/i)){
            button.addEventListener("click",this.deleteRowbuttonclicked);
         }else if(button.id.match(/edit/i)){

            button.addEventListener("click",this.editRowbuttonclicked);
         
         }
         }
      )
  })}

  deleteRowbuttonclicked=(event)=>{
   this.table.deleteRow(event.target.parentNode.parentNode.rowIndex);
                                      
//console.log("clicked button for delete:"+event.target.id); 
 let regx=/^\w+-(.*)/g;
 let res;
                      res=regx.exec(event.target.id )
                      let rid_b=res[1];//this is the.getId( of the item deleted
//console.log(.getId( of the item delete is"+rid_b); 
                      //TODO notify event based on target ids.getId(. 
//console.log("ROWS AFTER DELETE IS");
//console.log(this.table.rows);
   
  }

 editRowbuttonclicked=(event)=>{
//console.log("clicked button for edit:"+event.target.id);
     
}
     render(){
//console.log(`ZweTabel^render^audit^calling renderer of the layout render`);

      _render(this);  

     }  


} 
customElements.define('zwe-table',ZweTable)
