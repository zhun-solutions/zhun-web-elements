import { Item, ItemData } from "../../../../../../../../../zhun-data-elements/zhun-data-elements";


  
const getViewProductsMDTabel= ()=>{
    let viewProductDomainTable= new Item();
    viewProductDomainTable.name="View ProductDomains Tabel"; 
     viewProductDomainTable.addData("tagName", new ItemData("tagName","zwe-table"));
    viewProductDomainTable.addData("element", new ItemData("element","zwe-table"));
    let actionsCol= new Item();
    actionsCol.name="Actions";
    actionsCol.addData('display_name',new ItemData('display_name',actionsCol.name));
    actionsCol.addData('data_key',new ItemData('data_key','row_actions'));
    viewProductDomainTable.addRelElementsOnType("columns",actionsCol.name,actionsCol);
  
    let nameCol= new Item();
        nameCol.name="Name";
        nameCol.addData('display_name',new ItemData('display_name',nameCol.name));
        nameCol.addData('data_key',new ItemData('data_key','name'));
        nameCol.addData("is-searchable", new ItemData("is-searchable",true));
        nameCol.addData("column-index",new ItemData("column-index",1));
        nameCol.addData("is-sortable", new ItemData("is-sortable",true));
        viewProductDomainTable.addRelElementsOnType("columns",nameCol.name,nameCol);

    let typeCol= new Item();
        typeCol.name="type";
        typeCol.addData('display_name',new ItemData('display_name',typeCol.name));
        typeCol.addData('data_key',new ItemData('data_key','program_type'));
        typeCol.addData("is-sortable", new ItemData("is-sortable",true));
        typeCol.addData("column-index",new ItemData("column-index",2));
        viewProductDomainTable.addRelElementsOnType("columns",typeCol.name,typeCol);
        
    // let traineeDurationCol= new Item();
    //     traineeDurationCol.name="Duration";
    //     traineeDurationCol.addData('display_name',new ItemData('display_name',traineeDurationCol.name));
    //     traineeDurationCol.addData('data_key',new ItemData('data_key','trainee_duration'));

    
    
    
    //     viewProductDomainTable.addRelElementsOnType("columns",traineeDurationCol.name,traineeDurationCol);
    
        let domainCol= new Item();
        domainCol.name="Domain";
        domainCol.addData('display_name',new ItemData('display_name',domainCol.name));
        domainCol.addData('data_key',new ItemData('data_key','domain'));
        domainCol.addData("column-index",new ItemData("column-index",3));
        domainCol.addData("is-sortable", new ItemData("is-sortable",true));
        viewProductDomainTable.addRelElementsOnType("columns",domainCol.name,domainCol);

        let subDomainCol= new Item();
        subDomainCol.name="Sub-Domain";
        subDomainCol.addData('display_name',new ItemData('display_name',subDomainCol.name));
        subDomainCol.addData('data_key',new ItemData('data_key','sub-domain'));
        subDomainCol.addData("column-index",new ItemData("column-index",4));
        subDomainCol.addData("is-sortable", new ItemData("is-sortable",true));
        viewProductDomainTable.addRelElementsOnType("columns",subDomainCol.name,subDomainCol);

    
        let catCol= new Item();
        catCol.name="Category";
        catCol.addData('display_name',new ItemData('display_name',catCol.name));
        catCol.addData('data_key',new ItemData('data_key','category'));
        catCol.addData("column-index",new ItemData("column-index",5));
        catCol.addData("is-sortable", new ItemData("is-sortable",true));
        viewProductDomainTable.addRelElementsOnType("columns",catCol.name,catCol);


        let subCatCol= new Item();
        subCatCol.name="Sub-category";
        subCatCol.addData('display_name',new ItemData('display_name',subCatCol.name));
        subCatCol.addData('data_key',new ItemData('data_key','sub-category'));
        subCatCol.addData("column-index",new ItemData("column-index",6));
        subCatCol.addData("is-sortable", new ItemData("is-sortable",true));
        viewProductDomainTable.addRelElementsOnType("columns",subCatCol.name,subCatCol);


        let statusCol= new Item();
        statusCol.name="status";
        statusCol.addData('display_name',new ItemData('display_name',statusCol.name));
        statusCol.addData('data_key',new ItemData('data_key','trainee_execution_status'));
        statusCol.addData("column-index",new ItemData("column-index",7));
        statusCol.addData("is-sortable", new ItemData("is-sortable",true));

        viewProductDomainTable.addRelElementsOnType("columns",statusCol.name,statusCol);
    // let traineeRegistrationStatusCol= new Item();
    //     traineeRegistrationStatusCol.name="Registration Status";
    //     traineeRegistrationStatusCol.addData('display_name',new ItemData('display_name',traineeRegistrationStatusCol.name));
    //     traineeRegistrationStatusCol.addData("is-searchable", new ItemData("is-searchable",true));
    //     traineeRegistrationStatusCol.addData("column-index",new ItemData("column-index",5));
    //      traineeRegistrationStatusCol.addData('data_key',new ItemData('data_key','trainee_registration_status'));
    //     viewProductDomainTable.addRelElementsOnType("columns",traineeRegistrationStatusCol.name,traineeRegistrationStatusCol);
        
        let        dataref=new Item();
        dataref.name="data_ref";
        dataref.addData("collection",new ItemData("collection","product_metadata"));
        dataref.addData("data_type",new ItemData("data_type","PRODUCT"));
        dataref.addData("subscription-id",new ItemData("subscription-id","data-set  "));
        let queryref= new Item();
        queryref.name="queryref";
        queryref.addData("query-filter",new ItemData("none"));
        let operationref=new Item();
        operationref.addData("operation",new ItemData("operation","get"));
        operationref.addData("scope",new ItemData("scope","all"));
        queryref.addRelElements("operation-ref",operationref)
        dataref.addRelElements("queryref",queryref);
        viewProductDomainTable.addRelElementsOnType("exec-data-ref",dataref.name,dataref);
        let colnames=new Array();
        Array.from(viewProductDomainTable.getRelElementsOnType('columns').values()).filter(col=>!(col.getData("data_key").fieldValue==="row_actions")).map(col=>{
    
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

    viewProductDomainTable.addRelElementsOnType("row_metadata_item",row_metadata_item.name,row_metadata_item);
 return viewProductDomainTable;

}

export { getViewProductsMDTabel}
