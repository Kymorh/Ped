import React, { useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import { db } from "../../config/config";
import { collection, addDoc } from "firebase/firestore";
import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { PrettoSlider } from "./style";

export const Add = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  return (
    <div>
      <Navigation />
      <div style={{ marginBottom: "70px" }}>Add Page</div>

      <Paper sx={{ width: 270, margin: "0 auto" }}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />{" "}
        <br />
        <Input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo"
        />
        <Typography gutterBottom> Price {price} </Typography>
        <PrettoSlider
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={20}
        />
        <Typography gutterBottom> Age </Typography>
        <PrettoSlider
          value={age}
          onChange={(e) => setAge(e.target.value)}
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={20}
        />
        <Typography gutterBottom> Height </Typography>
        <PrettoSlider
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={20}
          max={200}
        />
        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
        <Select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Non-binary"}>Non-binary</MenuItem>
        </Select>{" "}
        <br />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            console.log(name, photo, price, age, height, sex);
            addDoc(collection(db, "Pedestrians"), {
             name,
             img:photo,
             price,
             age,
             height,
             sex,
            });
            setName("");
            setAge("");
            setHeight("");
            setPrice("");
            setSex("");
            setPhoto("");
          }}
        >
          Send
        </Button>
      </Paper>
    </div>
  );
};
