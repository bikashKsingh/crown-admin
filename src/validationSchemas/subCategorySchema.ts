import * as Yup from "yup";

export const categorySchema = Yup.object({
  name: Yup.string().required().label("Name"),
  slug: Yup.string().required().label("Slug"),

  priority: Yup.number().required().label("Priority"),

  categories: Yup.array().required().label("Categories"),
  image: Yup.string().label("Image"),

  isApplication: Yup.bool().label("Application"),
  isAddedToNavigation: Yup.bool().label("Added To Navigation"),

  shortDescription: Yup.string().label("Short Description"),

  listingTitle: Yup.string().label("Listing Title"),
  listingImage: Yup.string().label("Listing Image"),
  listingDescription: Yup.string().label("Listing Description"),

  metaTitle: Yup.string().label("Meta Title"),
  metaDescription: Yup.string().label("Meta Description"),
  metaKeywords: Yup.string().label("Meta Keywords"),
  status: Yup.bool().label("Status"),
});

export const categoryInitialValues: CategoryValues = {
  name: "",
  slug: "",

  priority: 0,

  isApplication: "false",
  isAddedToNavigation: "false",

  categories: null,
  image: "",

  shortDescription: "",

  listingTitle: "",
  listingImage: "",
  listingDescription: "",

  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  status: "true",
};

export interface CategoryValues {
  name: string;
  slug: string;

  priority: number;

  isApplication: string;
  isAddedToNavigation: string;

  categories: { label: ""; value: "" }[] | null;
  image: string;

  shortDescription: string;

  listingTitle: string;
  listingImage: string;
  listingDescription: string;

  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  status: string;
}
