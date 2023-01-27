import { ItemData, Item } from "../../../../../../../zhun-data-elements/zhun-data-elements";
import { getManageTabs } from "../../data/manage-object-crud-tabs/manage-object-crud-tabs";

export class ZweManageGroupMdBuilder {

  compactView: boolean = true;
  containsRoutes = true;


  constructor(compactView: boolean, containsRoutes: boolean) {
    this.compactView = compactView;
    this.containsRoutes = containsRoutes;

  }
  buildGroup(name: string, routingAttribute: string):Item {

    let traineesCoolapsibleItem = new Item();
    traineesCoolapsibleItem.name = name;
    traineesCoolapsibleItem.addData("grouptitle", new ItemData("hash", name));
    traineesCoolapsibleItem.addData("contains-routes", new ItemData("contains-routes", this.containsRoutes));
    traineesCoolapsibleItem.addData("routing-attribute", new ItemData("routing-attribute", routingAttribute))
    return traineesCoolapsibleItem;
  }


  buildGroupItem(name: string, hash: string, baseAttribute: string, collection: string, domain: string, formfunction: any, tablefunction: any,type:string):Item {
    let manageTraineesItem = new Item();
    manageTraineesItem.name = name;
    manageTraineesItem.addData("hash", new ItemData("hash", hash));
    manageTraineesItem.addData("base-attributes", new ItemData("base-attributes", baseAttribute));

    let attrcontextmtrnes = new Item();
    attrcontextmtrnes.addData("collection", new ItemData("collection", collection));
    attrcontextmtrnes.addData("data_type", new ItemData("data_type", type));
    let mngTraineesTabs = getManageTabs(domain, formfunction, tablefunction, attrcontextmtrnes)
    let headertrnmdt = new Item();
    headertrnmdt.name = "header";

    let mainctrnmdt = new Item();
    mainctrnmdt.name = "main-content";

    mngTraineesTabs.addRelElementsOnType("layout-metadata", headertrnmdt.name, headertrnmdt);
    mngTraineesTabs.addRelElementsOnType("layout-metadata", mainctrnmdt.name, mainctrnmdt);

    manageTraineesItem.addRelElementsOnType("render-item", mngTraineesTabs.name, mngTraineesTabs);
    manageTraineesItem.addData("render-item-key", new ItemData("render-item-key", mngTraineesTabs.name))
          return manageTraineesItem;
  }
}