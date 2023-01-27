import { Item, ItemData } from "../../../../../../../../zhun-data-elements/zhun-data-elements";

  
const getViewMetadataTabel= ()=>{
    let vtt= new Item();
    vtt.name="View Metadata Tabel"; 
     vtt.addData("tagName", new ItemData("tagName","zwe-table"));
    vtt.addData("element", new ItemData("element","zwe-table"));
    let actionsCol= new Item();
    actionsCol.name="Actions";
    actionsCol.addData('display_name',new ItemData('display_name',actionsCol.name));
    actionsCol.addData('data_key',new ItemData('data_key','row_actions'));
    vtt.addRelElementsOnType("columns",actionsCol.name,actionsCol);
  
    let metadataNameCol= new Item();
        metadataNameCol.name="Name";
        metadataNameCol.addData('display_name',new ItemData('display_name',metadataNameCol.name));
        metadataNameCol.addData('data_key',new ItemData('data_key','metadata_name'));
        metadataNameCol.addData("is-searchable", new ItemData("is-searchable",true));
        metadataNameCol.addData("column-index",new ItemData("column-index",1));
        metadataNameCol.addData("is-sortable", new ItemData("is-sortable",true));
        vtt.addRelElementsOnType("columns",metadataNameCol.name,metadataNameCol);
    let metadataProgramTypeCol= new Item();
        metadataProgramTypeCol.name="Program Type";
        metadataProgramTypeCol.addData('display_name',new ItemData('display_name',metadataProgramTypeCol.name));
        metadataProgramTypeCol.addData('data_key',new ItemData('data_key','program_type'));
        metadataProgramTypeCol.addData("is-sortable", new ItemData("is-sortable",true));
        metadataProgramTypeCol.addData("column-index",new ItemData("column-index",2));
        vtt.addRelElementsOnType("columns",metadataProgramTypeCol.name,metadataProgramTypeCol);
    let metadataDurationCol= new Item();
        metadataDurationCol.name="Duration";
        metadataDurationCol.addData('display_name',new ItemData('display_name',metadataDurationCol.name));
        metadataDurationCol.addData('data_key',new ItemData('data_key','metadata_duration'));

        vtt.addRelElementsOnType("columns",metadataDurationCol.name,metadataDurationCol);
    let metadataExecutionStatusCol= new Item();
        metadataExecutionStatusCol.name="Execution Status";
        metadataExecutionStatusCol.addData('display_name',new ItemData('display_name',metadataExecutionStatusCol.name));
        metadataExecutionStatusCol.addData('data_key',new ItemData('data_key','metadata_execution_status'));
        metadataExecutionStatusCol.addData("column-index",new ItemData("column-index",4));
        metadataExecutionStatusCol.addData("is-sortable", new ItemData("is-sortable",true));

        vtt.addRelElementsOnType("columns",metadataExecutionStatusCol.name,metadataExecutionStatusCol);
    let metadataRegistrationStatusCol= new Item();
        metadataRegistrationStatusCol.name="Registration Status";
        metadataRegistrationStatusCol.addData('display_name',new ItemData('display_name',metadataRegistrationStatusCol.name));
        metadataRegistrationStatusCol.addData("is-searchable", new ItemData("is-searchable",true));
        metadataRegistrationStatusCol.addData("column-index",new ItemData("column-index",5));
         metadataRegistrationStatusCol.addData('data_key',new ItemData('data_key','metadata_registration_status'));
        vtt.addRelElementsOnType("columns",metadataRegistrationStatusCol.name,metadataRegistrationStatusCol);
        
        let        dataref=new Item();
        dataref.name="data_ref";
        dataref.addData("collection",new ItemData("collection","metadata"));
        dataref.addData("data_type",new ItemData("data_type","METADATA"));
        dataref.addData("subscription-id",new ItemData("subscription-id","data-set  "));
        let queryref= new Item();
        queryref.name="queryref";
        queryref.addData("query-filter",new ItemData("none"));
        let operationref=new Item();
        operationref.addData("operation",new ItemData("operation","get"));
        operationref.addData("scope",new ItemData("scope","all"));
        queryref.addRelElements("operation-ref",operationref)
        dataref.addRelElements("queryref",queryref);
        vtt.addRelElementsOnType("exec-data-ref",dataref.name,dataref);
        let colnames=new Array();
        Array.from(vtt.getRelElementsOnType('columns').values()).filter(col=>!(col.getData("data_key").fieldValue==="row_actions")).map(col=>{
    
           colnames.push(col.getData("data_key").fieldValue);
        })


    let  row_metadata_item= new Item();
    row_metadata_item.addData("displayColumnsList", new ItemData("displayColumnsList",colnames))
    let edit_action_item= new Item();
    edit_action_item.name="Edit";
    let delete_action_item= new Item();
    delete_action_item.name="Delete";
    
    row_metadata_item.addRelElementsOnType("row_actions", edit_action_item.name,edit_action_item );
    row_metadata_item.addRelElementsOnType("row_actions", delete_action_item.name,delete_action_item );

    vtt.addRelElementsOnType("row_metadata_item",row_metadata_item.name,row_metadata_item);
 return vtt;

}

export { getViewMetadataTabel}
