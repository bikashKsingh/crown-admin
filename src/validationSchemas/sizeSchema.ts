import * as Yup from "yup";

export const sizeSchema = Yup.object({
  title: Yup.string().required().label("Title"),
  priority: Yup.number().required().label("Priority"),
  categories: Yup.array().required().label("Categories"),
  status: Yup.string().required().label("Status"),
});

export const sizeInitialValues: SizeValues = {
  title: "",
  priority: 0,
  categories: null,
  status: "true",
};

export interface SizeValues {
  title: string;
  priority: number;
  categories:
    | {
        label: string;
        value: string;
      }[]
    | null;
  status: string;
}
