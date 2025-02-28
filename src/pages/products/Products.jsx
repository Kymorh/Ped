import React from "react";
import Navigation from "../../components/navigation/Navigation";
import Pedestrian from "../../components/pedestrian/Pedestrian";
import { Typography } from "@mui/material";

export const Products = () => {
  return (
    <div>
      <Navigation />
      <Typography variant="h3">Products</Typography>
      <Pedestrian/>
    </div>
  );
};
