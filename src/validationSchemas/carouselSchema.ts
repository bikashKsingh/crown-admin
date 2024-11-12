import * as Yup from "yup";

export const carouselSchema = Yup.object({
  title: Yup.string().required().label("Title"),
  subTitle: Yup.string().label("Sub Title"),
  image: Yup.string().required().label("Image"),
  shortDescription: Yup.string().label("Short Description"),
  buttonText: Yup.string().label("Button Text"),
  buttonLink: Yup.string().label("Button Link"),
  status: Yup.string().label("Status"),
});

export const carouselInitialValues: CarouselValues = {
  title: "",
  subTitle: "",
  image: "",
  shortDescription: "",
  buttonText: "",
  buttonLink: "",
  status: "true",
};

export interface CarouselValues {
  title: string;
  subTitle: string;
  image: string;
  shortDescription: string;
  buttonText: string;
  buttonLink: string;
  status: string;
}
