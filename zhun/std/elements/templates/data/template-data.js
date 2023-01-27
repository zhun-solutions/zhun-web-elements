import { Item, ItemData } from "../../../../../../zhun-data-elements/zhun-data-elements";


import { NavItemBuilder } from "./domain_data_compoers";

// import { getManageTabs } from "./manage-object-crud-tabs/manage-object-crud-tabs";
// import { getViewTrainingsTabel } from "./domain_data/trainings/trainings-view";
// import { getTrainingsFormMData } from "./domain_data/trainings/trainings-form/trainings-form"
// import { getTraineesFormMData } from "./domain_data/trainees/trainees-form/trainees-form";
// import { getViewTraineesTabel } from "./domain_data/trainees/trainees-view";
// import { getMentorsFormMData } from "./domain_data/mentors/mentors-form/mentors-form";
// import { getViewMentorsTabel } from "./domain_data/mentors/mentors-view";
// import { getMetadataFormMData } from "./domain_data/metadata/metadata-form/metadata-form";
// import { getViewMetadataTabel } from "./domain_data/metadata/metadata-view";
import { ZweCollNavLinkMdBuilder } from "../md/builders/zwe_coll_nav_link_builder";
import { ZweManageGroupMdBuilder } from "../md/builders/zwe_mng_grp_md_builder";
import { getViewProductDomainsTabel } from "./domain_data/elements/domain/domain-view";
import { getProductDomainsFormMData } from "./domain_data/elements/domain/domain-form";
import { getSubDomainMDForm } from "./domain_data/elements/sub-domain/sub-domain-form";
import { getCategoryMDForm } from "./domain_data/elements/category/category-form";
import { getAttributeMDForm } from "./domain_data/elements/attribute/attribute-form";
import { getSubCategoryMDForm } from "./domain_data/elements/sub-category/sub-category-form";
import { getProductTypeFormMData } from "./domain_data/elements/type/type-form";
import { getProductFormMData } from "./domain_data/elements/product/product-form";
import { getViewProductsMDTabel } from "./domain_data/elements/product/product-view";
import { getProductVariantFormMData } from "./domain_data/elements/variant/variant-form";
import { getViewProductAttributesTabel } from "./domain_data/elements/attribute/attribute-view";
import { getViewProductSubDomainsTabel } from "./domain_data/elements/sub-domain/sub-domain-view";
import { getViewProductCategoriesTabel } from "./domain_data/elements/category/category-view";
import { getViewProductSubCategoriesTabel } from "./domain_data/elements/sub-category/sub-category-view";
import { getViewProductTypesTabel } from "./domain_data/elements/type/type-view";
import { getViewProductVariantsTabel } from "./domain_data/elements/variant/variant-view";
import { getProductForm } from "./domain_data/elements/catalog/product/product-form";
import { getViewProductsTabel } from "./domain_data/elements/catalog/product/product-view";
import { getUploadProductsForm } from "./domain_data/elements/catalog/product/upload-products-form";
const home_menu_bar_navs = () => {
  let itm = new Item();
  itm.name = "CAAS";
  itm.type = "ZewNavBar";
  itm.addData("contains-routes", new ItemData("contains-routes", true));
  itm.addData("routing-attribute", new ItemData("routing-attribute", "zhun-home-routes"))
  let navItemBuilder = new NavItemBuilder();
  itm.addRelElementsOnType("RNDR_MDT", "Dashboard", navItemBuilder.getNavItem("Dashboard", "/dashboard", "zhun-home-routes"));
  itm.addRelElementsOnType("RNDR_MDT", "Notifications", navItemBuilder.getNavItem("Notifications", "/notifications", "zhun-home-routes"));
  itm.addRelElementsOnType("RNDR_MDT", "Contact", navItemBuilder.getNavItem("Contact", "/contact", "zhun-home-routes"));

  return itm;
}


