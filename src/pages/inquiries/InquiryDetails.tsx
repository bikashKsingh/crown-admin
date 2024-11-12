import { GoBackButton, OverlayLoading } from "../../components";

import { useEffect, useState } from "react";
import { get, post, remove } from "../../utills";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export function InquiryDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<any>({
    specialities: [],
    interests: [],
    kycDocuments: [],
    certificates: [],
  });

  // get trainer specialities
  useEffect(
    function () {
      async function getData(id: string) {
        setLoading(true);
        const apiResponse = await get(`/users/${id}`, true);
        if (apiResponse?.status == 200) {
          setUserDetails(apiResponse?.body);
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

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <GoBackButton />
              <h4 className="font-weight-bold mb-0">User Details</h4>
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
                      {userDetails.gender == "FEMALE" ? (
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
                      <h6 className="px-0 pt-2">{userDetails?.name}</h6>
                      <p>
                        <span className="badge bg-warning rounded">
                          {userDetails?.gender}
                        </span>
                      </p>
                      {/* <p>{`${userDetails?.address}, ${userDetails?.locality}, ${userDetails?.city}, ${userDetails?.state}, ${userDetails?.pincode}, ${userDetails?.country}`}</p> */}
                      <div className="d-flex gap-2 justify-content-center mt-3">
                        <Link
                          to={`tel:${userDetails?.mobile}`}
                          className="btn btn-info text-light py-2"
                        >
                          <i className="fa fa-phone"></i>
                        </Link>

                        <Link
                          to={`mailto:${userDetails?.email}`}
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
                        {userDetails?.facebook ? (
                          <li className="list-group-item">
                            <a
                              href={userDetails?.facebook}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-facebook text-info"></i>
                                Facebook
                              </div>
                              <div className="">
                                {getSocialUsername(userDetails?.facebook)}
                              </div>
                            </a>
                          </li>
                        ) : null}
                        {/* Instagram */}
                        {userDetails?.instagram ? (
                          <li className="list-group-item">
                            <a
                              href={userDetails?.instagram}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-instagram text-success"></i>
                                Instagram
                              </div>
                              <div className="">
                                {getSocialUsername(userDetails?.instagram)}
                              </div>
                            </a>
                          </li>
                        ) : null}

                        {/* Twitter */}
                        {userDetails?.twitter ? (
                          <li className="list-group-item">
                            <Link
                              to={userDetails?.twitter}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-twitter text-success"></i>
                                Twitter
                              </div>
                              <div className="">
                                {getSocialUsername(userDetails?.twitter)}
                              </div>
                            </Link>
                          </li>
                        ) : null}

                        {/* Linkedin */}
                        {userDetails?.linkedin ? (
                          <li className="list-group-item">
                            <Link
                              to={userDetails?.linkedin}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-linkedin text-dark"></i>
                                Linkedin
                              </div>
                              <div className="">
                                {getSocialUsername(userDetails?.linkedin)}
                              </div>
                            </Link>
                          </li>
                        ) : null}

                        {/* Youtube */}
                        {userDetails?.youtube ? (
                          <li className="list-group-item">
                            <Link
                              to={userDetails?.youtube}
                              className="social-link-item"
                              target="_blank"
                            >
                              <div className="social-link-item-icon">
                                <i className="ti-youtube text-danger"></i>
                                YouTube
                              </div>
                              <div className="">
                                {getSocialUsername(userDetails?.youtube)}
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
                          <td>{userDetails?.name}</td>
                        </tr>
                        <tr>
                          <td scope="row">Email</td>
                          <td>{userDetails?.email}</td>
                        </tr>
                        <tr>
                          <td scope="row">Mobile</td>
                          <td>{userDetails?.mobile}</td>
                        </tr>
                        <tr>
                          <td scope="row">DOB</td>
                          <td>
                            {moment(userDetails?.dob).format("DD-MM-YYYY")}
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">Gender</td>
                          <td>{userDetails?.gender}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Address */}
          <div className="col-md-12">
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h5
                      className="mb-2 cursor-hand"
                      data-bs-toggle="collapse"
                      data-bs-target="#trainerAddress"
                      aria-expanded="false"
                      aria-controls="trainerAddress"
                    >
                      User Address
                    </h5>
                    <button
                      className="btn btn-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#trainerAddress"
                      aria-expanded="false"
                      aria-controls="trainerAddress"
                    >
                      <i className="fa fa-angle-down text-primary" />
                    </button>
                  </div>

                  <div className="collapse mt-2" id="trainerAddress">
                    <div className="card card-body shadow-none p-2">
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td scope="row">Address</td>
                            <td>{userDetails?.address}</td>
                          </tr>
                          <tr>
                            <td scope="row">Locality</td>
                            <td>{userDetails?.locality}</td>
                          </tr>
                          <tr>
                            <td scope="row">State</td>
                            <td>{userDetails?.state}</td>
                          </tr>
                          <tr>
                            <td scope="row">City</td>
                            <td>{userDetails?.city}</td>
                          </tr>
                          <tr>
                            <td scope="row">Country</td>
                            <td>{userDetails?.country}</td>
                          </tr>
                          <tr>
                            <td scope="row">Pincode</td>
                            <td>{userDetails?.pincode}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KYC Documents */}
          {/* <div className="col-md-12">
            <div className="card rounded-2 mt-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h5
                      className="mb-2 cursor-hand"
                      data-bs-toggle="collapse"
                      data-bs-target="#trainerKycDocuments"
                      aria-expanded="false"
                      aria-controls="trainerKycDocuments"
                    >
                      KYC Documents{" "}
                    </h5>
                    <button
                      className="btn btn-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#trainerKycDocuments"
                      aria-expanded="false"
                      aria-controls="trainerKycDocuments"
                    >
                      <i className="fa fa-angle-down text-primary" />
                    </button>
                  </div>

                  <div className="collapse mt-2" id="trainerKycDocuments">
                    <div className="card card-body shadow-none p-2">
                      <table className="table table-sm">
                        <tbody>
                          {userDetails?.kycDocuments?.map((doc: any) => {
                            return (
                              <tr>
                                <td scope="row">{doc?.title}</td>
                                <td>
                                  <iframe
                                    src={doc?.documentFile}
                                    width="500"
                                    height="250"
                                    frameBorder="0"
                                  >
                                    Your browser does not support iframes.
                                  </iframe>
                                </td>
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
          </div> */}

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
                          {userDetails?.certificates?.map(
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
