import * as Yup from "yup";

export const typeSchema = Yup.object({
  title: Yup.string().required().label("Title"),
  status: Yup.string().required().label("Status"),
});

export const typeInitialValues: TypeValues = {
  title: "",
  status: "true",
};

export interface TypeValues {
  title: string;
  status: string;
}
