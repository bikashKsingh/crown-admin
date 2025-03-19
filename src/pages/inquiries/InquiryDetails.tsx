import { GoBackButton, OverlayLoading } from "../../components";

import { useEffect, useState } from "react";
import { addUrlToFile, get, post, remove } from "../../utills";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export function InquiryDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [inquiryDetails, setInquiryDetails] = useState<any>({});

  // get trainer specialities
  useEffect(
    function () {
      async function getData(id: string) {
        setLoading(true);
        const apiResponse = await get(`/inquiries/${id}`, true);
        if (apiResponse?.status == 200) {
          setInquiryDetails(apiResponse?.body);
        }
        setLoading(false);
      }
      if (id) getData(id);
    },
    [id]
  );

  function getSocialUsername(link: string): string {
    // Remove any trailing slashes
    link = link.replace(/\/$/, "");

    // Extract the username after the last slash
    const parts = link.split("/");
    const username = parts[parts.length - 1];
    if (username[0] == "@") {
      return username;
    } else {
      return `@${username}`;
    }
  }

  function handleInquiryType(text: string) {
    return text == "PRODUCT" ? "Product" : text == "CAREER" ? "Career" : "";
  }

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <GoBackButton />
              <h4 className="font-weight-bold mb-0">
                {handleInquiryType(inquiryDetails?.inquiryType)} Inquiry Details
              </h4>
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
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            height: "60px",
                            width: "60px",
                            background: "#1779ba",
                            borderRadius: "30px",
                            color: "#fff",
                          }}
                        >
                          <span className="" style={{ fontSize: "35px" }}>
                            {inquiryDetails?.name[0]}
                          </span>
                        </div>
                      </div>
                      <h6 className="px-0 pt-2">{inquiryDetails?.name}</h6>
                      <p>
                        <span className="badge bg-warning rounded">
                          {inquiryDetails?.gender}
                        </span>
                      </p>
                      {/* <p>{`${inquiryDetails?.address}, ${inquiryDetails?.locality}, ${inquiryDetails?.city}, ${inquiryDetails?.state}, ${inquiryDetails?.pincode}, ${inquiryDetails?.country}`}</p> */}
                      <div className="d-flex gap-2 justify-content-center mt-3">
                        <Link
                          to={`tel:${inquiryDetails?.mobile}`}
                          className="btn btn-info text-light py-2"
                        >
                          <i className="fa fa-phone"></i>
                        </Link>

                        <Link
                          to={`mailto:${inquiryDetails?.email}`}
                          className="btn btn-danger text-light py-2"
                        >
                          <i className="fa fa-envelope"></i>
                        </Link>
                      </div>
                    </div>

                    {/*  */}
                    <div className="mt-3 border-top">
                      <ul className="list-group list-group-flush">
                        {/* Facebook */}
                        {inquiryDetails?.facebook ? (
                          <li className="list-group-item">
                            <a
                              href={inquiryDetails?.facebook}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-facebook text-info"></i>
                                Facebook
                              </div>
                              <div className="">
                                {getSocialUsername(inquiryDetails?.facebook)}
                              </div>
                            </a>
                          </li>
                        ) : null}
                        {/* Instagram */}
                        {inquiryDetails?.instagram ? (
                          <li className="list-group-item">
                            <a
                              href={inquiryDetails?.instagram}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-instagram text-success"></i>
                                Instagram
                              </div>
                              <div className="">
                                {getSocialUsername(inquiryDetails?.instagram)}
                              </div>
                            </a>
                          </li>
                        ) : null}

                        {/* Twitter */}
                        {inquiryDetails?.twitter ? (
                          <li className="list-group-item">
                            <Link
                              to={inquiryDetails?.twitter}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-twitter text-success"></i>
                                Twitter
                              </div>
                              <div className="">
                                {getSocialUsername(inquiryDetails?.twitter)}
                              </div>
                            </Link>
                          </li>
                        ) : null}

                        {/* Linkedin */}
                        {inquiryDetails?.linkedin ? (
                          <li className="list-group-item">
                            <Link
                              to={inquiryDetails?.linkedin}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-linkedin text-dark"></i>
                                Linkedin
                              </div>
                              <div className="">
                                {getSocialUsername(inquiryDetails?.linkedin)}
                              </div>
                            </Link>
                          </li>
                        ) : null}

                        {/* Youtube */}
                        {inquiryDetails?.youtube ? (
                          <li className="list-group-item">
                            <Link
                              to={inquiryDetails?.youtube}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-youtube text-danger"></i>
                                YouTube
                              </div>
                              <div className="">
                                {getSocialUsername(inquiryDetails?.youtube)}
                              </div>
                            </Link>
                          </li>
                        ) : null}
                      </ul>
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
                          <td>{inquiryDetails?.name}</td>
                        </tr>
                        <tr>
                          <td scope="row">Email</td>
                          <td>{inquiryDetails?.email}</td>
                        </tr>
                        <tr>
                          <td scope="row">Mobile</td>
                          <td>{inquiryDetails?.mobile}</td>
                        </tr>
                        <tr>
                          <td scope="row">Country</td>
                          <td>{inquiryDetails?.country}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          {inquiryDetails?.inquiryType == "PRODUCT" ? (
            <div className="col-md-12">
              <div className="card rounded-2 mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-between align-items-center">
                      <h5
                        className="mb-2 cursor-hand"
                        data-bs-toggle="collapse"
                        data-bs-target="#productDetails"
                        aria-expanded="false"
                        aria-controls="productDetails"
                      >
                        Product Details
                      </h5>
                      <button
                        className="btn btn-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#productDetails"
                        aria-expanded="false"
                        aria-controls="productDetails"
                      >
                        <i className="fa fa-angle-down text-primary" />
                      </button>
                    </div>

                    <div className="collapse mt-2 show" id="productDetails">
                      <div className="card card-body shadow-none p-2">
                        <div className="row">
                          <div className="col-md-8 mx-auto">
                            <div className="row">
                              <div className="col-md-4 text-center">
                                {inquiryDetails?.product?.a4Image ? (
                                  <img
                                    src={addUrlToFile(
                                      inquiryDetails?.product?.a4Image
                                    )}
                                    alt=""
                                    className="img img-fluid"
                                  />
                                ) : null}
                              </div>
                              <div className="col-md-8 table-responsive align-items-center d-flex">
                                <table className="table table-bordered">
                                  <tbody>
                                    <tr>
                                      <td>Name</td>
                                      <td>{inquiryDetails?.product?.name}</td>
                                    </tr>
                                    <tr>
                                      <td>Decor Number</td>
                                      <td>
                                        {inquiryDetails?.product?.decorNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Decor Series</td>
                                      <td>
                                        {inquiryDetails?.decorSeries?.title}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Category</td>
                                      <td>{inquiryDetails?.category?.name}</td>
                                    </tr>
                                    <tr>
                                      <td>Sub Category</td>
                                      <td>
                                        {inquiryDetails?.subCategory?.name}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td colSpan={2} className="text-center">
                                        <Link
                                          className="btn btn-info"
                                          to={`/products/details/${inquiryDetails?.product?._id}`}
                                        >
                                          Full Product Details
                                        </Link>
                                      </td>
                                    </tr>
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
            </div>
          ) : null}

          {/* Career Details */}
          {inquiryDetails?.inquiryType == "CAREER" ? (
            <div className="col-md-12">
              <div className="card rounded-2 mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-between align-items-center">
                      <h5
                        className="mb-2 cursor-hand"
                        data-bs-toggle="collapse"
                        data-bs-target="#careerDetails"
                        aria-expanded="false"
                        aria-controls="careerDetails"
                      >
                        Career Details
                      </h5>
                      <button
                        className="btn btn-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#careerDetails"
                        aria-expanded="false"
                        aria-controls="careerDetails"
                      >
                        <i className="fa fa-angle-down text-primary" />
                      </button>
                    </div>

                    <div className="collapse mt-2 show" id="careerDetails">
                      <div className="card card-body shadow-none p-2">
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <td>Position</td>
                              <td>{inquiryDetails?.position}</td>
                            </tr>
                            <tr>
                              <td scope="row">Resume</td>
                              <td>
                                <a
                                  href={inquiryDetails?.resumeFile}
                                  target="_blank"
                                  className="btn btn-info"
                                >
                                  Download the PDF
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Trainer Certificates */}
          {/* <div className="col-md-12">
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h5
                      className="mb-2 cursor-hand"
                      data-bs-toggle="collapse"
                      data-bs-target="#trainerCertificates"
                      aria-expanded="false"
                      aria-controls="trainerCertificates"
                    >
                      Trainer Certificates
                    </h5>
                    <button
                      className="btn btn-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#trainerCertificates"
                      aria-expanded="false"
                      aria-controls="trainerCertificates"
                    >
                      <i className="fa fa-angle-down text-primary" />
                    </button>
                  </div>

                  <div className="collapse mt-2" id="trainerCertificates">
                    <div className="card card-body shadow-none p-2">
                      <table className="table table-sm">
                        <tbody>
                          {inquiryDetails?.certificates?.map(
                            (certificate: any) => {
                              return (
                                <tr>
                                  <td scope="row">{certificate?.title}</td>
                                  <td>
                                    <iframe
                                      src={certificate?.certificateFile}
                                      width="500"
                                      height="250"
                                      frameBorder="0"
                                    >
                                      Your browser does not support iframes.
                                    </iframe>
                                  </td>
                                </tr>
                              );
                            }
                          )}
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
