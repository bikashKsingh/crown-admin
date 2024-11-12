import * as Yup from "yup";

export const categorySchema = Yup.object({
  name: Yup.string().required().label("Name"),
  slug: Yup.string().required().label("Slug"),
  textOverImage: Yup.string().label("Text Over Image"),
  image: Yup.string().required().label("Image"),
  buttonText: Yup.string().label("Button Text"),
  shortDescription: Yup.string().label("Short Description"),
  metaTitle: Yup.string().label("Meta Title"),
  metaDescription: Yup.string().label("Meta Description"),
  metaKeywords: Yup.string().label("Meta Keywords"),

  listingTitle: Yup.string().label("Listing Title"),
  listingImage: Yup.string().label("Listing Image"),
  listingDescription: Yup.string().label("Listing Description"),

  status: Yup.string().label("Status"),
});

export const categoryInitialValues: CategoryValues = {
  name: "",
  slug: "",
  textOverImage: "",
  image: "",
  buttonText: "",
  shortDescription: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  listingTitle: "",
  listingImage: "",
  listingDescription: "",
  status: "true",
};

export interface CategoryValues {
  name: string;
  slug: string;
  textOverImage: string;
  image: string;
  buttonText: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  listingTitle: string;
  listingImage: string;
  listingDescription: string;

  status: string;
}
