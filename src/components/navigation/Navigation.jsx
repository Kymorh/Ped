import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
export default function Navigation() {
  return (
    <Box className=" flex justify-center" sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
      <Link to="/login">

        <Typography sx={{ minWidth: 100 }}>Login</Typography>
      </Link>
      <Link to="/register">
        <Typography sx={{ minWidth: 100 }}>Register</Typography>
      </Link>

      <Link to="/">
        <Typography sx={{ minWidth: 100 }}>Products</Typography>
      </Link>

      <Link to="/Add">
        <Typography sx={{ minWidth: 100 }}> <Link to="/add"> <PersonAddIcon sx={{ fontSize: "40px" }} /> </Link></Typography>
      </Link>
    </Box>
    
  );
}
