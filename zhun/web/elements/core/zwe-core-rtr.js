import { zhun_web_data_fiber } from "../../../../../zhun-web-fabric/zhun-fabric";
import { ZweCore } from "./zwe-core";

   export class ZweCoreRtr extends ZweCore{
    exec_data;
  render_on_event=()=>{
    let exec_context=this.metadataItem.getRelElementsOnType("exec_cntx");
    console.log("ZweCoreRtr ^render_on_event is^");
    console.log(exec_context);
    if(exec_context){
        let exec_cntx=exec_context.values().next().value;
        if(exec_cntx.type === "rmd_e_o_e"){
          console.log("button is of type runtime-metadata-rendering with execution on event is set to true");
          console.log(exec_cntx.type);
          console.log("data to render on event is :");
          this.exec_data=this.metadataItem.getRelElementsOnType("exec_data").values().next().value;
          console.log(this.exec_data);
          this.exec_data.parentId=this.metadataItem.getId();
          console.log("this.metadataitem form is");
          console.log(this.metadataItem.getData("form"));
          this.shadowRoot.addEventListener("click",this.push_render_metadata);
        }
      }
    }   
    push_render_metadata=(event)=>{
      console.log("call under push render metadata");
      console.log(event);
      zhun_web_data_fiber.push("rmd_e_o_e"+this.metadataItem.getData("form").fieldValue+this.metadataItem.getId(),this.exec_data)
    }
} 