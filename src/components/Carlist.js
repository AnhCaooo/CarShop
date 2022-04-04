import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Carlist() {
  const [cars, setCars] = useState([]);

  // Fetch cars affter the first render
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then((response) => response.json())
      .then((responseData) => setCars(responseData._embedded.cars))
      .catch((err) => console.error(err));
  };

  const deleteCar = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            alert("Something went wrong while deleting");
          } else {
            fetchCars();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const [columns] = useState([
    { field: "brand", sortable: true, filter: true },
    { field: "model", sortable: true, filter: true },
    { field: "color", sortable: true, filter: true, width: 120 },
    { field: "fuel", sortable: true, filter: true, width: 120 },
    { field: "year", sortable: true, filter: true, width: 120 },
    { field: "price", sortable: true, filter: true },
    {
      headerName: "",
      width: 120,
      field: "_links.self.href",
      cellRenderer: (params) => (
        <IconButton color="error" onClick={() => deleteCar(params.value)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  return (
    <>
      <div className="ag-theme-material" style={{ height: 600, width: "90%" }}>
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
