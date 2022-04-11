import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Addcar from "./Addcar";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

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
            setOpen(true);
            fetchCars();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addCar = (newCar) => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then((response) => {
        if (response.ok) {
          fetchCars();
        } else {
          alert("Something went wrong when adding new car!");
        }
      })
      .catch((err) => console.error(err));
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
      <Addcar addCar={addCar} />
      <div className="ag-theme-material" style={{ height: 600, width: "90%" }}>
        <AgGridReact
          columnDefs={columns}
          rowData={cars}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Car was deleted successfully"
      />
    </>
  );
}

export default Carlist;
