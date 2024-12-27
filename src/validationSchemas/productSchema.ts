import * as Yup from "yup";

export const productSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  slug: Yup.string().required().label("Slug"),
  categories: Yup.array().required().label("Categories"),
  subCategories: Yup.array().required().label("Sub Categories"),
  type: Yup.object().required().label("Type"),
  sizes: Yup.array().required().label("Sizes"),

  finish: Yup.string().label("Finish"),
  decorName: Yup.string().label("Decor Name"),
  decorNumber: Yup.string().label("Decor Number"),
  sku: Yup.string().label("Decor Number"),

  salePrice: Yup.string().label("Sale Price"),
  mrp: Yup.string().label("MRP"),

  defaultImage: Yup.string().required().label("Default Image"),
  defaultVideo: Yup.string().url().label("Default Image"),
  images: Yup.array().nullable().label("Images"),

  descriptions: Yup.string().label("Descriptions"),
  shortDescription: Yup.string().label("Short Descriptions"),

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
  type: null,
  sizes: null,

  finish: "",
  decorName: "",
  decorNumber: "",
  sku: "",

  salePrice: "0",
  mrp: "0",

  defaultImage: "",
  defaultVideo: "",
  images: null,

  descriptions: "",
  shortDescription: "",

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
  type: {
    label: string;
    value: string;
  } | null;
  sizes:
    | {
        label: string;
        value: string;
      }[]
    | null;

  finish: string;
  decorName: string;
  decorNumber: string;
  sku: string;

  salePrice: string;
  mrp: string;

  defaultImage: string;
  defaultVideo: string;
  images: string[] | null;

  descriptions: string;
  shortDescription: string;

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
