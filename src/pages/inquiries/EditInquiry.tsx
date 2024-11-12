import {
  CustomSelect,
  GoBackButton,
  InputBox,
  SubmitButton,
  TextareaBox,
} from "../../components";
import { FormikHelpers, useFormik } from "formik";
import {
  inquirySchema,
  InquiryValues,
  inquiryInitialValues,
} from "../../validationSchemas/inquirySchema";
import React, { useEffect, useState } from "react";
import { get, post, put, validateText, validateUsername } from "../../utills";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export function EditInquiry() {
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
      values: InquiryValues,
      helpers: FormikHelpers<InquiryValues>
    ) {
      setLoading(true);

      const apiResponse = await put(`/inquiries/${id}`, values);

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
    initialValues: inquiryInitialValues,
    validationSchema: inquirySchema,
  });

  // Get Data From Database
  useEffect(
    function () {
      async function getData(id: string) {
        setLoading(true);
        let url = `/inquiries/${id}`;
        const apiResponse = await get(url, true);
        if (apiResponse?.status == 200) {
          const apiData = apiResponse.body;
          delete apiData.isDeleted;
          delete apiData.createdAt;
          delete apiData.updatedAt;
          delete apiData._id;
          delete apiData.status;

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
              <h4 className="font-weight-bold mb-0">Update Inquiry</h4>
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
          <div className="card rounded-2">
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Name"
                      name="name"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter name"
                      value={values.name}
                      required={true}
                      touched={touched.name}
                      error={errors.name}
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

                  <div className="form-group col-md-12">
                    <TextareaBox
                      label="Message"
                      name="message"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      placeholder="Enter message"
                      value={values.message}
                      touched={touched.message}
                      error={errors.message}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="">Inquiry Status</label>
                    <div className="d-flex gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="inquiryStatus"
                          id="pending"
                          value={"PENDING"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.inquiryStatus == "PENDING"}
                        />
                        <label htmlFor="pending" className="mt-2">
                          Pending
                        </label>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          name="inquiryStatus"
                          id="resolved"
                          value={"RESOLVED"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.inquiryStatus == "RESOLVED"}
                        />
                        <label htmlFor="resolved" className="mt-2">
                          Resolved
                        </label>
                      </div>
                    </div>
                    {errors.inquiryStatus && touched.inquiryStatus ? (
                      <p className="custom-form-error text-danger">
                        {errors.inquiryStatus}
                      </p>
                    ) : null}
                  </div>
                </div>

                <SubmitButton loading={false} text="Update Inquiry" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
