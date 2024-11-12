import {
  CustomSelect,
  GoBackButton,
  InputBox,
  SubmitButton,
  TextareaBox,
} from "../../components";
import { FormikHelpers, useFormik } from "formik";
import {
  userSchema,
  UserValues,
  userInitialValues,
} from "../../validationSchemas/userSchema";
import React, { useEffect, useState } from "react";
import { get, post, put, validateText, validateUsername } from "../../utills";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    setFieldError,
    getFieldProps,
    setValues,
  } = useFormik({
    onSubmit: async function (
      values: UserValues,
      helpers: FormikHelpers<UserValues>
    ) {
      setLoading(true);

      const apiResponse = await put(`/users/${id}`, values);

      if (apiResponse?.status == 200) {
        toast.success(apiResponse?.message);
        navigate(-1);
      } else {
        console.log(apiResponse);

        helpers.setErrors(apiResponse?.errors);
        toast.error(apiResponse?.message);
      }
      setLoading(false);
    },
    initialValues: userInitialValues,
    validationSchema: userSchema,
  });

  // Get Data From Database
  useEffect(
    function () {
      async function getData(id: string) {
        setLoading(true);
        let url = `/users/${id}`;
        const apiResponse = await get(url, true);
        if (apiResponse?.status == 200) {
          const apiData = apiResponse.body;
          delete apiData.isDeleted;
          delete apiData.createdAt;
          delete apiData.updatedAt;
          delete apiData._id;
          delete apiData.status;

          apiData.password = "";

          apiData.dob = moment(apiData.dob).format("YYYY-MM-DD");

          setValues(apiData);
        } else {
          toast.error(apiResponse?.message);
        }

        setLoading(false);
      }

      if (id) getData(id);
    },
    [id]
  );

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <GoBackButton />
              <h4 className="font-weight-bold mb-0">Update User</h4>
            </div>
            {/* <div>
              <button
                type="button"
                className="btn btn-primary btn-icon-text btn-rounded"
              >
                <i className="ti-clipboard btn-icon-prepend"></i>Report
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <form className="forms-sample" onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div className="card rounded-2">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="mb-2">Personal Details</h5>
                  </div>
                  <div className="form-group col-md-6">
                    <InputBox
                      label="User Name"
                      name="name"
                      handleBlur={handleBlur}
                      handleChange={(evt) => {
                        setFieldValue("name", validateText(evt.target.value));
                      }}
                      type="text"
                      placeholder="Enter user name"
                      value={values.name}
                      required={true}
                      touched={touched.name}
                      error={errors.name}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="DOB"
                      name="dob"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="date"
                      placeholder="Enter DOB"
                      value={values.dob}
                      required={true}
                      touched={touched.dob}
                      error={errors.dob}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="">
                      Gender <span className="text-danger">*</span>{" "}
                    </label>
                    <div className="d-flex gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          id="male"
                          value={"MALE"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.gender == "MALE"}
                        />
                        <label htmlFor="male" className="mt-2">
                          MALE
                        </label>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          id="female"
                          value={"FEMALE"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.gender == "FEMALE"}
                        />
                        <label htmlFor="female" className="mt-2">
                          FEMALE
                        </label>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          id="other"
                          value={"OTHER"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.gender == "OTHER"}
                        />
                        <label htmlFor="other" className="mt-2">
                          OTHER
                        </label>
                      </div>
                    </div>
                    {errors.gender ? (
                      <p className="custom-form-error text-danger">
                        {errors.gender}
                      </p>
                    ) : null}
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Email"
                      name="email"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="email"
                      placeholder="Enter email"
                      value={values.email}
                      required={true}
                      touched={touched.email}
                      error={errors.email}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Mobile"
                      name="mobile"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter mobile"
                      value={values.mobile}
                      required={true}
                      touched={touched.mobile}
                      error={errors.mobile}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Password"
                      name="password"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter password"
                      value={values.password}
                      required={true}
                      touched={touched.password}
                      error={errors.password}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* User Address */}
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="mb-3">User Address</h5>
                  </div>
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Address"
                      name="address"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter address"
                      value={values.address}
                      touched={touched.address}
                      error={errors.address}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Locality"
                      name="locality"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter locality"
                      value={values.locality}
                      required={false}
                      touched={touched.locality}
                      error={errors.locality}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="City"
                      name="city"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter city"
                      value={values.city}
                      required={false}
                      touched={touched.city}
                      error={errors.city}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="State"
                      name="state"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter state"
                      value={values.state}
                      required={false}
                      touched={touched.state}
                      error={errors.state}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Country"
                      name="country"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter country"
                      value={values.country}
                      required={false}
                      touched={touched.country}
                      error={errors.country}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Pincode"
                      name="pincode"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter pincode"
                      value={values.pincode}
                      required={false}
                      touched={touched.pincode}
                      error={errors.pincode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Details */}
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="mb-3">Social Links</h5>
                  </div>
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Facebook"
                      name="facebook"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="url"
                      placeholder="Enter facebook url"
                      value={values.facebook}
                      touched={touched.facebook}
                      error={errors.facebook}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Instagram"
                      name="instagram"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="url"
                      placeholder="Enter instagram url"
                      value={values.instagram}
                      required={false}
                      touched={touched.instagram}
                      error={errors.instagram}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Twitter (X)"
                      name="x"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="url"
                      placeholder="Enter twitter url"
                      value={values.x}
                      required={false}
                      touched={touched.x}
                      error={errors.x}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Linkedin"
                      name="linkedin"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="url"
                      placeholder="Enter linkedin url"
                      value={values.linkedin}
                      required={false}
                      touched={touched.linkedin}
                      error={errors.linkedin}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Youtube"
                      name="youtube"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="url"
                      placeholder="Enter youtube url"
                      value={values.youtube}
                      required={false}
                      touched={touched.youtube}
                      error={errors.youtube}
                    />
                  </div>
                </div>

                <SubmitButton loading={false} text="Update User" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
