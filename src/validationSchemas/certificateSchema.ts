import * as Yup from "yup";

export const certificateSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  file: Yup.string().required().label("File"),

  priority: Yup.number().required().label("Priority"),
  shortDescription: Yup.string().label("Short Description"),

  metaTitle: Yup.string().label("Meta Title"),
  metaDescription: Yup.string().label("Meta Description"),
  metaKeywords: Yup.string().label("Meta Keywords"),

  status: Yup.string().label("Status"),
});

export const certificateInitialValues: CertificateValues = {
  name: "",
  file: "",

  priority: 0,

  shortDescription: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  status: "true",
};

export interface CertificateValues {
  name: string;

  file: string;

  priority: number;

  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  status: string;
}
