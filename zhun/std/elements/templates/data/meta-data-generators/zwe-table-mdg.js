import { Item, ItemData } from "../../../../../../../zhun-data-elements/zhun-data-elements";

const getBasicTable=(op_prefix,name,is_actionable)=>{
    let vtt= new Item();
    vtt.name=`${op_prefix} ${name} Table`;
    
    vtt.addData("tagName", new ItemData("tagName","zwe-table"));
    vtt.addData("element", new ItemData("element","zwe-table"));
    if(is_actionable){
    let actionsCol= new Item();
    actionsCol.name="Actions"; 
    actionsCol.addData('display_name',new ItemData('display_name',actionsCol.name));
    actionsCol.addData('data_key',new ItemData('data_key','row_actions'));
    vtt.addRelElementsOnType("columns",actionsCol.name,actionsCol);

    let  row_metadata_item= new Item();
     let edit_action_item= new Item();
    edit_action_item.name="Edit";
    let delete_action_item= new Item();
    delete_action_item.name="Delete";
    
    row_metadata_item.addRelElementsOnType("row_actions", edit_action_item.name,edit_action_item );
    row_metadata_item.addRelElementsOnType("row_actions", delete_action_item.name,delete_action_item );
    vtt.addRelElementsOnType("row_metadata_item",row_metadata_item.name,row_metadata_item);

}
console.log("getting basic table metadata as");
console.log(vtt);
return vtt;
}

const getTableColumn=(name,data_key,is_searchable,is_sortable)=>{
    let tableColumn= new Item();
    tableColumn.name=name;
    tableColumn.addData('display_name',new ItemData('display_name',tableColumn.name));
    tableColumn.addData('data_key',new ItemData('data_key',data_key));
    if(is_searchable){
    tableColumn.addData("is-searchable", new ItemData("is-searchable",true));
    }
    tableColumn.addData("column-index",new ItemData("column-index",1));
    if(is_sortable){
        tableColumn.addData("is-sortable", new ItemData("is-sortable",true));
    } 
    return tableColumn;
}


const setDataRef=(table,collection,subscription_id,query_filter,scope)=>{
    
         let        dataref=new Item();
        dataref.name="data_ref";
        dataref.addData("collection",new ItemData("collection",collection));
        dataref.addData("subscription-id",new ItemData("subscription-id",subscription_id));
        let queryref= new Item();
        queryref.name="queryref";
        queryref.addData("query-filter",new ItemData(query_filter));
        let operationref=new Item();
        operationref.addData("operation",new ItemData("operation","get"));
        operationref.addData("scope",new ItemData("scope",scope));
        queryref.addRelElements("operation-ref",operationref)
        dataref.addRelElements("queryref",queryref);
        table.addRelElementsOnType("exec-data-ref",dataref.name,dataref);
}
const postpreptable=(vtt,displayColumnsList)=>{
  
console.log("   postpreptable^table metadata  ");
console.log(vtt);
  if(displayColumnsList){
        let colnames=new Array();
        Array.from(vtt.getRelElementsOnType('columns').values()).filter(col=>!(col.getData("data_key").fieldValue==="row_actions")).map(col=>{
            colnames.push(col.getData("data_key").fieldValue);
        })
    
        let  row_metadata_item= vtt.getRelElementsOnType("row_metadata_item").values().next().value;
        row_metadata_item.addData("displayColumnsList", new ItemData("displayColumnsList",colnames))
        
    }
}
export{getBasicTable,getTableColumn,setDataRef,postpreptable}