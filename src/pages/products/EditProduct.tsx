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
  productSchema,
  ProductValues,
  productInitialValues,
} from "../../validationSchemas/productSchema";
import React, { useEffect, useState } from "react";
import {
  generateSlug,
  get,
  post,
  put,
  remove,
  validateNumber,
  validateSlug,
  validateTextNumber,
} from "../../utills";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
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
    setValues,
  } = useFormik({
    onSubmit: async function (
      values: ProductValues,
      helpers: FormikHelpers<ProductValues>
    ) {
      const newValue = {
        ...values,
        categories: values.categories?.map((item) => {
          return item.value;
        }),
        subCategories: values.subCategories?.map((item) => {
          return item.value;
        }),
        type: values.type?.value,
        sizes: values.sizes?.map((item) => item.value),
        images: uploadedImages || [],
      };
      const apiResponse = await put(`/products/${id}`, newValue);

      if (apiResponse?.status == 200) {
        toast.success(apiResponse?.message);
        navigate(-1);
      } else {
        helpers.setErrors(apiResponse?.errors);
        toast.error(apiResponse?.message);
      }
    },
    initialValues: productInitialValues,
    validationSchema: productSchema,
  });

  // get product details
  useEffect(
    function () {
      async function getData(id: string) {
        setLoading(true);
        const apiResponse: any = await get(`/products/${id}`, true);
        if (apiResponse?.status == 200) {
          const data: any = apiResponse.body;

          delete data._id;
          delete data.createdAt;
          delete data.updatedAt;

          delete data.category;
          delete data.subCategory;

          if (data.categories?.length) {
            data.categories = data.categories.map((item: any) => {
              return {
                label: item.name,
                value: item._id,
              };
            });
          }

          if (data.subCategories?.length) {
            data.subCategories = data.subCategories.map((item: any) => {
              return {
                label: item.name,
                value: item._id,
              };
            });
          }

          if (data?.type) {
            data.type = {
              label: data.type.title,
              value: data.type._id,
            };
          }

          if (data?.sizes?.length) {
            data.sizes = data?.sizes?.map((item: any) => {
              return {
                label: item.title,
                value: item._id,
              };
            });
          }

          if (data?.images?.length) {
            setUploadedImages(data.images);
          }

          data.status = `${data.status}`;

          setValues(data);
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
      const apiResponse = await get("/categories", true);
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

  // get sub category
  useEffect(
    function () {
      async function getData() {
        let url = `/subCategories?status=true`;
        if (values.categories?.length == 1) {
          url += `&category=${values.categories[0]?.value}`;
        } else if ((values.categories?.length as number) > 1) {
          if (values.categories != null) {
            for (let cat of values.categories) {
              url += `&categories=${cat?.value}`;
            }
          }
        }

        console.log(url);

        const apiResponse = await get(url, true);
        if (apiResponse?.status == 200) {
          const modifiedValue = apiResponse?.body?.map((value: any) => {
            return {
              label: value.name,
              value: value._id,
            };
          });
          setSubCategories(modifiedValue);
        }
      }
      getData();
    },
    [values.categories?.length]
  );

  // get Types
  useEffect(function () {
    async function getData() {
      let url = `/types`;

      const apiResponse = await get(url, true);

      if (apiResponse?.status == 200) {
        const modifiedValue = apiResponse?.body?.map((value: any) => {
          return {
            label: value.title,
            value: value._id,
          };
        });
        setTypes(modifiedValue);
      }
    }
    getData();
  }, []);

  // get Size
  useEffect(function () {
    async function getData() {
      let url = `/sizes`;
      const apiResponse = await get(url, true);
      if (apiResponse?.status == 200) {
        const modifiedValue = apiResponse?.body?.map((value: any) => {
          return {
            label: value.title,
            value: value._id,
          };
        });
        setSizes(modifiedValue);
      }
    }
    getData();
  }, []);

  // handleUploadFile
  async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const mimeTypes = ["image/jpeg", "image/png", "image/webp"];

    const files = event.target.files;

    if (!files || files.length === 0) {
      toast.error("Please select at least one file.");
      return;
    }

    const formData = new FormData();

    // Validate MIME type and append valid files to FormData
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if the file's MIME type is in the allowed list
      if (!mimeTypes.includes(file.type)) {
        // if (inputElementName == "kycFile") {
        //   let kycDocsFiles = [...kycDocuments];
        //   kycDocuments[index]["error"] = "File type is not allowed";
        //   return setKycDocumnets(kycDocsFiles);
        // } else if (inputElementName == "certificateFile") {
        //   let certificateFields = [...faqsInputFields];
        //   certificateFields[index]["error"] = "File type is not allowed";
        //   return setFaqsInputFields(certificateFields);
        // }
      }
    }

    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      let url = `${API_URL}/fileUploads`;
      const apiResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const apiData = await apiResponse.json();

      if (apiData.status == 200) {
        let images = apiData?.body?.map((item: any) => item.filepath);

        setUploadedImages((old) => {
          return [...old, ...images];
        });
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  // handleDeleteFile
  async function handleDeleteFile(
    event: React.MouseEvent<HTMLButtonElement>,
    fileName: string,
    index: number
  ) {
    event.preventDefault();
    try {
      const apiResponse = await remove(`/fileUploads/${fileName}`);

      if (apiResponse?.status == 200) {
        let images = [...uploadedImages];
        images.splice(index, 1);
        setUploadedImages(images);
      } else {
        let images = [...uploadedImages];
        images.splice(index, 1);
        setUploadedImages(images);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  // handleUploadProfilePic
  async function handleUploadProfilePic(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const mimeTypes = ["image/png", "image/jpg", "image/jpeg"];

    const files = event.target.files;

    if (!files || files.length === 0) {
      setFieldTouched("defaultImage", true);
      setFieldError("defaultImage", "Profile Photo is required field");
      toast.error("Profile Photo is required field");
      return;
    }

    // Validate MIME type and append valid files to FormData
    // Check if the file's MIME type is in the allowed list
    let file = files[0];
    if (!mimeTypes.includes(file.type)) {
      setFieldTouched("defaultImage", true);
      setFieldError("defaultImage", "Must select the valid image file");
      toast.error("Must select the valid image file");
      return;
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
        setFieldTouched("defaultImage", false);
        setFieldError("defaultImage", "");
        setFieldValue("defaultImage", apiData.body[0].filepath);
      } else {
        setFieldTouched("defaultImage", false);
        setFieldError("defaultImage", apiData.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  // handleDeleteProfilePic
  async function handleDeleteProfilePic(
    event: React.MouseEvent<HTMLButtonElement>,
    fileName: string
  ) {
    event.preventDefault();

    try {
      const apiResponse = await remove(`/fileUploads/${fileName}`);
      if (apiResponse?.status == 200) {
        setFieldError("defaultImage", "");
        setFieldValue("defaultImage", "");
      } else {
        setFieldError("defaultImage", "");
        setFieldValue("defaultImage", "");
        toast.error(apiResponse?.message);
      }

      const fileInput = document.getElementById(
        `defaultImageFile`
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Clear the input field
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  function getFileNameFromUrl(url: any) {
    // Create a URL object
    const urlObj = new URL(url);

    // Get the pathname from the URL
    const pathname = urlObj.pathname;

    // Extract the last part of the pathname as the filename
    const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);

    return fileName;
  }

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <GoBackButton />
              <h4 className="font-weight-bold mb-0">Update Product</h4>
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
            {/* Basic Details */}
            <div className="card rounded-2">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="mb-2">Basic Details</h5>
                  </div>

                  {/* Product Name */}
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Product Name"
                      name="name"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter program name"
                      value={values.name}
                      required={true}
                      touched={touched.name}
                      error={errors.name}
                    />
                  </div>

                  {/* Slug */}
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Product Slug"
                      name="slug"
                      handleBlur={handleBlur}
                      handleChange={(evt) => {
                        setFieldValue("slug", validateSlug(evt.target.value));
                      }}
                      type="text"
                      placeholder="Enter slug"
                      value={values.slug}
                      required={true}
                      touched={touched.slug}
                      error={errors.slug}
                    />
                  </div>

                  {/* Sale Price */}
                  {/* <div className="form-group col-md-6">
                    <InputBox
                      label="Sale Price"
                      name="salePrice"
                      handleBlur={handleBlur}
                      handleChange={(evt) => {
                        setFieldValue(
                          "salePrice",
                          validateNumber(evt.target.value)
                        );
                      }}
                      type="text"
                      placeholder="Enter sale price"
                      value={values.salePrice}
                      required={false}
                      touched={touched.salePrice}
                      error={errors.salePrice}
                    />
                  </div> */}

                  {/* MRP */}
                  {/* <div className="form-group col-md-6">
                    <InputBox
                      label="MRP"
                      name="mrp"
                      handleBlur={handleBlur}
                      handleChange={(evt) => {
                        setFieldValue("mrp", validateNumber(evt.target.value));
                      }}
                      type="text"
                      placeholder="Enter mrp"
                      value={values.mrp}
                      required={false}
                      touched={touched.mrp}
                      error={errors.mrp}
                    />
                  </div> */}

                  {/* Select Categories */}
                  <div className="form-group col-md-6">
                    <CustomSelect
                      label="Select Categories"
                      placeholder="Select Categories"
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

                  {/* Select Sub Categories */}
                  <div className="form-group col-md-6">
                    <CustomSelect
                      label="Select Sub Categories"
                      placeholder="Select Categories"
                      name="subCategories"
                      required={true}
                      options={subCategories}
                      value={values.subCategories}
                      error={errors.subCategories}
                      touched={touched.subCategories}
                      handleChange={(value) => {
                        setFieldValue("subCategories", value);
                      }}
                      handleBlur={() => {
                        setFieldTouched("subCategories", true);
                      }}
                      isMulti={true}
                    />
                  </div>

                  {/* Select Type */}
                  <div className="form-group col-md-6">
                    <CustomSelect
                      label="Select Type"
                      placeholder="Select type"
                      name="type"
                      required={true}
                      options={types}
                      value={values.type}
                      error={errors.type}
                      touched={touched.type}
                      handleChange={(value) => {
                        setFieldValue("type", value);
                      }}
                      handleBlur={() => {
                        setFieldTouched("type", true);
                      }}
                    />
                  </div>

                  {/* Select Size */}
                  <div className="form-group col-md-6">
                    <CustomSelect
                      label="Select Size"
                      placeholder="Select size"
                      name="sizes"
                      required={true}
                      options={sizes}
                      value={values.sizes}
                      error={errors.sizes}
                      touched={touched.sizes}
                      handleChange={(value) => {
                        setFieldValue("sizes", value);
                      }}
                      handleBlur={() => {
                        setFieldTouched("sizes", true);
                      }}
                      isMulti={true}
                    />
                  </div>

                  {/* Finish */}
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Finish"
                      name="finish"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter finish"
                      value={values.finish}
                      required={false}
                      touched={touched.finish}
                      error={errors.finish}
                    />
                  </div>

                  {/* Decor Name */}
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Decor Name"
                      name="decorName"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter decor name"
                      value={values.decorName}
                      required={false}
                      touched={touched.decorName}
                      error={errors.decorName}
                    />
                  </div>

                  {/* Decor Number */}
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Decor Number"
                      name="decorNumber"
                      handleBlur={handleBlur}
                      handleChange={(evt) => {
                        setFieldValue(
                          "decorNumber",
                          validateNumber(evt.target.value)
                        );
                      }}
                      type="text"
                      placeholder="Enter decor number"
                      value={values.decorNumber}
                      required={false}
                      touched={touched.decorNumber}
                      error={errors.decorNumber}
                    />
                  </div>

                  {/* Product SKU */}
                  <div className="form-group col-md-6">
                    <InputBox
                      label="Product SKU"
                      name="sku"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      type="text"
                      placeholder="Enter sku"
                      value={values.sku}
                      required={false}
                      touched={touched.sku}
                      error={errors.sku}
                    />
                  </div>

                  <div className="form-group col-md-6">
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
                </div>
              </div>
            </div>

            {/* More Details */}
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="mb-2">More Details</h5>
                  </div>
                  <div className="col-md-12 form-group">
                    <label htmlFor={"descriptions"} className="mb-2">
                      Long Descriptions
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.descriptions}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue("descriptions", data);
                      }}
                      onBlur={(event, editor) => {
                        setFieldTouched("descriptions", true);
                      }}
                      onFocus={(event, editor) => {}}
                      id={"descriptions"}
                    />
                    {errors.descriptions && touched.descriptions ? (
                      <p className="custom-form-error text-danger">
                        {errors.descriptions}
                      </p>
                    ) : null}
                  </div>

                  <div className="col-md-12 form-group">
                    <label htmlFor={"description"} className="mb-2">
                      Short Description
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.shortDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue("shortDescription", data);
                      }}
                      onBlur={(event, editor) => {
                        setFieldTouched("shortDescription", true);
                      }}
                      onFocus={(event, editor) => {}}
                      id={"shortDescription"}
                    />
                    {errors.shortDescription && touched.shortDescription ? (
                      <p className="custom-form-error text-danger">
                        {errors.shortDescription}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="mb-3">Product Images</h5>
                  </div>
                  <div className="form-group col-md-8">
                    <label htmlFor={"defaultImageFile"}>
                      Default Image <span className="text-danger"> *</span>
                    </label>
                    <div className="d-flex gap-2">
                      <input
                        type="file"
                        name="defaultImageFile"
                        id="defaultImageFile"
                        onChange={(evt) => {
                          handleUploadProfilePic(evt);
                        }}
                        className="form-control"
                      />
                      {values.defaultImage ? (
                        <Link to={`${values.defaultImage}`} target="_blank">
                          <img
                            className="img"
                            height={43}
                            width={43}
                            src={`${values.defaultImage}`}
                          />
                        </Link>
                      ) : null}
                      {values.defaultImage ? (
                        <button
                          type="button"
                          className="btn p-1"
                          onClick={(evt) => {
                            handleDeleteProfilePic(
                              evt,
                              getFileNameFromUrl(values.defaultImage)
                            );
                          }}
                        >
                          <i className="fa fa-trash text-danger"></i>
                        </button>
                      ) : null}
                    </div>
                    {touched.defaultImage && errors.defaultImage ? (
                      <p className="custom-form-error text-danger">
                        {errors.defaultImage}
                      </p>
                    ) : null}
                  </div>

                  <div className="form-group col-md-8">
                    <label htmlFor={"imagesFile"}>Product Images</label>
                    <div className="d-flex gap-2">
                      <input
                        type="file"
                        name="imagesFile"
                        id="imagesFile"
                        onChange={(evt) => {
                          handleUploadFile(evt);
                        }}
                        className="form-control"
                        multiple={true}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="d-flex gap-4">
                      {uploadedImages?.map((file: string, index: number) => {
                        return (
                          <div className="p-image">
                            <button
                              type="button"
                              className="btn btn-danger p-image-remove"
                              onClick={(evt) => {
                                handleDeleteFile(
                                  evt,
                                  getFileNameFromUrl(file),
                                  index
                                );
                              }}
                            >
                              X
                            </button>
                            <img className="img img-thumbnail" src={file} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Details */}
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="mb-2">Meta Details</h5>
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
                    <SubmitButton loading={false} text="Update Product" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
