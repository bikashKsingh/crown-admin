import * as Yup from "yup";

export const userSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  dob: Yup.string().required().label("DOB"),
  gender: Yup.string().required().label("Gender"),
  email: Yup.string().email().required().label("Email"),
  mobile: Yup.string().required().label("Mobile"),
  address: Yup.string().label("Address"),
  locality: Yup.string().label("Locality"),
  city: Yup.string().label("City"),
  state: Yup.string().label("State"),
  country: Yup.string().label("Country"),
  pincode: Yup.string().length(6).label("Pincode"),
  facebook: Yup.string().url().label("Facebook"),
  instagram: Yup.string().url().label("Instagram"),
  twitter: Yup.string().url().label("Twitter"),
  x: Yup.string().url().label("X"),
  youtube: Yup.string().url().label("Youtube"),
  password: Yup.string().label("Password"),
  status: Yup.string().label("Status"),
});

export const userInitialValues: UserValues = {
  name: "",
  dob: "",
  gender: "",
  email: "",
  mobile: "",
  address: "",
  locality: "",
  city: "",
  pincode: "",
  state: "",
  country: "",
  facebook: "",
  instagram: "",
  x: "",
  youtube: "",
  linkedin: "",
  password: "",
  status: "true",
};

export interface UserValues {
  name: string;
  dob: string;
  gender: string;
  email: string;
  mobile: string;
  address: string;
  locality: string;
  city: string;
  pincode: string;
  country: string;
  state: string;
  facebook: string;
  instagram: string;
  x: string;
  youtube: string;
  linkedin: string;
  password: string;
  status: string;
}
