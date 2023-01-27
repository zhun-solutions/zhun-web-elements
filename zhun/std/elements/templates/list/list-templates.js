import { Item, ItemData } from "../../../../../../zhun-data-elements/zhun-data-elements"

const _list_anchors_template = nav => `<li> <a href="${nav.getData("hash").fieldValue}" ${nav.getData("base-attributes").fieldValue}>${nav.name}</a></li>`
const _list_navlinks_details_template = (details) => `<details id="${details.getId()}" class="collapsibles">
    <summary>${details.getData("grouptitle").fieldValue} 
    </summary> 
    <ul>
     <zwe-nav-links metadatakeyid=${details.getId()}></zwe-nav-links> </ul>
    </details>`
const _list_gen_details_template = (details, renderfuncts) => {
    return `<details id="${details.getId()}" class="collapsibles">
    <summary>${details.getData("grouptitle").fieldValue} 
    </summary> 
    ${Array.from(details.getRelElementsOnType("RNDR_MDT").values()).map(renderfuncts.templaterenderfunction).join('')}
    </details>`
}

const _list_gen_fieldset_template = (item, renderfuncts) => {
    // console.log("working on item: in _list_gen_fieldset_template");
    // console.log(item);
    let fstyle=``
    if(item.getData("fieldset_style")){
        fstyle=`style="${item.getData("fieldset_style").fieldValue}"`
    }
    let template = `<fieldset id="${item.getId()}" ${fstyle} class="${item.getData("styleclasslist").fieldValue}">
    <legend>${item.getData("legend").fieldValue}</legend>
    ${Array.from(item.getRelElementsOnType("RNDR_MDT").values()).sort((a, b) =>  a.seqId-b.seqId).map(i => renderfuncts.templaterenderfunction(i, { "form_id": item.getData("form").fieldValue })).join('')}
    </fieldset>`  ;
    //console.log(`template in list-gen-field-set-template is`);
    //console.log(template);
    return template;

}
const _list_tabsbuttons_template = (tab) => `<button id="tabbtn-${tab.getId()}"class="render-tab-button" data-for-tab=${tab.getData("tab-render-id").fieldValue}  ${tab.getData("base-attributes").fieldValue}>${tab.name}</button>`
const _list_tabs_template = (tab) => `<zwe-tab-content data-metadata-key-id=${tab.getId()}>
                                   </zwe-tab-content>`



const _list_subform_elements_template = (subform) => {
    return `<form id="frm${subform.getId()}">  </form>  `
}

const _render_element = (item) => {
    console.log("ITEM IN _render-element");
    console.log(item);
    let rendermetadata = item.getRelElementsOnType("RNDR_MDT").values().next().value;
    let tagname = ``;
    if(rendermetadata.getData("element")){
    tagname = rendermetadata.getData("element").fieldValue;
    }else if(rendermetadata.getData("tagName")){
         tagname = rendermetadata.getData("tagName").fieldValue; 
    }
    console.log("tagname is");
    console.log(tagname);
    let renderslotidtmpl = ``
    if (rendermetadata.getData("render-slot-id")) {
        renderslotidtmpl = `slot="${rendermetadata.getData("render-slot-id").fieldValue}"`
    }
    return `<${tagname} data-metadata-key-id="${item.getId()}" ${renderslotidtmpl}></${tagname}>`
}

const _render_self_as_element = (item) => {
    console.log("ITEM IN _render-element");
    console.log(item);
     let tagname = ``;
    if(item.getData("element")){
    tagname = item.getData("element").fieldValue;
    }else if(item.getData("tagName")){
         tagname = item.getData("tagName").fieldValue; 
    }
    console.log("tagname is");
    console.log(tagname);
    let renderslotidtmpl = ``
    if (item.getData("render-slot-id")) {
        renderslotidtmpl = `slot="${item.getData("render-slot-id").fieldValue}"`
    }
    return `<${tagname} data-metadata-key-id="${item.getId()}" ${renderslotidtmpl}></${tagname}>`
}
const _generate_form_elements_template = (form) => {
    //console.log("_generate_form_elements_template for form::" );
    //console.log(form);
    let submitbuttonname = form.getData("submit-name") ? form.getData("submit-name").fieldValue : "Submit";
    let submitmode = form.getData("submit-mode") ? form.getData("submit-mode").fieldValue : "";
    let submitboradcast = form.getData("submit-broadcast") ? form.getData("submit-broadcast").fieldValue : "";
    let bcstid = ``;
    if (form.getRelElementsOnType("exec-data").values().next().value) {
        bcstid = `data-bcstid=${form.getRelElementsOnType("exec-data").values().next().value.getId()}`;
    }
    let smode = ``;
    let sbcast = ``;
    //console.log("submitmode is"+submitmode);
    //console.log("submitboradcast is"+submitboradcast);
    if (!(submitmode === "")) {
        smode = `data-mode=${submitmode}`;
    }
    if (!(submitboradcast === "")) {
        sbcast = `data-bcst=${submitboradcast}`
    }

    //console.log("smode is"+smode);
    //console.log("sbcast is"+sbcast);

    let frmtmplt = Array.from(form.getRelElementsOnType("RNDR_MDT").values()).sort((a, b) =>  a.seqId-b.seqId).map(formfield => _list_form_elements_template(formfield, { "form_id": `frm${form.getId()}` })).join('')
    let submitbuttontmplt = ` <button id="frm-btn${form.getId()}" type="submit"  form="frm${form.getId()}" ${smode} ${sbcast} ${bcstid} >${submitbuttonname}</button>`
    return `${frmtmplt}${submitbuttontmplt}`
}

