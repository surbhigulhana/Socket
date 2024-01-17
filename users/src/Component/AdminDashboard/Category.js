import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/bootstrap.css";
import "../css/style.css";
import "../css/all.min.css";
import "../css/nunito.css";
import "../css/sb-admin-2.min.css";
import "../css/dataTables.bootstrap4.min.css";

import { Table } from "react-bootstrap";

const Product = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("http://localhost:3305/Product").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }, []);

  // ------delete -----

  async function deleteData(id) {
    let result = await fetch(`http://localhost:3305/Product/${id}`, {
      method: "delete",
    });
    let data = await result.json();

    fetch("http://localhost:3305/Product").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }
  // ------------------------------------------------------------------------------
  const handleShowView = () => setEditShowView(true);
  const [editShowView, setEditShowView] = useState(false);
  //-----------edit----------------------
  const handleShow = () => setEditShow(true);
  const [editShow, setEditShow] = useState(false);
  const handleClose = () => setEditShow(false);
  //-------------------------------------------------------
  const [Pname, setname] = useState("");
  const [Price, setPrice] = useState("");
  const [id, setId] = useState("");
  // const [editShow, setEditShow] = useState(false);
  const editHandleClose = () => setEditShow(false);
  const editHandleShow = () => setEditShow(true);

  function editDataDisplay(uid, id) {

    const filterData = data.filter((item) => {
      return item._id === id;
    });
    setname(filterData[0].Pname);
    setPrice(filterData[0].Price)
    setPicture(filterData[0].filename);

    setId(filterData[0]._id);
  }
console.log(id)
async function editData() {
  var formData = new FormData();
  formData.append("Pname", Pname);
  formData.append("Price", Price);

  // Check if an image is available
  if (picture.bytes) {
    formData.append("filename", picture.bytes);
  }

  let result = await fetch(`http://localhost:3305/ProductImg/${id}`, {
    method: "post",
    mode: "cors",
    body: formData,
  });

  let data = await result.json();
  console.log(data);

  fetch("http://localhost:3305/Product").then((result) => {
    result.json().then((resp) => {
      setData(resp);
    });
  });
}


  // const[data,setData]=useState([]);
  const [picture, setPicture] = useState({ fileName: "", bytes: "" });
  const handlePicture = (event) => {
    setPicture({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
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

                    {/* <!-- Nav Item - Alerts --> */}

                    {/* <!-- Nav Item - Messages --> */}

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
                  <h1 class="h3 mb-0 text-gray-800">Product</h1>
                  <a href="/AddProduct">
                    <button
                      type="button"
                      class="btn btn-danger"
                      style={{
                        background: "#DD3333;",
                        border: "solid 1px #DD3333",
                      }}
                    >
                      ADD PRODUCT
                    </button>
                  </a>
                </div>
                <Table
                  id="example"
                  striped
                  bordered
                  hover
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th class="bl5"> #</th>
                      <th class="bl5">Product</th>
                      <th class="bl5"> Price</th>

                      <th class="bl5">Picture</th>
                      <th class="bl5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data
                        .filter((val) => {
                          if (search == "") {
                            return val;
                          } else if (
                            val.CateName.toLowerCase().includes(
                              search.toLowerCase()
                            )
                          ) {
                            return val;
                          }
                        })
                        .map((item, index) => (
                          <tr key={item._id}>
                            <td data-label="User Id">{index + 1}</td>
                            <td data-label="firstName">{item.Pname}</td>
                            <td data-label="firstName">{item.Price}</td>
                            <td>
                              <img
                                width="100"
                                height="80"
                                src={item.filename}
                              />
                            </td>
                            <td data-label="Action">
                              &nbsp; &nbsp;
                              <button
                                type="button"
                                class="btn btn-primary ab1"
                                onClick={() => {
                                  editDataDisplay(item.uid, item._id);
                                  editHandleShow();
                                }}
                                style={{
                                  backgroundColor: "#DD3333",
                                  color: "white",
                                  border: "none",
                                }}
                              >
                                Edit
                              </button>
                              &nbsp;&nbsp;
                              <button
                                type="button"
                                class="btn btn-primary ab1"
                                onClick={() => deleteData(item._id)}
                                style={{
                                  backgroundColor: "#DD3333",
                                  color: "white",
                                  border: "none",
                                }}
                              >
                                Delete
                              </button>
                              <Modal
                                size="small"
                                show={editShow}
                                onHide={editHandleClose}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Edit Data</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <div class="container-fluid">
                                    {/* <!-- Page Heading --> */}
                                    <div class="d-sm-flex align-items-center justify-content-between mb-4"></div>
                                    <form>
                                      <div class="row">
                                        <div
                                          class="col-md-2"
                                          style={{ marginTop: "6px;" }}
                                        >
                                          Product{" "}
                                        </div>
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
                                      </div><br/>
                                      <div class="row">
                                        <div
                                          class="col-md-2"
                                          style={{ marginTop: "6px;" }}
                                        >
                                          Price{" "}
                                        </div>
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
                                      </div><br />
                                      <div class="row">
                                        <div
                                          class="col-md-2"
                                          style={{ marginTop: "6px;" }}
                                        >
                                          Image{" "}
                                        </div>
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
                                    </form>
                                  </div>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={editHandleClose}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={() => {
                                      editData(item._id);
                                      editHandleClose();
                                    }}
                                    style={{
                                      backgroundColor: "#DD3333",
                                      color: "white",
                                      border: "none",
                                    }}
                                  >
                                    Save Changes
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </Table>
              </div>
              {/* <!-- /.container-fluid --> */}
            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}

            {/* <!-- End of Footer --> */}
          </div>
          {/* <!-- End of Content Wrapper --> */}
        </div>

      </body>
    </div>
  );
};

export default Product;
