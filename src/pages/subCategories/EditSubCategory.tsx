import {
  CustomSelect,
  GoBackButton,
  InputBox,
  OverlayLoading,
  SubmitButton,
  TextareaBox,
} from "../../components";
import { FormikHelpers, useFormik } from "formik";
import {
  categorySchema,
  CategoryValues,
  categoryInitialValues,
} from "../../validationSchemas/subCategorySchema";

import { useEffect, useState } from "react";
import { get, put, remove } from "../../utills";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL, FILE_URL } from "../../constants";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ReactHelmet } from "../../components/ui/ReactHelmet";

export function EditSubCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
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
    setFieldError,
  } = useFormik({
    onSubmit: async function (
      values: CategoryValues,
      helpers: FormikHelpers<CategoryValues>
    ) {
      setUpdating(true);

      const updateValue = {
        ...values,
        categories: values?.categories?.map((item) => {
          return item.value;
        }),
        category: undefined,
      };

      const apiResponse = await put(`/subCategories/${id}`, updateValue);

      if (apiResponse?.status == 200) {
        toast.success(apiResponse?.message);
        navigate(-1);
      } else {
        helpers.setErrors(apiResponse?.errors);
        toast.error(apiResponse?.message);
      }
      setUpdating(false);
    },
    initialValues: categoryInitialValues,
    validationSchema: categorySchema,
  });

  // Get Data From Database
  useEffect(
    function () {
      async function getData(id: string) {
        let url = `/subCategories/${id}`;
        setLoading(true);
        const apiResponse = await get(url, true);
        if (apiResponse?.status == 200) {
          const apiData = apiResponse.body;
          delete apiData.isDeleted;
          delete apiData.createdAt;
          delete apiData.updatedAt;
          delete apiData._id;

          apiData.status = `${apiData.status}`;
          apiData.isApplication = `${apiData.isApplication}`;
          apiData.isAddedToNavigation = `${apiData.isAddedToNavigation}`;

          if (apiData?.categories?.length) {
            apiData.categories = apiData.categories?.map((item: any) => {
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
      const apiResponse = await get("/categories?limit=0", true);
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

  // handleUploadFile
  async function handleUploadFile(
    event: React.ChangeEvent<HTMLInputElement>,
    source?: "MAIN_IMAGE" | "LISTING_IMAGE"
  ) {
    const mimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    const files = event.target.files;

    if (!files || files.length === 0) {
      if (source == "MAIN_IMAGE") {
        setFieldTouched("image", true);
        setFieldError("image", "Image is required field");
        toast.error("Image is required field");
        return;
      } else {
        setFieldTouched("listingImage", true);
        return;
      }
    }

    // Validate MIME type and append valid files to FormData
    // Check if the file's MIME type is in the allowed list
    let file = files[0];
    if (!mimeTypes.includes(file.type)) {
      if (source == "MAIN_IMAGE") {
        setFieldTouched("image", true);
        setFieldError("image", "Must select the valid image file");
        toast.error("Must select the valid image file");
        return;
      } else {
        setFieldTouched("listingImage", true);
        setFieldError("listingImage", "Must select the valid image file");
        toast.error("Must select the valid image file");
        return;
      }
    }

    const formData = new FormData();

    formData.append("files", file);

    try {
      let url = `${API_URL}/fileUploads`;
      const apiResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const apiData = await apiResponse.json();

      if (apiData.status == 200) {
        if (source == "MAIN_IMAGE") {
          setFieldTouched("image", false);
          setFieldError("image", "");
          setFieldValue("image", apiData.body[0].filename);
        } else {
          setFieldTouched("listingImage", false);
          setFieldError("listingImage", "");
          setFieldValue("listingImage", apiData.body[0].filename);
        }
      } else {
        if (source == "MAIN_IMAGE") {
          setFieldTouched("image", false);
          setFieldError("image", apiData.message);
        } else {
          setFieldTouched("listingImage", false);
          setFieldError("listingImage", apiData.message);
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  // handleDeleteFile
  async function handleDeleteFile(
    event: React.MouseEvent<HTMLButtonElement>,
    fileName: string,
    source?: "MAIN_IMAGE" | "LISTING_IMAGE"
  ) {
    event.preventDefault();

    try {
      const apiResponse = await remove(`/fileUploads/${fileName}`);
      if (apiResponse?.status == 200) {
        if (source == "MAIN_IMAGE") {
          setFieldError("image", "");
          setFieldValue("image", "");
        } else {
          setFieldError("listingImage", "");
          setFieldValue("listingImage", "");
        }
      } else {
        if (source == "MAIN_IMAGE") {
          setFieldError("image", "");
          setFieldValue("image", "");
        } else {
          setFieldError("listingImage", "");
          setFieldValue("listingImage", "");
        }
        toast.error(apiResponse?.message);
      }

      if (source == "MAIN_IMAGE") {
        const fileInput = document.getElementById(
          `imageFile`
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ""; // Clear the input field
        }
      } else {
        const fileInput = document.getElementById(
          `listingImageFile`
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ""; // Clear the input field
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  function addUrlToFile(file: any) {
    return `${FILE_URL}/${file}`;
  }

  return (
    <>
      <ReactHelmet
        title="Edit Sub Category : Crown"
        description="Edit Sub Category"
      />

      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <GoBackButton />
                <h4 className="font-weight-bold mb-0">Edit Sub Category</h4>
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
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <InputBox
                        label="Category Name"
                        name="name"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Enter category name"
                        value={values.name}
                        required={true}
                        touched={touched.name}
                        error={errors.name}
                      />
                    </div>

                    <div className="form-group col-md-6">
                      <InputBox
                        label="Category Slug"
                        name="slug"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Enter category slug"
                        value={values.slug}
                        required={true}
                        touched={touched.slug}
                        error={errors.slug}
                      />
                    </div>
                    <div className="form-group col-md-8">
                      <label htmlFor={"imageFile"}>
                        Category Image
                        {/* <span className="text-danger"> *</span> */}
                      </label>
                      <div className="d-flex gap-2">
                        <input
                          type="file"
                          name="imageFile"
                          id="imageFile"
                          onChange={(evt) => {
                            handleUploadFile(evt, "MAIN_IMAGE");
                          }}
                          className="form-control"
                        />
                        {values.image ? (
                          <Link to={`${values.image}`} target="_blank">
                            <img
                              className="img"
                              height={43}
                              width={43}
                              src={`${addUrlToFile(values.image)}`}
                            />
                          </Link>
                        ) : null}
                        {values.image ? (
                          <button
                            type="button"
                            className="btn p-1"
                            onClick={(evt) => {
                              handleDeleteFile(evt, values.image, "MAIN_IMAGE");
                            }}
                          >
                            <i className="fa fa-trash text-danger"></i>
                          </button>
                        ) : null}
                      </div>
                      {touched.image && errors.image ? (
                        <p className="custom-form-error text-danger">
                          {errors.image}
                        </p>
                      ) : null}
                    </div>

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
                        handleChange={(value) => {
                          setFieldValue("categories", value);
                        }}
                        handleBlur={() => {
                          setFieldTouched("categories", true);
                        }}
                        isMulti={true}
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

                    <div className="form-group col-md-12">
                      <InputBox
                        label="Short Description"
                        name="shortDescription"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Enter description"
                        value={values.shortDescription}
                        touched={touched.shortDescription}
                        error={errors.shortDescription}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="">
                        Status <span className="text-danger">*</span>
                      </label>
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

                    <div className="form-group col-md-4">
                      <label htmlFor="">
                        Is Application <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex gap-3">
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="isApplication"
                            id="isApplicationTrue"
                            value={"true"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.isApplication == "true"}
                          />
                          <label htmlFor="isApplicationTrue" className="mt-2">
                            Yes
                          </label>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <input
                            type="radio"
                            name="isApplication"
                            id="isApplicationFalse"
                            value={"false"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.isApplication == "false"}
                          />
                          <label htmlFor="isApplicationFalse" className="mt-2">
                            No
                          </label>
                        </div>
                      </div>
                      {errors.isApplication && touched.isApplication ? (
                        <p className="custom-form-error text-danger">
                          {errors.isApplication}
                        </p>
                      ) : null}
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="">
                        Add To Navigation <span className="text-danger">*</span>
                      </label>

                      <div className="d-flex gap-3">
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="radio"
                            name="isAddedToNavigation"
                            id="isAddedToNavigationTrue"
                            value={"true"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.isAddedToNavigation == "true"}
                          />
                          <label
                            htmlFor="isAddedToNavigationTrue"
                            className="mt-2"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <input
                            type="radio"
                            name="isAddedToNavigation"
                            id="isAddedToNavigationFalse"
                            value={"false"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.isAddedToNavigation == "false"}
                          />
                          <label
                            htmlFor="isAddedToNavigationFalse"
                            className="mt-2"
                          >
                            No
                          </label>
                        </div>
                      </div>
                      {errors.isAddedToNavigation &&
                      touched.isAddedToNavigation ? (
                        <p className="custom-form-error text-danger">
                          {errors.isAddedToNavigation}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Listing Details */}
              <div className="card rounded-2 mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="mb-2">Listing Details</h5>
                    </div>
                    <div className="form-group col-md-12">
                      <InputBox
                        label="Listing Title"
                        name="listingTitle"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Enter title"
                        value={values.listingTitle}
                        touched={touched.listingTitle}
                        error={errors.listingTitle}
                      />
                    </div>
                    {/* <div className="form-group col-md-12">
                    <TextareaBox
                      label="Listing Description"
                      name="listingDescription"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      placeholder="Enter description"
                      value={values.listingDescription}
                      touched={touched.listingDescription}
                      error={errors.listingDescription}
                    />
                  </div> */}

                    <div className="col-md-12 form-group">
                      <label htmlFor={"description"} className="mb-2">
                        Listing Description
                      </label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={values.listingDescription}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setFieldValue("listingDescription", data);
                        }}
                        onBlur={(event, editor) => {
                          setFieldTouched("listingDescription", true);
                        }}
                        onFocus={(event, editor) => {}}
                        id={"listingDescription"}
                      />
                      {errors.listingDescription &&
                      touched.listingDescription ? (
                        <p className="custom-form-error text-danger">
                          {errors.listingDescription}
                        </p>
                      ) : null}
                    </div>

                    <div className="form-group col-md-8">
                      <label htmlFor={"listingImageFile"}>Listing Image</label>
                      <div className="d-flex gap-2">
                        <input
                          type="file"
                          name="listingImageFile"
                          id="listingImageFile"
                          onChange={(evt) => {
                            handleUploadFile(evt, "LISTING_IMAGE");
                          }}
                          className="form-control"
                        />
                        {values.listingImage ? (
                          <Link to={`${values.listingImage}`} target="_blank">
                            <img
                              className="img"
                              height={43}
                              width={43}
                              src={`${addUrlToFile(values.listingImage)}`}
                            />
                          </Link>
                        ) : null}
                        {values.listingImage ? (
                          <button
                            type="button"
                            className="btn p-1"
                            onClick={(evt) => {
                              handleDeleteFile(
                                evt,
                                values.listingImage,
                                "LISTING_IMAGE"
                              );
                            }}
                          >
                            <i className="fa fa-trash text-danger"></i>
                          </button>
                        ) : null}
                      </div>
                      {touched.listingImage && errors.listingImage ? (
                        <p className="custom-form-error text-danger">
                          {errors.listingImage}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* META Details */}
              <div className="card rounded-2 mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="mb-2">META Details</h5>
                    </div>
                    <div className="form-group col-md-12">
                      <InputBox
                        label="Meta Title"
                        name="metaTitle"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Enter meta title"
                        value={values.metaTitle}
                        touched={touched.metaTitle}
                        error={errors.metaTitle}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <TextareaBox
                        label="Meta Description"
                        name="metaDescription"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        placeholder="Enter meta description"
                        value={values.metaDescription}
                        touched={touched.metaDescription}
                        error={errors.metaDescription}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <TextareaBox
                        label="Meta Keywords"
                        name="metaKeywords"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        placeholder="Enter meta keywords (comma saparated values)"
                        value={values.metaKeywords}
                        touched={touched.metaKeywords}
                        error={errors.metaKeywords}
                      />
                    </div>

                    <div className="">
                      <SubmitButton loading={updating} text="Update Category" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