const _list_form_elements_template = (formfield, details) => {

    if (formfield.c_type === "fieldset") {
        if (!formfield.getData("form")) {
            formfield.addData("form", new ItemData("form", details["form_id"]));
        }
        let templt = _list_gen_fieldset_template(formfield, { templaterenderfunction: _list_form_elements_template });

        return templt;
    } else if (formfield.getData("element") && formfield.getData("element").fieldValue === "zwe-sub-form") {
        let sftemplate = _generate_form_elements_template(formfield);

        let sforendere = Array.from(formfield.getRelElementsOnType("form-data-renderer").values())[0];

        if (sforendere) {
            let ele = sforendere.getData("element").fieldValue;
            sftemplate = `${sftemplate} <${ele} id="sfor${sforendere.getId()}" data-metadata-key-id="${sforendere.getId()}"></${ele}>`
        }

        return sftemplate;
    }
    else {
        if (formfield.b_type === 'cb-ie' || formfield.b_type === 'ce' ) {
            //console.log("Formfield is cb-iee type getting plain teplate:");
            let template = _render_plain_template(formfield);
            //console.log("template got for cbie type in listformelementstemplate is");
            //console.log(template);
            return template;

        }

        else {
            console.log("working on element which seems to be a form-element");
            console.log(formfield);
            let options = ``;
            let val = ``;
            let readonly = ``;
            let disabled = ``;
            if (formfield.getData("element").fieldValue === "select") {

                options = generateOptions(formfield);

            } if (formfield.getData("value")) {

                val = `value=${formfield.getData("value").fieldValue}`;

            }
            if (formfield.getData("read-only") && formfield.getData("read-only").fieldValue) {

                disabled = `disabled`;
                //readonly=`readonly="readonly"`
            }
            // alert("datafor formeleemt");
            let mdk = ``;
            let lab = ``;
            let sstyle=``;
            if(formfield.getData("section_style")){
                sstyle=`style="${formfield.getData("section_style").fieldValue}"`;
            }
            let id = formfield.getId();
            let formname = formfield.getData("form-data-name") ? formfield.getData("form-data-name").fieldValue : formfield.name.toLowerCase().replace(/\s/g, "_");
            if (formfield.t_type === "subscribeable-ce") {
                mdk = generateMetaDataKeyAttr(formfield);
                id = "s" + formfield.getId();
            } else {
                let lname=formfield.getData("label").fieldValue;

                if(formfield.getData("label-or")!=undefined){
                    lname=formfield.getData("form-data-name").fieldValue;
                    alert("lname:"+lname);
                }
                 console.log("FORM_FIELD_LABLE FOR FIELD: FOR FIELD:NAME:"+formfield.getId()+formfield.name+" :: lable is:");
                lab = `<label class="lable-name" for="${formfield.getId()}"><span class="label-content-name">${lname}</span></label>`;
            }
            // //TODO retest for formdata conformance       
            return ` <section ${sstyle}>
 <${formfield.getData("element").fieldValue}  id="${id}" ${mdk} type="${formfield.getData("type").fieldValue}" name="${formname}" placeholder="${formfield.getData("placeholder").fieldValue}" required form="${details["form_id"]}" ${val} ${readonly} ${disabled}>${options}</${formfield.getData("element").fieldValue}>
${lab}
</section>`
            // return    ` 
            //      <${formfield.getData("element").fieldValue}  id="${id}" ${mdk} type="${formfield.getData("type").fieldValue}"  placeholder="${formfield.getData("placeholder").fieldValue}" required>${options}</${formfield.getData("element").fieldValue}>
            //     ${lab}`                         

        }
    }
}
const generateOptions = (formfield) => {

    let opttmplt = ``
    Array.from(formfield.getRelElementsOnType("options").values()).forEach((option) => {
        opttmplt = `${opttmplt} <option value="${option.getData('value').fieldValue}">${option.name}</option>`

    })
    return opttmplt;
}

