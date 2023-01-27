import { ItemData, Item } from "../../../../../../../zhun-data-elements/zhun-data-elements";

export class ZweCollNavLinkMdBuilder {

    compactView: boolean = true;
    containsRoutes = true;


    constructor(compactView: boolean, containsRoutes: boolean) {
        this.compactView = compactView;
        this.containsRoutes = containsRoutes;

    }
    build(name: string, routingAttribute: string, cType: string):Item {

        let navlinkItem = new Item();
        navlinkItem.name = name;
        navlinkItem.type = "ZweNavLinks";
        navlinkItem.c_type = cType;
        navlinkItem.addData("compact-view", new ItemData("compact-view", this.compactView));
        navlinkItem.addData("contains-routes", new ItemData("contains-routes", this.containsRoutes));
        navlinkItem.addData("routing-attribute", new ItemData("routing-attribute", routingAttribute));
        return navlinkItem;
    }
}