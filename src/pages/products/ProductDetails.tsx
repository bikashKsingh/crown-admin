import { GoBackButton, OverlayLoading } from "../../components";

import { useEffect, useState } from "react";
import { addUrlToFile, get, post, remove } from "../../utills";
import { Link, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { FILE_URL } from "../../constants";

export function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [productDetails, setProductDetails] = useState<any>({});
  const [productSizes, setProductSizes] = useState<any[]>([]);
  const [sizeFinishes, setSizeFinishes] = useState<any[]>([]);

  // get program details
  useEffect(
    function () {
      async function getData(id: string) {
        setLoading(true);
        const apiResponse = await get(`/products/${id}`, true);
        if (apiResponse?.status == 200) {
          setProductDetails(apiResponse?.body);
          if (apiResponse?.body?.sizes?.length) {
            setProductSizes(apiResponse?.body?.sizes);
            setSizeFinishes(apiResponse?.body?.sizeFinishes);
          }
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
              <h4 className="font-weight-bold mb-0">Product Details</h4>
            </div>
            <div>
              <Link
                to={`/products/add`}
                type="button"
                className="btn btn-primary text-light"
              >
                Add Product
              </Link>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <OverlayLoading />
      ) : (
        <div className="row">
          <div className="col-md-12 ">
            {/* Product Details */}
            <div className="row gy-2">
              {/* Profile Card */}
              <div className="col-md-4">
                <div className="card rounded-2">
                  <div className="card-body p-0">
                    <div className="text-center">
                      <a
                        href={addUrlToFile(productDetails?.a4Image)}
                        target="_blank"
                      >
                        <img
                          className="img-fluid rounded"
                          style={{
                            maxHeight: 200,
                          }}
                          src={addUrlToFile(productDetails?.a4Image)}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card card-body mt-2 rounded py-2">
                  <h6 className="pt-2 text-center">{productDetails?.name}</h6>
                  <p className="pt-2 text-center">{productDetails?.slug}</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="col-md-8">
                <div className="card rounded-2" style={{ height: "100%" }}>
                  <div className="card-body table-responsive">
                    <h5 className="mb-3">Product Details</h5>

                    <table className="table table-striped table-borderless">
                      <tbody>
                        {/* <tr>
                          <td className="py-3">Name</td>
                          <td className="py-3" colSpan={3}>
                            {productDetails?.name}
                          </td>
                        </tr> */}
                        {/* <tr>
                          <td className="py-3">Slug</td>
                          <td className="py-3" colSpan={3}>
                            {productDetails?.slug}
                          </td>
                        </tr> */}
                        <tr>
                          <td className="py-3">Categories</td>
                          <td className="py-3" colSpan={3}>
                            <div className="d-flex gap-1">
                              {productDetails?.categories?.map((item: any) => {
                                return (
                                  <span className="badge bg-info rounded">
                                    {item.name}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3">Sub Categories</td>
                          <td className="py-3" colSpan={3}>
                            <div className="d-flex gap-1">
                              {productDetails?.subCategories?.map(
                                (item: any) => {
                                  return (
                                    <span className="badge bg-info rounded">
                                      {item.name}
                                    </span>
                                  );
                                }
                              )}
                            </div>
                          </td>
                        </tr>
                        {/* <tr>
                          <td className="py-3">Sizes</td>
                          <td className="py-3" colSpan={3}>
                            <div className="">
                              {sizeFinishes?.map((item) => {
                                return (
                                  <div className="">
                                    <span className="badge bg-info rounded">
                                      {item?.size?.title}
                                    </span>
                                    <div className="d-flex gap-1 mt-2">
                                      {item?.finishes?.map((finish) => {
                                        return (
                                          <span className="badge bg-warning rounded">
                                            {finish.shortName}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr> */}
                        <tr>
                          <td className="py-3">Decor Series</td>
                          <td className="py-3">
                            {productDetails?.decorSeries.title}
                          </td>
                          <td className="py-3">Decor Number</td>
                          <td className="py-3">
                            {productDetails?.decorNumber}
                          </td>
                        </tr>
                        <tr>
                          <td>Ral Number</td>
                          <td>{productDetails?.ralNumber}</td>
                        </tr>
                        <tr>
                          <td className="py-3">Product SKU</td>
                          <td className="py-3">{productDetails?.sku}</td>

                          <td className="py-3">Status</td>
                          <td className="py-3">
                            {productDetails?.status == true
                              ? "Active"
                              : "Disabled"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Size & Finishes */}
          <div className="col-md-12">
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h5
                      className="mb-2 cursor-hand"
                      data-bs-toggle="collapse"
                      data-bs-target="#sizeAndFinishes"
                      aria-expanded="false"
                      aria-controls="sizeAndFinishes"
                    >
                      Size & Finishes
                    </h5>
                    <button
                      className="btn btn-light p-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#sizeAndFinishes"
                      aria-expanded="false"
                      aria-controls="sizeAndFinishes"
                    >
                      <i className="fa fa-angle-down text-primary" />
                    </button>
                  </div>

                  <div className="collapse mt-2 show" id="sizeAndFinishes">
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <div
                          className="card card-body rounded shadow-none border-0"
                          style={{ background: "#fafafa" }}
                        >
                          {sizeFinishes?.map((item) => {
                            return (
                              <div className="mt-2">
                                <h5 className="">{item?.size?.title}</h5>
                                <div
                                  className="d-flex gap-1 mt-2 mb-3"
                                  style={{ flexWrap: "wrap" }}
                                >
                                  {item?.finishes?.map((finish: any) => {
                                    return (
                                      <span className="badge bg-warning rounded">
                                        {finish.fullName}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Description */}
          <div className="col-md-12">
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h5
                      className="mb-2 cursor-hand"
                      data-bs-toggle="collapse"
                      data-bs-target="#programDetails"
                      aria-expanded="false"
                      aria-controls="programDetails"
                    >
                      Descriptions
                    </h5>
                    <button
                      className="btn btn-light p-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#programDetails"
                      aria-expanded="false"
                      aria-controls="programDetails"
                    >
                      <i className="fa fa-angle-down text-primary" />
                    </button>
                  </div>

                  <div className="collapse mt-2 show" id="programDetails">
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <div
                          className="card card-body rounded shadow-none border-0"
                          style={{ background: "#fafafa" }}
                        >
                          <h6 className="mb-3">Short Description</h6>
                          <div
                            className="program-benifits"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                productDetails.shortDescription
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-12">
                        <div
                          className="card card-body rounded shadow-none border-0"
                          style={{ background: "#fff4e6" }}
                        >
                          <h6 className="mb-3">Long Description</h6>
                          <div
                            className=""
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                productDetails.descriptions
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="col-md-12">
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h5
                      className="mb-2 cursor-hand"
                      data-bs-toggle="collapse"
                      data-bs-target="#productImages"
                      aria-expanded="false"
                      aria-controls="productImages"
                    >
                      Product Images
                    </h5>
                    <button
                      className="btn btn-light p-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#productImages"
                      aria-expanded="false"
                      aria-controls="productImages"
                    >
                      <i className="fa fa-angle-down text-primary" />
                    </button>
                  </div>

                  <div className="collapse mt-2" id="productImages">
                    <div className="shadow-none p-2 mb-3 row">
                      <div className="col-md-4">
                        <div className="card shadow-none">
                          <div className="card-body">
                            <a
                              href={addUrlToFile(productDetails?.a4Image)}
                              target="_blank"
                            >
                              <img
                                src={addUrlToFile(productDetails?.a4Image)}
                                className="card-img-top"
                              />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="card shadow-none">
                          <div className="card-body">
                            <a
                              href={addUrlToFile(
                                productDetails?.fullSheetImage
                              )}
                              target="_blank"
                            >
                              <img
                                src={addUrlToFile(
                                  productDetails?.fullSheetImage
                                )}
                                className="card-img-top"
                              />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="card shadow-none">
                          <div className="card-body">
                            <a
                              href={addUrlToFile(
                                productDetails?.highResolutionImage
                              )}
                              target="_blank"
                            >
                              <img
                                src={addUrlToFile(
                                  productDetails?.highResolutionImage
                                )}
                                className="card-img-top"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* META Details */}
          <div className="col-md-12">
            <div className="card rounded-2 mt-4">
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
                      META Details
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
                      <div
                        className="card card-body rounded shadow-none border-0"
                        style={{ background: "#fff4e6" }}
                      >
                        <h6>META Title</h6>
                        <p>{productDetails.metaTitle}</p>
                      </div>

                      <div
                        className="card card-body rounded shadow-none border-0 mt-2"
                        style={{ background: "#fff4e6" }}
                      >
                        <h6>META Description</h6>
                        <p>{productDetails.metaDescription}</p>
                      </div>

                      <div
                        className="card card-body rounded shadow-none border-0 mt-2"
                        style={{ background: "#fff4e6" }}
                      >
                        <h6>META Keywords</h6>
                        <p>{productDetails.metaKeywords}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
