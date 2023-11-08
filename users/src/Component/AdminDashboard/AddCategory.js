import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/bootstrap.css";
import "../css/style.css";
import "../css/all.min.css";
import "../css/nunito.css";
import Swal from "sweetalert2";
import "../css/sb-admin-2.min.css";
import "../css/dataTables.bootstrap4.min.css";

const AddProduct = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  // ---------------------------category Post------------------

  const [Pname, setname] = useState("");
  const [Price, setPrice] = useState("");
  const [picture, setPicture] = useState({ fileName: "", bytes: "" });
  const handlePicture = (event) => {
    setPicture({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("Pname", Pname);
    formData.append("Price", Price);
    formData.append("filename", picture.bytes);

    try {
      const response = await fetch("http://localhost:4003/api/Product", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Product",
          text: " successfully uploaded",
        }).then(function () {
          history("/Product");
        });
      } else {
        Swal.fire({
          icon: "error",
          // title: 'Password Changed',
          text: result.err,
        });
      }

      setname("");
      setPrice("");
      fetch("http://localhost:4003/Product").then((result) => {
        result.json().then((resp) => {
          setData(resp);
        });
      });
    } catch (err) {}
  };
  return (
    <div>
      <body id="page-top">
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/* <!-- Sidebar --> */}
          <ul
            class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            {/* <!-- Sidebar - Brand --> */}
            <a
              class="sidebar-brand d-flex align-items-center justify-content-center"
              href="/Sidebar"
            >
              <div class="sidebar-brand-icon ">
                <img src='./logo192.png' style={{ height: "40px", width: "40px" }} />
              </div>
            </a>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider" />

            {/* <!-- Heading --> */}

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li class="nav-item">
              <a class="nav-link" href="/Product">
                <i class="fa fa-cog"></i>
                <span>Dashboard </span>
              </a>
            </li>
           

            <li class="nav-item">
              <a class="nav-link" href="/Product">
                <i class="fa fa-cog"></i>
                <span>Product</span>
              </a>
            </li>

            

       
          </ul>
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" class="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              {/* <!-- Topbar --> */}
              <header>
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                  {/* <!-- Sidebar Toggle (Topbar) --> */}
                  <button
                    id="sidebarToggleTop"
                    class="btn btn-link d-md-none rounded-circle mr-3"
                  >
                    <i class="fa fa-bars"></i>
                  </button>

                  {/* <!-- Topbar Search --> */}
                  <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div class="input-group-append">
                        <button class="btn btn-primary an" type="button">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* <!-- Topbar Navbar --> */}
                  <ul class="navbar-nav ml-auto">
                    {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                    <li class="nav-item dropdown no-arrow d-sm-none">
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="searchDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-search fa-fw"></i>
                      </a>
                      {/* <!-- Dropdown - Messages --> */}
                      <div
                        class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown"
                      >
                        <form class="form-inline mr-auto w-100 navbar-search">
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control bg-light border-0 small"
                              placeholder="Search for..."
                              aria-label="Search"
                              aria-describedby="basic-addon2"
                            />
                            <div class="input-group-append">
                              <button class="btn btn-primary an" type="button">
                                <i class="fas fa-search fa-sm"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </li>

                    <li class="nav-item dropdown no-arrow">
                      <button type="button" class="btn btn-primary an1">
                        ADMIN
                      </button>
                      <a href="/" id="userDropdown">
                        <button type="button" class="btn btn-primary an1">
                          Logout
                        </button>
                      </a>
                    </li>
                  </ul>
                </nav>
              </header>
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div class="container-fluid">
                {/* <!-- Page Heading --> */}
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Add Product</h1>
                </div>
                <form>
                  <div class="row">
                    <div class="col-md-2">Product </div>

                    <div class="col-md-10">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Product Name"
                        style={{ marginBottom: "16px;", height: "100px;" }}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                        value={Pname}
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-2">Price </div>

                    <div class="col-md-10">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Enter Product Price"
                        style={{ marginBottom: "16px;", height: "100px;" }}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        value={Price}
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-2">Upload Images </div>
                    <div class="col-md-10">
                      <div class="input-group mb-3">
                        <div class="custom-file">
                          <input
                            accept="image/*"
                            onChange={handlePicture}
                            type="file"
                            class="custom-file-input"
                            name="image"
                            id="inputGroupFile01"
                            required
                          />
                          <label
                            class="custom-file-label"
                            for="inputGroupFile01"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-10">
                      <br />
                      <button
                        type="button"
                        class="btn btn-success ab1"
                        style={{
                          backgroundColor: "#DD3333",
                          border: "1px solid #DD3333",
                        }}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default AddProduct;
