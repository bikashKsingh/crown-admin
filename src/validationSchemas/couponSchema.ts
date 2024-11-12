import * as Yup from "yup";
import {
  CoponUserTypes,
  CouponDiscountTypes,
  CouponStatusTypes,
} from "../constants";

export const couponSchema = Yup.object({
  couponCode: Yup.string().required().label("Coupon Code"),
  applyFor: Yup.object().required().label("Apply For"),
  discountType: Yup.object().required().label("Discount Type"),
  discount: Yup.number().required().label("Discount"),
  description: Yup.string().label("Description"),
  minimumAmount: Yup.number().required().label("Minimum Amount"),
  numberOfUsesTimes: Yup.number().required().label("No of Uses"),
  startDate: Yup.string().required().label("Start Date"),
  expiryDate: Yup.string().required().label("Expiry Date"),
  couponStatus: Yup.object().required().label("Coupon Status"),
});

export const couponInitialValues: CouponValues = {
  couponCode: "",
  applyFor: null,
  discountType: null,
  discount: "",
  description: "",
  minimumAmount: "",
  numberOfUsesTimes: "",
  startDate: "",
  expiryDate: "",
  couponStatus: null,
};

export interface CouponValues {
  couponCode: string;
  applyFor: {
    label: string;
    value: CoponUserTypes;
  } | null;
  discountType: {
    label: string;
    value: CouponDiscountTypes;
  } | null;
  discount: string;
  description: string;
  minimumAmount: string;
  numberOfUsesTimes: string;
  startDate: string;
  expiryDate: string;
  couponStatus: {
    label: string;
    value: CouponStatusTypes;
  } | null;
}
