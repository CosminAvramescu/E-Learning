import { TextField } from "@mui/material";
import React from "react";
import "../css/Searchbar.css";

export default function Searchbar() {
  return (
    <TextField
      className="inputRounded"
      variant="outlined"
      fullWidth
      placeholder="Search"
      margin="none"
    />
  );
}
