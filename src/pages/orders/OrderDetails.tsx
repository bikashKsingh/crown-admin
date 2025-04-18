import { GoBackButton, OverlayLoading } from "../../components";

import { useEffect, useRef, useState } from "react";
import { addUrlToFile, get } from "../../utills";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { ReactHelmet } from "../../components/ui/ReactHelmet";
// import { usePDF } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";

export function OrderDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [orderProducts, setOrderProducts] = useState<any[]>([]);
  // const { toPDF, targetRef } = usePDF({
  //   filename: `order-invoice-${orderDetails?.name
  //     ?.toLowerCase()
  //     ?.replaceAll(" ", "-")}.pdf`,
  // });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // get order details
  useEffect(
    function () {
      async function getData(id: string) {
        setLoading(true);
        const apiResponse = await get(`/orders/${id}`, true);
        if (apiResponse?.status == 200) {
          setOrderDetails(apiResponse?.body);
          if (
            apiResponse?.body?.products &&
            apiResponse?.body?.products?.length
          ) {
            setOrderProducts(apiResponse?.body?.products);
          }
        }
        setLoading(false);
      }
      if (id) getData(id);
    },
    [id]
  );

  return (
    <>
      <ReactHelmet
        title={`order-invoice-${orderDetails?.name
          ?.toLowerCase()
          ?.replaceAll(" ", "-")}`}
        description="Order Details"
      />
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <GoBackButton />
                <h4 className="font-weight-bold mb-0">Order Details</h4>
              </div>
              <div>
                {/* <button
                type="button"
                className="btn btn-primary btn-icon-text btn-rounded"
              >
                <i className="fa fa-hourglass-half"></i>{" "}
                {orderDetails?.orderStatus}
              </button> */}
                <>
                  {orderDetails?.orderStatus == "ORDER_PLACED" ? (
                    <span className="btn btn-warning">
                      <span className="rounded fa fa-hourglass-start"></span>
                      <span> ORDER PLACED</span>
                    </span>
                  ) : orderDetails?.orderStatus == "DISPATCHED" ? (
                    <span className="btn btn-info">
                      <span className="rounded fa fa-truck text-light"></span>
                      <span className="text-light"> DISPATCHED</span>
                    </span>
                  ) : orderDetails?.orderStatus == "DELIVERED" ? (
                    <span className="btn btn-success">
                      <span className="rounded fa fa-check-circle text-light"></span>
                      <span className="text-light"> DELIVERED</span>
                    </span>
                  ) : orderDetails?.orderStatus == "CANCELLED" ? (
                    <span className="d-flex gap-1">
                      <span className="rounded fa fa-check-circle text-times text-danger"></span>
                      <span className="text-danger">CANCELLED</span>
                    </span>
                  ) : (
                    ""
                  )}
                </>
                <button
                  className="btn btn-info text-white ms-1"
                  // onClick={() => toPDF()}
                  onClick={() => reactToPrintFn()}
                >
                  <i className="ti-download"></i> Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <OverlayLoading />
        ) : (
          <div className="row">
            <div className="col-md-12 ">
              {/* Personal & Profile Details */}
              <div className="row">
                {/* Profile Card */}
                <div className="col-md-4">
                  <div className="card rounded-2">
                    <div className="card-body">
                      <div className="text-center">
                        <div className="d-flex justify-content-center">
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              height: "80px",
                              width: "80px",
                              background: "green",
                              borderRadius: "40px",
                              fontSize: "40px",
                              color: "white",
                            }}
                          >
                            {orderDetails?.name[0]}
                          </div>
                        </div>
                        <h6 className="px-0 pt-2">{orderDetails?.name}</h6>
                        <p>
                          <span className="badge bg-warning rounded">
                            {orderDetails?.gender}
                          </span>
                        </p>
                        {/* <p>{`${orderDetails?.address}, ${orderDetails?.locality}, ${orderDetails?.city}, ${orderDetails?.state}, ${orderDetails?.pincode}, ${orderDetails?.country}`}</p> */}
                        <div className="d-flex gap-2 justify-content-center mt-3">
                          <Link
                            to={`tel:${orderDetails?.mobile}`}
                            className="btn btn-info text-light py-2"
                          >
                            <i className="fa fa-phone"></i>
                          </Link>

                          <Link
                            to={`mailto:${orderDetails?.email}`}
                            className="btn btn-danger text-light py-2"
                          >
                            <i className="fa fa-envelope"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="col-md-8">
                  <div className="card rounded-2">
                    <div className="card-body table-responsive">
                      <h5 className="mb-2">Personal Details</h5>
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td scope="row">Name</td>
                            <td>{orderDetails?.name}</td>
                          </tr>
                          <tr>
                            <td scope="row">Email</td>
                            <td>{orderDetails?.email}</td>
                          </tr>
                          <tr>
                            <td scope="row">Mobile</td>
                            <td>{orderDetails?.mobile}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products & Shipping */}
            <div className="col-md-12">
              <div className="card rounded-2 mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-between align-items-center">
                      <h5
                        className="mb-2 cursor-hand"
                        data-bs-toggle="collapse"
                        data-bs-target="#productsSection"
                        aria-expanded="false"
                        aria-controls="productsSection"
                      >
                        Products & Shipping
                      </h5>
                      <button
                        className="btn btn-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#productsSection"
                        aria-expanded="false"
                        aria-controls="productsSection"
                      >
                        <i className="fa fa-angle-down text-primary" />
                      </button>
                    </div>

                    <div className="collapse mt-2 show" id="productsSection">
                      <div className="row">
                        <div className="col-md-9">
                          <div
                            className="card card-body rounded shadow-none border-0 p-2"
                            style={{ background: "#fff4e6", height: "100%" }}
                          >
                            <table className="table table-sm">
                              <tbody>
                                <tr>
                                  <td>
                                    <strong>SN</strong>
                                  </td>
                                  <td>
                                    <strong>PRODUCT</strong>
                                  </td>
                                  <td>
                                    <strong>QTY</strong>
                                  </td>
                                </tr>

                                {orderProducts?.map(
                                  (item: any, index: number) => {
                                    return (
                                      <tr>
                                        <td>{++index}</td>
                                        <td className="d-flex gap-2">
                                          <img
                                            style={{
                                              height: "80px",
                                              width: "80px",
                                            }}
                                            src={addUrlToFile(item.a4Image)}
                                          />
                                          <div className="">
                                            <p className="p-0 m-0">
                                              {item.name}
                                            </p>
                                            <p className="p-0 m-0">
                                              Decor No : {item.decorNumber} (
                                              {item?.decorSeries?.title})
                                            </p>
                                            <p className="p-0 m-0">
                                              Category : {item?.category?.name}
                                            </p>
                                            <p className="p-0 m-0">
                                              Sub Category :{" "}
                                              {item?.subCategory?.name}
                                            </p>
                                          </div>
                                        </td>
                                        <td>{item.qty}</td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div
                            className="card card-body rounded shadow-none border-0"
                            style={{ background: "#fff4e6" }}
                          >
                            <table className="table table-sm">
                              <h6>{orderDetails?.name}</h6>
                              <p>
                                {orderDetails?.mobile}, {orderDetails?.email}
                              </p>
                              <p>
                                {`${orderDetails?.address}, ${orderDetails?.locality}, ${orderDetails?.city}, ${orderDetails?.state}, ${orderDetails?.country}, ${orderDetails?.pincode}`}
                              </p>

                              {/* <tbody>
                              <tr>
                                <td scope="row">Name</td>
                                <td>{orderDetails?.name}</td>
                              </tr>
                              <tr>
                                <td scope="row">Mobile</td>
                                <td>{orderDetails?.mobile}</td>
                              </tr>
                              <tr>
                                <td scope="row">Email</td>
                                <td>{orderDetails?.email}</td>
                              </tr>
                              <tr>
                                <td scope="row">Address</td>
                                <td>{orderDetails?.address}</td>
                              </tr>
                              <tr>
                                <td scope="row">Locality</td>
                                <td>{orderDetails?.locality}</td>
                              </tr>
                              <tr>
                                <td scope="row">State</td>
                                <td>{orderDetails?.state}</td>
                              </tr>
                              <tr>
                                <td scope="row">City</td>
                                <td>{orderDetails?.city}</td>
                              </tr>
                              <tr>
                                <td scope="row">Country</td>
                                <td>{orderDetails?.country}</td>
                              </tr>
                              <tr>
                                <td scope="row">Pincode</td>
                                <td>{orderDetails?.pincode}</td>
                              </tr>
                            </tbody> */}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card rounded-2 mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-between align-items-center">
                      <h5
                        className="mb-2 cursor-hand"
                        data-bs-toggle="collapse"
                        data-bs-target="#invoiceSection"
                        aria-expanded="false"
                        aria-controls="invoiceSection"
                      >
                        Invoice
                      </h5>
                      <button
                        className="btn btn-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#invoiceSection"
                        aria-expanded="false"
                        aria-controls="invoiceSection"
                      >
                        <i className="fa fa-angle-down text-primary" />
                      </button>
                    </div>

                    <div
                      className="collapse mt-2 pt-5 show"
                      id="invoiceSection"
                      // ref={targetRef}
                      ref={contentRef}
                      style={{ margin: "40px", padding: "50px" }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <h4 className="mb-4">Order Invoice</h4>
                          <h6>
                            <p className="d-flex gap-2 align-items-center">
                              <span>Order Date : </span>
                              <i className="ti-calendar"></i>
                              <span>
                                {moment(orderDetails?.createdAt).format(
                                  "DD-MMM-YYYY, hh:mm A"
                                )}
                              </span>
                            </p>
                          </h6>
                          <h6>Shop Name : Crown</h6>

                          <div className="mt-4">
                            <h5>Shipping to</h5>
                            <div className="mt-2">
                              <p className="d-flex gap-2 align-items-center m-0 p-0">
                                <i className="ti-user"></i>
                                {orderDetails?.name}
                              </p>
                              <p className="m-0 p-0">
                                <a
                                  href={`tel:${orderDetails?.mobile}`}
                                  className="nav-link d-flex gap-2 align-items-center"
                                >
                                  <i className="ti-mobile"></i>
                                  {orderDetails?.mobile}
                                </a>
                              </p>

                              <p className="d-flex gap-2 align-items-center m-0 p-0">
                                <i className="ti-location-pin"></i>
                                {orderDetails?.address
                                  ? `${orderDetails?.address}, `
                                  : null}

                                {orderDetails?.locality
                                  ? `${orderDetails?.locality}, `
                                  : null}

                                {`${orderDetails?.city}, ${orderDetails?.state} - ${orderDetails?.pincode} (${orderDetails?.country})`}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 text-end pe-5">
                          <img
                            src={"/images/logo.png"}
                            style={{ width: "150px" }}
                            alt=""
                          />

                          {/* <h6>
                            <p className="d-flex gap-2 align-items-center justify-content-end my-3">
                              <span>Order Date : </span>
                              <i className="ti-calendar"></i>
                              <span>
                                {moment(orderDetails?.createdAt).format(
                                  "DD-MMM-YYYY, hh:mm A"
                                )}
                              </span>
                            </p>
                          </h6> */}
                        </div>

                        <div className="col-md-12">
                          <div className="mt-4">
                            <table className="table table-borderless">
                              <thead>
                                <tr>
                                  <th className="bg-light">SL</th>
                                  <th className="bg-light">Item Details</th>
                                  <th className="bg-light">Qty</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderProducts?.map((product, index) => {
                                  return (
                                    <tr>
                                      <td>{++index}</td>
                                      <td>
                                        <div className="d-flex gap-2 align-items-center">
                                          <img
                                            style={{
                                              height: "85px",
                                              width: "85px",
                                              borderRadius: "5px",
                                            }}
                                            src={addUrlToFile(product.a4Image)}
                                            alt=""
                                          />
                                          <div className="">
                                            <h6>{product.name}</h6>
                                            <p className="m-0">
                                              <strong>Decor No : </strong>
                                              {product.decorNumber}
                                            </p>
                                            <p className="m-0">
                                              <strong>Category : </strong>
                                              {product?.category?.name}
                                            </p>
                                            <p className="m-0">
                                              <strong>Sub Category : </strong>
                                              {product?.subCategory?.name}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td>{product?.qty}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-4">
                            <p className="text-center">
                              If you require any assistance or have feedback or
                              suggestions about our site you Can email us at{" "}
                              <a href="mailto:kanishka@crownlam.com">
                                kanishka@crownlam.com
                              </a>
                            </p>
                          </div>

                          <div className="mt-4 bg-light text-center py-3">
                            <h6>Phone : +913340660166,</h6>
                            <h6>Email : kanishka@crownlam.com</h6>
                            <h6>https://crownlam.com/</h6>
                            <h6>All copy right reserved © 2025 Crown</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {/* <div className="col-md-12">
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h5
                      className="mb-2 cursor-hand"
                      data-bs-toggle="collapse"
                      data-bs-target="#addressSection"
                      aria-expanded="false"
                      aria-controls="addressSection"
                    >
                      Shipping Address
                    </h5>
                    <button
                      className="btn btn-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#addressSection"
                      aria-expanded="false"
                      aria-controls="addressSection"
                    >
                      <i className="fa fa-angle-down text-primary" />
                    </button>
                  </div>

                  <div className="collapse mt-2" id="addressSection">
                    <div className="card card-body shadow-none p-2">
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td scope="row">Address</td>
                            <td>{orderDetails?.address}</td>
                          </tr>
                          <tr>
                            <td scope="row">Locality</td>
                            <td>{orderDetails?.locality}</td>
                          </tr>
                          <tr>
                            <td scope="row">State</td>
                            <td>{orderDetails?.state}</td>
                          </tr>
                          <tr>
                            <td scope="row">City</td>
                            <td>{orderDetails?.city}</td>
                          </tr>
                          <tr>
                            <td scope="row">Country</td>
                            <td>{orderDetails?.country}</td>
                          </tr>
                          <tr>
                            <td scope="row">Pincode</td>
                            <td>{orderDetails?.pincode}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        )}
      </div>
    </>
  );
}