const home_layout = () => {
  let layoutItm = new Item();
  layoutItm.name = "zhun kretR home";
  layoutItm.type = "ZewLayout";
  layoutItm.addData("contains-routes", new ItemData("contains-routes", true));
  layoutItm.addData("routing-attribute", new ItemData("routing-attribute", "zhun-home-routes"))

  let  navlBuilder=new ZweCollNavLinkMdBuilder();
  let lyoutLeftBarCNavLinkItem = navlBuilder.build("Left Bar Collapsible Nav Links","zhun-home-routes","left-bar");
  let zweManageGroupMdBuilder = new ZweManageGroupMdBuilder();
  let manageMetadataCollapsibleItem =  zweManageGroupMdBuilder.buildGroup("Manage Metadata","zhun-home-routes");
  let productDomainMDItem=zweManageGroupMdBuilder.buildGroupItem("Product Domain", "/manage-product-domain-md", "zhun-home-routes","product_domain_metadata","Product Domain",getProductDomainsFormMData,getViewProductDomainsTabel,"PRODUCT_DOMAIN")
   let productSubDomainMDItem=zweManageGroupMdBuilder.buildGroupItem("Product Sub Domain", "/manage-product-sub-domain-md", "zhun-home-routes","product_sub_domain_metadata","Product Sub Domain",getSubDomainMDForm,getViewProductSubDomainsTabel,"PRODUCT_SUB_DOMAIN")
   let productCategoryMDItem=zweManageGroupMdBuilder.buildGroupItem("Product Category", "/manage-product-category-md", "zhun-home-routes","product_category_metadata","Product Category",getCategoryMDForm,getViewProductCategoriesTabel,"PRODUCT_CATEGORY")
   let productSubCategoryMDItem=zweManageGroupMdBuilder.buildGroupItem("Product Sub Category", "/manage-product-sub-category-md", "zhun-home-routes","product_sub_category_metadata","Product Sub Category",getSubCategoryMDForm,getViewProductSubCategoriesTabel,"PRODUCT_SUB_CATEGORY")
   let productTypeMDItem=zweManageGroupMdBuilder.buildGroupItem("Product Type", "/manage-product-type-md", "zhun-home-routes","product_type_metadata","Product Type",getProductTypeFormMData,getViewProductTypesTabel,"PRODUCT_TYPE")
   let productAttributeMDItem=zweManageGroupMdBuilder.buildGroupItem("Product Attribute", "/manage-product-attribute-md", "zhun-home-routes","product_attribute_metadata","Product Attribute",getAttributeMDForm,getViewProductAttributesTabel,"PRODUCT_ATTRIBUTE")
   let productMDItem=zweManageGroupMdBuilder.buildGroupItem("Product", "/manage-product-md", "zhun-home-routes","product_metadata","Product",getProductFormMData,getViewProductsMDTabel,"PRODUCT")
   let productVariantMDItem=zweManageGroupMdBuilder.buildGroupItem("Product Variant", "/manage-product-variant-md", "zhun-home-routes","product_variant_metadata","Product Variant",getProductVariantFormMData,getViewProductVariantsTabel,"PRODUCT_VARIANT")
  
  manageMetadataCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product Domain", productDomainMDItem);
   manageMetadataCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product Sub Domain", productSubDomainMDItem);
   manageMetadataCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product Category", productCategoryMDItem);
   manageMetadataCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product Sub Category", productSubCategoryMDItem);
   manageMetadataCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product Type", productTypeMDItem);
   manageMetadataCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product Attribute", productAttributeMDItem);
   manageMetadataCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product", productMDItem);
   manageMetadataCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product Variant", productVariantMDItem);

  let manageCatalogCollapsibleItem =  zweManageGroupMdBuilder.buildGroup("Manage Catalog","zhun-home-routes");
  let productItem=zweManageGroupMdBuilder.buildGroupItem("Product", "/manage-product", "zhun-home-routes","product","Product",getProductForm,getViewProductsTabel,"PRODUCT");

  manageCatalogCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Product", productItem);
  
  let uploadProductItem=zweManageGroupMdBuilder.buildGroupItem("Upload Products", "/manage-products", "zhun-home-routes","product","Product",getUploadProductsForm,getViewProductsTabel,"PRODUCT");
  manageCatalogCollapsibleItem.addRelElementsOnType("RNDR_MDT", "Upload Products",    uploadProductItem);


   lyoutLeftBarCNavLinkItem.addRelElementsOnType("RNDR_MDT", "Manage Metadata", manageMetadataCollapsibleItem);
  lyoutLeftBarCNavLinkItem.addRelElementsOnType("RNDR_MDT", "Manage Catalog", manageCatalogCollapsibleItem);
//----------------------------------------------------------------------------------------------
  // ///// Admin start
  // let admin_collapsible_item = new Item();
  // admin_collapsible_item.name = "Admin";
  // admin_collapsible_item.addData("grouptitle", new ItemData("hash", "Admin"));
  // admin_collapsible_item.addData("contains-routes", new ItemData("contains-routes", true));
  // admin_collapsible_item.addData("routing-attribute", new ItemData("routing-attribute", "zhun-home-routes"))

  // let manage_meta_data_item = new Item();

  // manage_meta_data_item.name = "Manage Metadata";

  // manage_meta_data_item.addData("hash", new ItemData("hash", "/manage-metadata"));
  // manage_meta_data_item.addData("base-attributes", new ItemData("base-attributes", "zhun-home-routes"));

  // let attr_context_mng_admin = new Item();
  // attr_context_mng_admin.addData("collection", new ItemData("collection", "metadata"));
  // let mng_admin_tabs = getManageTabs("Metadata", getMetadataFormMData, getViewMetadataTabel, attr_context_mng_admin)
  // let header_admin_mdt = new Item();
  // header_admin_mdt.name = "header";

  // let mainc_admin_mdt = new Item();
  // mainc_admin_mdt.name = "main-content";

  // mng_admin_tabs.addRelElementsOnType("layout-metadata", header_admin_mdt.name, header_admin_mdt);
  // mng_admin_tabs.addRelElementsOnType("layout-metadata", mainc_admin_mdt.name, mainc_admin_mdt);

  // manage_meta_data_item.addRelElementsOnType("render-item", mng_admin_tabs.name, mng_admin_tabs);
  // manage_meta_data_item.addData("render-item-key", new ItemData("render-item-key", mng_admin_tabs.name))


  // admin_collapsible_item.addRelElementsOnType("RNDR_MDT", "Manage Metadata", manage_meta_data_item);


  // itm.addRelElementsOnType("RNDR_MDT", "Admin", admin_collapsible_item);

  // ///Admin items done







  layoutItm.addRelElementsOnType("RNDR_MDT", lyoutLeftBarCNavLinkItem.c_type, lyoutLeftBarCNavLinkItem);

  let hdritm = new Item();
  hdritm.name = "Left Bar Nav Links";
  hdritm.type = "ZweNavLinks";
  hdritm.c_type = "header";
  layoutItm.addRelElementsOnType("RNDR_MDT", hdritm.c_type, hdritm);


  let mcitm = new Item();
  mcitm.name = "Main content";
  mcitm.type = "ZweNavLinks";
  mcitm.c_type = "main-content"
  layoutItm.addRelElementsOnType("RNDR_MDT", mcitm.c_type, mcitm);

  let viewport = new Item();
  viewport.addData("view-port-id", new ItemData("view-port-id", '[metadatakeyid="' + layoutItm.getId() + '"]'));
  viewport.addData("shadow-root-attribute-key", new ItemData("shadow-root-attribute-key", "name"));
  viewport.addData("shadow-root-attribute-value", new ItemData("shadow-root-attribute-value", "main-content"));
  layoutItm.addData("routing-view-port", new ItemData("routing-view-port", viewport));
  return layoutItm;
}
export { home_menu_bar_navs, home_layout };

