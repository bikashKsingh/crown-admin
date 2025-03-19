import * as Yup from "yup";

export const productSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  slug: Yup.string().required().label("Slug"),
  categories: Yup.array().required().label("Categories"),
  subCategories: Yup.array().label("Sub Categories"),
  decorSeries: Yup.object().required().label("Decor Series"),

  sizes: Yup.array().required().label("Sizes"),

  decorNumber: Yup.string().required().label("Decor Number"),
  sku: Yup.string().label("Decor Number"),

  salePrice: Yup.string().label("Sale Price"),
  mrp: Yup.string().label("MRP"),

  a4Image: Yup.string().required().label("A4 Image"),
  fullSheetImage: Yup.string().required().label("Full Sheet Image"),
  highResolutionImage: Yup.string().required().label("High Resolution Image"),

  descriptions: Yup.string().label("Descriptions"),
  shortDescription: Yup.string().label("Short Descriptions"),

  ralNumber: Yup.string().label("Ral Number"),

  metaTitle: Yup.string().label("Meta Title"),
  metaDescription: Yup.string().label("Meta Description"),
  metaKeywords: Yup.string().label("Meta Keywords"),
  status: Yup.string().required().label("Status"),
});

export const productInitialValues: ProductValues = {
  name: "",
  slug: "",
  categories: null,
  subCategories: null,
  decorSeries: null,

  sizes: null,

  decorNumber: "",
  sku: "",

  salePrice: "0",
  mrp: "0",

  a4Image: "",
  fullSheetImage: "",
  highResolutionImage: "",

  descriptions: "",
  shortDescription: "",

  ralNumber: "",

  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  status: "true",
};

export interface ProductValues {
  name: string;
  slug: string;
  categories:
    | {
        label: string;
        value: string;
      }[]
    | null;
  subCategories:
    | {
        label: string;
        value: string;
      }[]
    | null;
  decorSeries: {
    label: string;
    value: string;
  } | null;
  sizes:
    | {
        label: string;
        value: string;
      }[]
    | null;

  decorNumber: string;
  sku: string;

  salePrice: string;
  mrp: string;

  a4Image: string;
  fullSheetImage: string;
  highResolutionImage: string;

  descriptions: string;
  shortDescription: string;

  ralNumber: string;

  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: string;
}

export type FileType = {
  fieldname: string;
  encoding: string;
  originalname: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: string;
  filepath: string;
};
