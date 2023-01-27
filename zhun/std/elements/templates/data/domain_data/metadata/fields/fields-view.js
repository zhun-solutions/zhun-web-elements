import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";

  
const getViewFieldsTabel= ()=>{
    let vtt= new Item();
    vtt.name="View Field Tabel"; 
     vtt.addData("tagName", new ItemData("tagName","zwe-table"));
    vtt.addData("element", new ItemData("element","zwe-table"));
    let actionsCol= new Item();
    actionsCol.name="Actions";
    actionsCol.addData('display_name',new ItemData('display_name',actionsCol.name));
    actionsCol.addData('data_key',new ItemData('data_key','row_actions'));
    vtt.addRelElementsOnType("columns",actionsCol.name,actionsCol);
  
    let fieldNameCol= new Item();
        fieldNameCol.name="Name";
        fieldNameCol.addData('display_name',new ItemData('display_name',fieldNameCol.name));
        fieldNameCol.addData('data_key',new ItemData('data_key','field_name'));
        fieldNameCol.addData("is-searchable", new ItemData("is-searchable",true));
        fieldNameCol.addData("column-index",new ItemData("column-index",1));
        fieldNameCol.addData("is-sortable", new ItemData("is-sortable",true));
        vtt.addRelElementsOnType("columns",fieldNameCol.name,fieldNameCol);
    let fieldProgramTypeCol= new Item();
        fieldProgramTypeCol.name="Program Type";
        fieldProgramTypeCol.addData('display_name',new ItemData('display_name',fieldProgramTypeCol.name));
        fieldProgramTypeCol.addData('data_key',new ItemData('data_key','program_type'));
        fieldProgramTypeCol.addData("is-sortable", new ItemData("is-sortable",true));
        fieldProgramTypeCol.addData("column-index",new ItemData("column-index",2));
        vtt.addRelElementsOnType("columns",fieldProgramTypeCol.name,fieldProgramTypeCol);
    let fieldDurationCol= new Item();
        fieldDurationCol.name="Duration";
        fieldDurationCol.addData('display_name',new ItemData('display_name',fieldDurationCol.name));
        fieldDurationCol.addData('data_key',new ItemData('data_key','field_duration'));

        vtt.addRelElementsOnType("columns",fieldDurationCol.name,fieldDurationCol);
    let fieldExecutionStatusCol= new Item();
        fieldExecutionStatusCol.name="Execution Status";
        fieldExecutionStatusCol.addData('display_name',new ItemData('display_name',fieldExecutionStatusCol.name));
        fieldExecutionStatusCol.addData('data_key',new ItemData('data_key','field_execution_status'));
        fieldExecutionStatusCol.addData("column-index",new ItemData("column-index",4));
        fieldExecutionStatusCol.addData("is-sortable", new ItemData("is-sortable",true));

        vtt.addRelElementsOnType("columns",fieldExecutionStatusCol.name,fieldExecutionStatusCol);
    let fieldRegistrationStatusCol= new Item();
        fieldRegistrationStatusCol.name="Registration Status";
        fieldRegistrationStatusCol.addData('display_name',new ItemData('display_name',fieldRegistrationStatusCol.name));
        fieldRegistrationStatusCol.addData("is-searchable", new ItemData("is-searchable",true));
        fieldRegistrationStatusCol.addData("column-index",new ItemData("column-index",5));
         fieldRegistrationStatusCol.addData('data_key',new ItemData('data_key','field_registration_status'));
        vtt.addRelElementsOnType("columns",fieldRegistrationStatusCol.name,fieldRegistrationStatusCol);
        
        let        dataref=new Item();
        dataref.name="data_ref";
        dataref.addData("collection",new ItemData("collection","field"));
        dataref.addData("data_type",new ItemData("data_type","FIELD_METADATA"));

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


    let  row_field_item= new Item();
    row_field_item.addData("displayColumnsList", new ItemData("displayColumnsList",colnames))
    let edit_action_item= new Item();
    edit_action_item.name="Edit";
    let delete_action_item= new Item();
    delete_action_item.name="Delete";
    
    row_field_item.addRelElementsOnType("row_actions", edit_action_item.name,edit_action_item );
    row_field_item.addRelElementsOnType("row_actions", delete_action_item.name,delete_action_item );

    vtt.addRelElementsOnType("row_field_item",row_field_item.name,row_field_item);
 return vtt;

}

export { getViewFieldsTabel}
