import { PiCurrencyInr } from "react-icons/pi";
import { BsShop } from "react-icons/bs";
import { PiUsersFourLight } from "react-icons/pi";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import BasicBars from "../components/charts/BasicBarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import { get } from "../utills";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Spinner } from "../components/ui/Spinner";
import { ReactHelmet } from "../components/ui/ReactHelmet";

export function Home() {
  const chartContainerStyle: any = {
    width: "100%",
    height: "270px",
    transform: "scale(1)", // Initial zoom-out
    transition: "transform 0.3s ease-in-out", // Smooth transition
    display: "flex",
    justifyContent: "center",
  };

  const [productLoading, setProductLoading] = useState<boolean>(true);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const [orderLoading, setOrderLoading] = useState<boolean>(true);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  const [inquiryLoading, setInquiryLoading] = useState<boolean>(true);
  const [totalInquiries, setTotalInquiries] = useState<number>(0);

  const [newsletterLoading, setNewsletterLoading] = useState<boolean>(true);
  const [totalNewsletters, setTotalNewsletters] = useState<number>(0);

  const [sizeLoading, setSizeLoading] = useState<boolean>(true);
  const [totalSizes, setTotalSizes] = useState<number>(0);

  const [finishLoading, setFinishLoading] = useState<boolean>(true);
  const [totalFinishes, setTotalFinishes] = useState<number>(0);

  const [decorSeriesLoading, setDecorSeriesLoading] = useState<boolean>(true);
  const [totalDecorSeries, setTotalDecorSeries] = useState<number>(0);

  // Get Products
  useEffect(function () {
    async function getData() {
      setProductLoading(true);
      let url = `/products`;

      const apiResponse = await get(url, true);

      if (apiResponse?.status == 200) {
        setTotalProducts(apiResponse?.totalRecords);
      } else {
        toast.error(apiResponse?.message);
      }
      setProductLoading(false);
    }

    getData();
  }, []);

  // Get Orders
  useEffect(function () {
    async function getData() {
      setOrderLoading(true);
      let url = `/orders`;

      const apiResponse = await get(url, true);

      if (apiResponse?.status == 200) {
        setTotalOrders(apiResponse?.totalRecords);
      } else {
        toast.error(apiResponse?.message);
      }
      setOrderLoading(false);
    }

    getData();
  }, []);

  // Get Inquiries
  useEffect(function () {
    async function getData() {
      setInquiryLoading(true);
      let url = `/inquiries`;

      const apiResponse = await get(url, true);

      if (apiResponse?.status == 200) {
        setTotalInquiries(apiResponse?.totalRecords);
      } else {
        toast.error(apiResponse?.message);
      }
      setInquiryLoading(false);
    }

    getData();
  }, []);

  // Get Newsletters
  useEffect(function () {
    async function getData() {
      setNewsletterLoading(true);
      let url = `/newsletters`;

      const apiResponse = await get(url, true);

      if (apiResponse?.status == 200) {
        setTotalNewsletters(apiResponse?.totalRecords);
      } else {
        toast.error(apiResponse?.message);
      }
      setNewsletterLoading(false);
    }

    getData();
  }, []);

  // Get Sizes
  useEffect(function () {
    async function getData() {
      setSizeLoading(true);
      let url = `/sizes`;

      const apiResponse = await get(url, true);

      if (apiResponse?.status == 200) {
        setTotalSizes(apiResponse?.totalRecords);
      } else {
        toast.error(apiResponse?.message);
      }
      setSizeLoading(false);
    }

    getData();
  }, []);

  // Get Finishes
  useEffect(function () {
    async function getData() {
      setFinishLoading(true);
      let url = `/finishes`;

      const apiResponse = await get(url, true);

      if (apiResponse?.status == 200) {
        setTotalFinishes(apiResponse?.totalRecords);
      } else {
        toast.error(apiResponse?.message);
      }
      setFinishLoading(false);
    }

    getData();
  }, []);

  // Get DecorSeries
  useEffect(function () {
    async function getData() {
      setDecorSeriesLoading(true);
      let url = `/decorSeries`;

      const apiResponse = await get(url, true);

      if (apiResponse?.status == 200) {
        setTotalDecorSeries(apiResponse?.totalRecords);
      } else {
        toast.error(apiResponse?.message);
      }
      setDecorSeriesLoading(false);
    }

    getData();
  }, []);

  return (
    <>
      <ReactHelmet title="Dashboard : Crown" description="Dashboard" />
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="font-weight-bold mb-0">Dashboard</h4>
              </div>
              <div>
                {/* <button
                type="button"
                className="btn btn-primary btn-icon-text btn-rounded"
              >
                <i className="ti-clipboard btn-icon-prepend"></i>Report
              </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Total Products */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Link to={"/products"} style={{ textDecoration: "none" }}>
                  <p className="card-title text-xl-left">Total Products</p>
                  <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-dark">
                      {productLoading ? <Spinner /> : totalProducts}
                    </h3>
                    <i className="ti-package icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                  </div>
                  {/* <p className="mb-0 mt-2 text-danger">
                0.12%
                <span className="text-black ms-1">
                  <small>(30 days)</small>
                </span>
              </p> */}
                </Link>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Link to={"/orders"} style={{ textDecoration: "none" }}>
                  <p className="card-title  text-xl-left">Total Orders</p>
                  <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-dark">
                      {orderLoading ? <Spinner /> : totalOrders}
                    </h3>
                    <i className="ti-shopping-cart icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                  </div>
                  {/* <p className="mb-0 mt-2 text-danger">
                0.47%
                <span className="text-black ms-1">
                  <small>(30 days)</small>
                </span>
              </p> */}
                </Link>
              </div>
            </div>
          </div>

          {/* Total Inquiry */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Link to={"/inquiries"} style={{ textDecoration: "none" }}>
                  <p className="card-title  text-xl-left">Total Inquiry</p>
                  <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-dark">
                      {inquiryLoading ? <Spinner /> : totalInquiries}
                    </h3>
                    <PiUsersFourLight className="ti-layers-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0" />
                    {/* <i className="ti-user icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i> */}
                  </div>
                  {/* <p className="mb-0 mt-2 text-success">
                64.00%
                <span className="text-black ms-1">
                  <small>(30 days)</small>
                </span>
              </p> */}
                </Link>
              </div>
            </div>
          </div>

          {/* Total Subscribers */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Link to={"/newsletters"} style={{ textDecoration: "none" }}>
                  <p className="card-title  text-xl-left">Total Subscribers</p>
                  <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-dark">
                      {newsletterLoading ? <Spinner /> : totalNewsletters}
                    </h3>

                    <i className="ti-email icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                  </div>
                  {/* <p className="mb-0 mt-2 text-success">
                23.00%
                <span className="text-black ms-1">
                  <small>(30 days)</small>
                </span>
              </p> */}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Total Sizes */}
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card bg-info">
              <div className="card-body">
                <Link to={"/sizes"} style={{ textDecoration: "none" }}>
                  <p className="card-title text-white text-xl-left">
                    Total Sizes
                  </p>
                  <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-white">
                      {sizeLoading ? <Spinner /> : totalSizes}
                    </h3>
                    <i className="ti-arrows-horizontal icon-md text-white mb-0 mb-md-3 mb-xl-0"></i>
                  </div>
                  {/* <p className="mb-0 mt-2 text-danger">
                0.47%
                <span className="text-black ms-1">
                  <small>(30 days)</small>
                </span>
              </p> */}
                </Link>
              </div>
            </div>
          </div>

          {/* Total Finishes */}
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card bg-warning">
              <div className="card-body">
                <Link to={"/finishes"} style={{ textDecoration: "none" }}>
                  <p className="card-title text-xl-left text-white">
                    Total Finishes
                  </p>
                  <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-white ">
                      {finishLoading ? <Spinner /> : totalFinishes}
                    </h3>
                    <PiUsersFourLight className="ti-palette icon-md text-white mb-0 mb-md-3 mb-xl-0" />
                    {/* <i className="ti-user icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i> */}
                  </div>
                  {/* <p className="mb-0 mt-2 text-success">
                64.00%
                <span className="text-black ms-1">
                  <small>(30 days)</small>
                </span>
              </p> */}
                </Link>
              </div>
            </div>
          </div>

          {/* Total Decor Series */}
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card bg-danger">
              <div className="card-body">
                <Link to={"/newsletters"} style={{ textDecoration: "none" }}>
                  <p className="card-title text-white text-xl-left">
                    Total Decor Series
                  </p>
                  <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 text-white">
                      {decorSeriesLoading ? <Spinner /> : totalDecorSeries}
                    </h3>

                    <i className="ti-gallery icon-md text-white mb-0 mb-md-3 mb-xl-0"></i>
                  </div>
                  {/* <p className="mb-0 mt-2 text-success">
                23.00%
                <span className="text-black ms-1">
                  <small>(30 days)</small>
                </span>
              </p> */}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Pie & Bar Charts */}
        <div className="row">
          {/* <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sales by Plan</h4>
              <div className="" style={chartContainerStyle}>
                <PieChart />
              </div>
            </div>
          </div>
        </div> */}

          {/* Bar Chart */}
          {/* <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sales details</h4>
              <BarChart />
            </div>
          </div>
        </div> */}
        </div>

        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            {/* <div className="card">
            <div className="card-body">
              <p className="card-title">Sales details by Channel</p>

              <div id="sales-legend" className="chartjs-legend mt-4 mb-2"></div>
              <BasicBars />
            </div>
          </div> */}
          </div>
          {/* <div className="col-md-6 grid-margin stretch-card">
          <div className="card border-bottom-0">
            <div className="card-body">
              <p className="card-title">Leads Details</p>

              <div className="d-flex flex-wrap mb-5">
                <div className="me-5 mt-3">
                  <p className="text-muted">Total</p>
                  <h3>500</h3>
                </div>
                <div className="me-5 mt-3">
                  <p className="text-muted">Converted</p>
                  <h3>187</h3>
                </div>
                <div className="me-5 mt-3">
                  <p className="text-muted">Ongoing</p>
                  <h3>{50}</h3>
                </div>
                <div className="mt-3">
                  <p className="text-muted">Not Converted</p>
                  <h3>{500 - 187 - 50}</h3>
                </div>
              </div>
            </div>
            <canvas id="order-chart" className="w-100"></canvas>
          </div>
        </div> */}
        </div>
        <div className="row">
          {/* <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title mb-0">Top Plans</p>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Plans</th>
                      <th>Sale Amount</th>
                      <th>Sale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Train with Gunj</td>
                      <td>20000</td>
                      <td className="text-info">
                        28.76% <i className="ti-arrow-up"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Personalised Training Plans</td>
                      <td>15000</td>
                      <td className="text-danger">
                        28.76% <i className="ti-arrow-down"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Personal Training Trial</td>
                      <td>12000</td>
                      <td className="text-info">
                        28.76% <i className="ti-arrow-up"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Group Training Plans</td>
                      <td>20000</td>
                      <td className="text-danger">
                        28.76% <i className="ti-arrow-down"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Personalised Training Plans</td>
                      <td>20000</td>
                      <td className="text-danger">
                        28.76% <i className="ti-arrow-down"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
          {/* <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Top Customers</h4>
              <BarChart />
            </div>
          </div>
        </div> */}
        </div>
        <div className="row">
          {/* <div className="col-md-12 grid-margin stretch-card">
          <div className="card position-relative">
            <div className="card-body">
              <p className="card-title">Avarage Sale Reports</p>
              <div className="row">
                <div className="col-md-12 col-xl-3 d-flex flex-column justify-content-center">
                  <div className="ml-xl-4">
                    <h1>33500</h1>
                    <h3 className="font-weight-light mb-xl-4">Total Sales</h3>
                  </div>
                </div>
                <div className="col-md-12 col-xl-9">
                  <div className="row">
                    <div className="col-md-6 mt-3 col-xl-5">
                      <DoughnutChart />
                    </div>
                    <div className="col-md-6 col-xl-7">
                      <div className="table-responsive mb-3 mb-md-0">
                        <table className="table table-borderless report-table">
                          <tr>
                            <td className="text-muted">Personalized Plans</td>
                            <td className="w-100 px-0">
                              <div className="progress progress-md mx-4">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: "70%" }}
                                ></div>
                              </div>
                            </td>
                            <td>
                              <h5 className="font-weight-bold mb-0">524</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-muted">Hybrid Plans</td>
                            <td className="w-100 px-0">
                              <div className="progress progress-md mx-4">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: "30%" }}
                                ></div>
                              </div>
                            </td>
                            <td>
                              <h5 className="font-weight-bold mb-0">722</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-muted">Group Plans</td>
                            <td className="w-100 px-0">
                              <div className="progress progress-md mx-4">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: "95%" }}
                                ></div>
                              </div>
                            </td>
                            <td>
                              <h5 className="font-weight-bold mb-0">173</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-muted">Corporate Plans</td>
                            <td className="w-100 px-0">
                              <div className="progress progress-md mx-4">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: "60%" }}
                                ></div>
                              </div>
                            </td>
                            <td>
                              <h5 className="font-weight-bold mb-0">945</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-muted">Merchandise</td>
                            <td className="w-100 px-0">
                              <div className="progress progress-md mx-4">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{ width: "40%" }}
                                ></div>
                              </div>
                            </td>
                            <td>
                              <h5 className="font-weight-bold mb-0">553</h5>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
}
