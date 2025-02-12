import { GoBackButton, OverlayLoading } from "../../components";

import { useEffect, useState } from "react";
import { get, post, remove } from "../../utills";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FILE_URL } from "../../constants";

export function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [orderProducts, setOrderProducts] = useState<any[]>([]);

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
                      {orderDetails.gender == "FEMALE" ? (
                        <img
                          className="img"
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            border: "4px solid green",
                          }}
                          src="/images/placeholders/male-user.jpg"
                        />
                      ) : (
                        <img
                          className="img"
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            border: "4px solid green",
                          }}
                          src="/images/placeholders/female-user.jpg"
                        />
                      )}
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
                      <div className="col-md-7">
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
                                  <strong>PRODUCT NAME</strong>
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
                                      <td>
                                        <img
                                          src={`${FILE_URL}/${item.a4Image}`}
                                        />{" "}
                                        {item.name}
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

                      <div className="col-md-5">
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
  );
}
