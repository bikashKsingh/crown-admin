import {
  CustomSelect,
  GoBackButton,
  InputBox,
  OverlayLoading,
  SubmitButton,
} from "../../components";
import { FormikHelpers, useFormik } from "formik";
import {
  sizeSchema,
  SizeValues,
  sizeInitialValues,
} from "../../validationSchemas/sizeSchema";
import { useEffect, useState } from "react";
import { get, put } from "../../utills";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export function EditSize() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [updading, setUpdating] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    onSubmit: async function (
      values: SizeValues,
      helpers: FormikHelpers<SizeValues>
    ) {
      setUpdating(true);

      let newValues = {
        ...values,
        categories: values?.categories?.map((item) => item.value),
      };

      const apiResponse = await put(`/sizes/${id}`, newValues);

      if (apiResponse?.status == 200) {
        toast.success(apiResponse?.message);
        navigate(-1);
      } else {
        helpers.setErrors(apiResponse?.errors);
        toast.error(apiResponse?.message);
      }
      setUpdating(false);
    },
    initialValues: sizeInitialValues,
    validationSchema: sizeSchema,
  });

  // Get Data From Database
  useEffect(
    function () {
      async function getData(id: string) {
        setLoading(true);
        let url = `/sizes/${id}`;
        const apiResponse = await get(url, true);
        if (apiResponse?.status == 200) {
          const apiData = apiResponse.body;
          apiData.status = `${apiData.status}`;
          delete apiData.isDeleted;
          delete apiData.createdAt;
          delete apiData.updatedAt;
          delete apiData._id;

          if (apiData.categories) {
            apiData.categories = apiData?.categories?.map((item: any) => {
              return {
                label: item.name,
                value: item._id,
              };
            });
          }

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

  // get category
  useEffect(function () {
    async function getData() {
      const apiResponse = await get("/categories?status=true&limit=0", true);
      if (apiResponse?.status == 200) {
        const modifiedValue = apiResponse?.body?.map((value: any) => {
          return {
            label: value.name,
            value: value._id,
          };
        });
        setCategories(modifiedValue);
      }
    }
    getData();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <GoBackButton />
              <h4 className="font-weight-bold mb-0">Edit Size</h4>
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
      {loading ? <OverlayLoading /> : null}

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Title"
                      name="title"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter title"
                      value={values.title}
                      required={true}
                      touched={touched.title}
                      error={errors.title}
                    />
                  </div>

                  {/* Select Category */}
                  <div className="form-group col-md-6">
                    <CustomSelect
                      label="Select Category"
                      placeholder="Select Category"
                      name="categories"
                      required={true}
                      options={categories}
                      value={values.categories}
                      error={errors.categories}
                      touched={touched.categories}
                      isMulti={true}
                      handleChange={(value) => {
                        setFieldValue("categories", value);
                      }}
                      handleBlur={() => {
                        setFieldTouched("categories", true);
                      }}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <InputBox
                      label="Priority"
                      name="priority"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="number"
                      placeholder="Enter priority"
                      value={values.priority}
                      touched={touched.priority}
                      error={errors.priority}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="">Status</label>
                    <div className="d-flex gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          id="true"
                          value={"true"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.status == "true"}
                        />
                        <label htmlFor="true" className="mt-2">
                          Active
                        </label>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <input
                          type="radio"
                          name="status"
                          id="false"
                          value={"false"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.status == "false"}
                        />
                        <label htmlFor="false" className="mt-2">
                          Disabled
                        </label>
                      </div>
                    </div>
                    {errors.status && touched.status ? (
                      <p className="custom-form-error text-danger">
                        {errors.status}
                      </p>
                    ) : null}
                  </div>
                </div>

                <SubmitButton loading={updading} text="Update Interest" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
