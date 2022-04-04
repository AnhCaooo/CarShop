import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Carlist() {
  const [cars, setCars] = useState([]);

  // Fetch cars affter the first render
  useEffect(() => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then((response) => response.json())
      .then((responseData) => setCars(responseData._embedded.cars))
      .catch((err) => console.error(err));
  }, []);

  const [columns] = useState([
    { field: "brand", sortable: true, filter: true },
    { field: "model", sortable: true, filter: true },
    { field: "color", sortable: true, filter: true },
    { field: "fuel", sortable: true, filter: true },
    { field: "year", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
  ]);

  return (
    <>
      <div className="ag-theme-material" style={{ height: 700, width: "90%" }}>
        <AgGridReact
          columnDefs={columns}
          rowData={cars}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </>
  );
}

export default Carlist;