const generateMetaDataKeyAttr = (formfield) => {
    if (formfield.getData('element').fieldValue === 'zwe-form') {
        return `data-metadata-key-id="${formfield.getId()}"`
    }
    return `metadatakeyid=${formfield.getId()}`
}
const _render_plain_template = (component) => {
    console.log("working on getting render-plain-template for component");
    console.log(component);
    let iid = `${component.getId()}`;
    if (component.b_type === "cb-ie") {
        //console.log("for item component : btype is cbiee typ ein renderplain tepmlate so calling render-cbie-plain template");
        //console.log(component);

        let template = _render_cbie_plain_template(component);
        //console.log("cbie template to return is");
        //console.log(template);                 
        return template;
    } if (component.t_type === "subscribeable-ce") {
        iid = `s${iid}`;
    }
    return `<${component.getData("tagName").fieldValue} id="${iid}" data-metadata-key-id="${component.getId()}"></${component.getData("tagName").fieldValue}>`
}

const _render_cbie_plain_template = (component) => `<${component.getData("tagName").fieldValue} is="${component.getData("cb-ie-tag").fieldValue}" data-metadata-key-id="${component.getId()}"></${component.getData("tagName").fieldValue}>`


const _list_table_elements_columns_template = (tableColumn) => {
    if (tableColumn.getData("is-searchable") && tableColumn.getData("is-searchable").fieldValue) {
        return `<th  data-index="${tableColumn.getData('column-index').fieldValue}"> <section>
    <input  id="sch${tableColumn.getId()}" type="text"  placeholder="search on ${tableColumn.getData('display_name').fieldValue}"  data-cname="${tableColumn.getData('display_name').fieldValue}"></input>
    <label class="lable-name" for="sch${tableColumn.getId()}"><span class="label-content-name">${tableColumn.getData('display_name').fieldValue}</span></label> </section> </th>`
        //   <label class="lable-name" for="${formfield.getId()}"><span class="label-content-name">${formfield.getData("label").fieldValue}</span></label>

    } else if (tableColumn.getData("is-sortable") && tableColumn.getData("is-sortable").fieldValue) {
        return `<th  data-index="${tableColumn.getData('column-index').fieldValue}">  ${tableColumn.getData('display_name').fieldValue}</th>`
    }
    else {
        return `<th>${tableColumn.getData('display_name').fieldValue} </th>`
    }
}

const _list_table_elements_template = (itm, row_metadata_item) => {
    console.log("row_metadata_item in listtableelementstemplate is");
    console.log(row_metadata_item);
    let retStr = `<tr id="tablerow-${itm.getId()}">`
    if (row_metadata_item.getRelElementsOnType("row_actions")) {
        retStr = `${retStr}<td>`
    }
    row_metadata_item.getRelElementsOnType("row_actions").forEach(actionItem => {
        retStr = `${retStr}<button id=${actionItem.name}-${itm.getId()}>${actionItem.name}</button>`
    })

    if (row_metadata_item.getRelElementsOnType("row_actions")) {
        retStr = `${retStr}</td>`
    }
    row_metadata_item.getData("displayColumnsList").fieldValue.forEach(col => {
        console.log("working on data[>"+col+"<]for column data ");
        console.log(itm);
        if (itm.getData(col)) {
            retStr = `${retStr}<td>${itm.getData(col).fieldValue}</td>`
        } else if (col === "name") {

            retStr = `${retStr}<td>${itm.name}</td>`
        } else if (col === "type") {

            retStr = `${retStr}<td>${itm.type}</td>`
        }  else if (col === "status") {

            retStr = `${retStr}<td>${itm.status}</td>`
        } else if (col === "row_actions") {
            // retStr=`${retStr}<button>${}</button>`
        }
        else {
            retStr = `${retStr}<td></td>`

        }
    })


    return `  ${retStr}`
}




const get_input_text_field= (name,placeholder)=>{
    let oem_details_f=new Item();
    oem_details_f.name=name;
    oem_details_f.c_type="_form_field";
    oem_details_f.t_type="_input_text";
    oem_details_f.addData("placeholder",new ItemData("placeholder",placeholder));
    oem_details_f.addData("form-data-name", new ItemData("form-data-name",name));
    oem_details_f.addData("label", new ItemData("label",name));

    return oem_details_f;
}



const get_input_file_field= (name,placeholder)=>{
    let oem_details_f=new Item();
    oem_details_f.name=name;
    oem_details_f.c_type="_form_field";
    oem_details_f.t_type="_input_file";
    oem_details_f.addData("placeholder",new ItemData("placeholder",placeholder));
    oem_details_f.addData("form-data-name", new ItemData("form-data-name",name));
    oem_details_f.addData("label", new ItemData("label",name));

    return oem_details_f;
}

export { get_input_file_field,get_input_text_field,_render_self_as_element,_render_element, _list_anchors_template, _list_navlinks_details_template, _list_tabs_template, _list_tabsbuttons_template, _render_plain_template, _render_cbie_plain_template, _list_form_elements_template, _list_gen_details_template, _list_table_elements_template, _list_table_elements_columns_template, _list_subform_elements_template, _generate_form_elements_template }
