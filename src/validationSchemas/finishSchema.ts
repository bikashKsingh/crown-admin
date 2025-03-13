import * as Yup from "yup";

export const finishSchema = Yup.object({
  shortName: Yup.string().required().label("Short Name"),
  fullName: Yup.string().required().label("Full Name"),
  priority: Yup.number().required().label("Priority"),
  status: Yup.string().required().label("Status"),
});

export const finishInitialValues: FinishValues = {
  shortName: "",
  fullName: "",
  priority: 0,
  status: "true",
};

export interface FinishValues {
  shortName: string;
  fullName: string;
  priority: number;
  status: string;
}
