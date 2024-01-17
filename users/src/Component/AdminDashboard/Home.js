import React, { useState, useEffect } from "react";
import "../css/bootstrap.css";
import "../css/style.css";
import "../css/all.min.css";
import "../css/nunito.css";
import "../css/sb-admin-2.min.css";
import "../css/dataTables.bootstrap4.min.css";
import { Table } from "react-bootstrap";
import io from "socket.io-client"; // Import Socket.io client library
const socket = io.connect("http://localhost:3305");
const Home = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
   

    // Listen for updates from the server
    socket.on("productUpdate", (updatedData) => {
      console.log("Received product update:", updatedData);

      // Update the state with the new data
      setData((prevData) => {
        // Find the index of the updated product in the current data
        const updatedIndex = prevData.findIndex((item) => item._id === updatedData._id);
        console.log(updatedIndex)
        // If the product is found, update it; otherwise, add it to the data
        if (updatedIndex !== -1) {
          return [
            ...prevData.slice(0, updatedIndex),
            updatedData,
            ...prevData.slice(updatedIndex + 1),
          ];
        } else {
          return [...prevData, updatedData];
        }
      });
    });

    // Fetch initial data
    fetch("http://localhost:3305/Product").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
console.log(data)
socket.emit();
    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
     <body id="page-top">
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/* <!-- Sidebar --> */}
         
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" class="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              {/* <!-- Topbar --> */}
           
              <div class="container-fluid">
                {/* <!-- Page Heading --> */}
             
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
                      <th class="bl5"> Product</th>
                      <th class="bl5"> Price</th>
                      
                      <th class="bl5">Picture</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index) => (
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
                        
                          </tr>
                        ))}
                  </tbody>
                </Table>
              </div>
              {/* <!-- /.container-fluid --> */}
            </div>
         
          </div>
          {/* <!-- End of Content Wrapper --> */}
        </div>
        
      </body>

    </div>
  );
};

export default Home;
