import { GoBackButton } from "../../components";

import React, { useEffect, useState } from "react";
import { generateSlug, get, post } from "../../utills";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Papa from "papaparse";
import { createProduct } from "../../csvHelpers/productCsv";
import { CSVLink } from "react-csv";

export function AddProductViaCSV() {
  const navigate = useNavigate();

  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [decorSeries, setDecorSeries] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);

  const [uploadedProducts, setUploadedProducts] = useState<any[]>([]);
  const [failedProducts, setFailedProducts] = useState<any[]>([]);

  type Size = { size: string; finishes: any[]; error: string };

  async function handleSubmit() {
    setLoading(true);

    for (let item of csvData) {
      const newValue = {
        ...item,
        categories: item.categories?.map((item: any) => {
          return item._id;
        }),
        subCategories: item.subCategories?.map((item: any) => {
          return item._id;
        }),
        decorSeries: item.decorSeries?._id,

        sizes: item.sizes?.map((item: any) => {
          return item._id;
        }),

        status: item?.status?.toLowerCase(),

        image: item.image,
      };

      const apiResponse = await post("/products", newValue, true);

      if (apiResponse?.status == 200) {
        setUploadedProducts((old) => {
          return [...old, apiResponse.body];
        });

        // toast.success(apiResponse?.message);
      } else {
        // toast.error(apiResponse?.message);
        setFailedProducts((old) => {
          return [...old, newValue];
        });
      }
    }

    setLoading(false);
  }

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files: any = null;

    if (event?.target?.files) {
      files = event?.target?.files[0];
    }
    if (files) {
      setUploadLoading(true);

      Papa.parse(files, {
        complete: async (results: any) => {
          let keys = results.data[0];
          // I want to remove some óíúáé, blan spaces, etc
          keys = results.data[0].map((v: any) =>
            v
              // .toLowerCase()
              .replace(/ /g, "_")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          );

          let values = results.data.slice(1);
          let objects = values.map((array: any) => {
            let object: any = {};
            keys.forEach((key: any, i: number) => (object[key] = array[i]));
            return object;
          });

          let arrayOfData = [];
          for (let item of objects) {
            if (item.name) {
              if (!item.slug) {
                item.slug = generateSlug(item.name);
              }

              let cats = handleGetCategoryDetails(item.categories);
              item.categories = cats;

              let subCats = handleGetSubCategoryDetails(item.subCategories);
              item.subCategories = subCats;

              let sizs = handleGetSizeDetails(item.sizes);
              item.sizes = sizs;

              let decor = handleGetDecorSeriesDetails(item.decorSeries);
              item.decorSeries = decor;

              // submitHandler(item);
              arrayOfData.push(item);
            }
          }

          setCsvData(arrayOfData);
        },
      });
    }
  };

  // Get Categories
  useEffect(function () {
    async function getData() {
      setLoading(true);
      let url = `/categories?limit=100`;
      const apiResponse = await get(url, true);
      if (apiResponse?.status == 200) {
        setCategories(apiResponse.body);
      } else {
        toast.error(apiResponse?.message);
      }
      setLoading(false);
    }
    getData();
  }, []);

  // Get Sub Categories
  useEffect(function () {
    async function getData() {
      setLoading(true);
      let url = `/subCategories?limit=100`;
      const apiResponse = await get(url, true);
      if (apiResponse?.status == 200) {
        setSubCategories(apiResponse.body);
      } else {
        toast.error(apiResponse?.message);
      }
      setLoading(false);
    }
    getData();
  }, []);

  // Get Sizes
  useEffect(function () {
    async function getData() {
      setLoading(true);
      let url = `/sizes?limit=100`;
      const apiResponse = await get(url, true);
      if (apiResponse?.status == 200) {
        setSizes(apiResponse.body);
      } else {
        toast.error(apiResponse?.message);
      }
      setLoading(false);
    }
    getData();
  }, []);

  // Get Decor Series
  useEffect(function () {
    async function getData() {
      setLoading(true);
      let url = `/decorSeries?limit=100`;
      const apiResponse = await get(url, true);
      if (apiResponse?.status == 200) {
        setDecorSeries(apiResponse.body);
      } else {
        toast.error(apiResponse?.message);
      }
      setLoading(false);
    }
    getData();
  }, []);

  function handleGetCategoryDetails(categoriesSlug: string[]) {
    // Filter categories based on the provided slugs
    return categories.filter((category) =>
      categoriesSlug.includes(category.slug)
    );
  }

  function handleGetSubCategoryDetails(categoriesSlug: string[]) {
    // Filter categories based on the provided slugs
    return subCategories.filter((category) =>
      categoriesSlug.includes(category.slug)
    );
  }

  function handleGetSizeDetails(sizeTitles: string[]) {
    // Filter categories based on the provided slugs
    return sizes.filter((size) => sizeTitles.includes(size.title));
  }

  function handleGetDecorSeriesDetails(decorSeriesText: string) {
    let data = decorSeries.filter((size) => decorSeriesText == size.title);
    if (data.length) {
      return data[0];
    } else {
      return {};
    }
  }

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <GoBackButton />
              <h4 className="font-weight-bold mb-0">Add Product Via CSV</h4>
            </div>
            <div>
              <CSVLink
                className="btn btn-primary text-light"
                data={createProduct.data}
                headers={createProduct.headers}
                filename="products.csv"
              >
                Download CSV
              </CSVLink>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          {/* Basic Details */}
          <div className="card rounded-2">
            <div className="card-body">
              <form className="forms-sample">
                <div className="row">
                  {/* <div className="col-md-12">
                    <h5 className="mb-2">Basic Details</h5>
                  </div> */}

                  {/* Product Name */}
                  <div className="form-group col-md-12">
                    <label htmlFor="">
                      Upload CSV <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={fileChangeHandler}
                    />
                  </div>

                  <div className="">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={handleSubmit}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Product Preview */}
        <div className="col-md-12">
          <div className="card rounded-2 my-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <h5
                    className="mb-2 cursor-hand"
                    data-bs-toggle="collapse"
                    data-bs-target="#metaDetails"
                    aria-expanded="false"
                    aria-controls="metaDetails"
                  >
                    Product Preview
                  </h5>
                  <button
                    className="btn btn-light p-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#metaDetails"
                    aria-expanded="false"
                    aria-controls="metaDetails"
                  >
                    <i className="fa fa-angle-down text-primary" />
                  </button>
                </div>

                <div className="collapse mt-2" id="metaDetails">
                  <div className=" shadow-none p-2 mb-3">
                    <div className="col-md-12 table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>NAME</th>
                            <th>SLUG</th>
                            <th>CATEGORIES</th>
                            <th>SUB CATEGORIES</th>
                            <th>SIZES</th>
                            <th>DECOR SERIES</th>
                            <th>DECOR NUMBER</th>
                            <th>DECOR NAME</th>
                            <th>RAL NUMBER</th>
                          </tr>
                        </thead>
                        <tbody>
                          {csvData?.map((item: any) => {
                            return (
                              <tr>
                                <td>{item.name}</td>
                                <td>{item.slug}</td>
                                <td>
                                  {item?.categories?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.name}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>
                                <td>
                                  {item?.subCategories?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.name}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>

                                <td>
                                  {item?.sizes?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.title}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>

                                <td>{item?.decorSeries?.title}</td>
                                <td>{item.decorNumber}</td>
                                <td>{item.decorName}</td>
                                <td>{item.ralNumber}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Failed Uploading */}
        <div className="col-md-12">
          <div className="card rounded-2 my-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <h5
                    className="mb-2 cursor-hand"
                    data-bs-toggle="collapse"
                    data-bs-target="#metaDetails"
                    aria-expanded="false"
                    aria-controls="metaDetails"
                  >
                    Failed Uploading
                  </h5>
                  <button
                    className="btn btn-light p-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#metaDetails"
                    aria-expanded="false"
                    aria-controls="metaDetails"
                  >
                    <i className="fa fa-angle-down text-primary" />
                  </button>
                </div>

                <div className="collapse mt-2" id="metaDetails">
                  <div className=" shadow-none p-2 mb-3">
                    <div className="col-md-12 table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>NAME</th>
                            <th>SLUG</th>
                            <th>CATEGORIES</th>
                            <th>SUB CATEGORIES</th>
                            <th>SIZES</th>
                            <th>DECOR SERIES</th>
                            <th>DECOR NUMBER</th>
                            <th>DECOR NAME</th>
                            <th>RAL NUMBER</th>
                          </tr>
                        </thead>
                        <tbody>
                          {failedProducts?.map((item: any) => {
                            return (
                              <tr>
                                <td>{item.name}</td>
                                <td>{item.slug}</td>
                                <td>
                                  {item?.categories?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.name}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>
                                <td>
                                  {item?.subCategories?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.name}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>

                                <td>
                                  {item?.sizes?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.title}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>

                                <td>{item?.decorSeries?.title}</td>
                                <td>{item.decorNumber}</td>
                                <td>{item.decorName}</td>
                                <td>{item.ralNumber}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Products */}
        <div className="col-md-12">
          <div className="card rounded-2 my-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <h5
                    className="mb-2 cursor-hand"
                    data-bs-toggle="collapse"
                    data-bs-target="#metaDetails"
                    aria-expanded="false"
                    aria-controls="metaDetails"
                  >
                    Uploaded Products
                  </h5>
                  <button
                    className="btn btn-light p-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#metaDetails"
                    aria-expanded="false"
                    aria-controls="metaDetails"
                  >
                    <i className="fa fa-angle-down text-primary" />
                  </button>
                </div>

                <div className="collapse mt-2" id="metaDetails">
                  <div className=" shadow-none p-2 mb-3">
                    <div className="col-md-12 table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>NAME</th>
                            <th>SLUG</th>
                            <th>CATEGORIES</th>
                            <th>SUB CATEGORIES</th>
                            <th>SIZES</th>
                            <th>DECOR SERIES</th>
                            <th>DECOR NUMBER</th>
                            <th>DECOR NAME</th>
                            <th>RAL NUMBER</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uploadedProducts?.map((item: any) => {
                            return (
                              <tr>
                                <td>{item.name}</td>
                                <td>{item.slug}</td>
                                <td>
                                  {item?.categories?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.name}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>
                                <td>
                                  {item?.subCategories?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.name}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>

                                <td>
                                  {item?.sizes?.map((item: any) => {
                                    return (
                                      <>
                                        <span>{item.title}</span> <br />
                                      </>
                                    );
                                  })}
                                </td>

                                <td>{item?.decorSeries?.title}</td>
                                <td>{item.decorNumber}</td>
                                <td>{item.decorName}</td>
                                <td>{item.ralNumber}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
