import { Item, ItemData } from "../../../../../../zhun-data-elements/zhun-data-elements";
export class NavItemBuilder{
 getNavItem(name:string,hash:string,baseAttributes:string){
  let navItem= new Item();
  navItem.name=name;
  navItem.addData("hash", new ItemData("hash",hash));
  navItem.addData("base-attributes",new ItemData("base-attributes",baseAttributes) );
  return navItem;   
}
}
