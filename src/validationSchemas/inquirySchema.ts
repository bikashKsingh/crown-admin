import * as Yup from "yup";

export const inquirySchema = Yup.object({
  name: Yup.string().required().label("Name"),
  email: Yup.string().email().required().label("Email"),
  mobile: Yup.string().required().label("Mobile"),
  message: Yup.string().label("Message"),
  address: Yup.string().label("Address"),
  city: Yup.string().label("City"),
  state: Yup.string().label("State"),
  country: Yup.string().label("Country"),
  pincode: Yup.string().label("Pincode"),
  inquiryStatus: Yup.string().label("Inquiry Status"),
});

export const inquiryInitialValues: InquiryValues = {
  name: "",
  email: "",
  mobile: "",
  message: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  inquiryStatus: "PENDING",
};

export interface InquiryValues {
  name: string;
  email: string;
  mobile: string;
  message: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  inquiryStatus: string;
}
