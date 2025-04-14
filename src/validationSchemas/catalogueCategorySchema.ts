import * as Yup from "yup";

export const catalogueCategorySchema = Yup.object({
  name: Yup.string().required().label("Name"),
  slug: Yup.string().required().label("Slug"),

  priority: Yup.number().required().label("Priority"),

  shortDescription: Yup.string().label("Short Description"),
  metaTitle: Yup.string().label("Meta Title"),
  metaDescription: Yup.string().label("Meta Description"),
  metaKeywords: Yup.string().label("Meta Keywords"),

  status: Yup.string().label("Status"),
});

export const catalogueCategoryInitialValues: CatalogueCategoryValues = {
  name: "",
  slug: "",

  priority: 0,

  shortDescription: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  status: "true",
};

export interface CatalogueCategoryValues {
  name: string;
  slug: string;

  priority: number;

  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  status: string;
}
