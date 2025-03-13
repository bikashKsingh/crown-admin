import * as Yup from "yup";

export const decorSeriesSchema = Yup.object({
  title: Yup.string().required().label("Title"),
  priority: Yup.string().required().label("Priority"),
  status: Yup.string().required().label("Status"),
});

export const typeInitialValues: DecorSeriesValues = {
  title: "",
  priority: 0,
  status: "true",
};

export interface DecorSeriesValues {
  title: string;
  priority: number;
  status: string;
}
