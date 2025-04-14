import * as Yup from "yup";

export const catalogueSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  file: Yup.string().required().label("File"),

  category: Yup.object().required().label("Category"),
  priority: Yup.number().required().label("Priority"),
  shortDescription: Yup.string().label("Short Description"),

  metaTitle: Yup.string().label("Meta Title"),
  metaDescription: Yup.string().label("Meta Description"),
  metaKeywords: Yup.string().label("Meta Keywords"),

  status: Yup.string().label("Status"),
});

export const catalogueInitialValues: CatalogueValues = {
  name: "",
  file: "",

  category: null,

  priority: 0,

  shortDescription: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  status: "true",
};

export interface CatalogueValues {
  name: string;

  category: {
    label: string;
    value: string;
  } | null;

  file: string;

  priority: number;

  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  status: string;
}
