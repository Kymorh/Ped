import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import { db } from "../../config/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
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


export const MyModal = ({ setModalOpen, modalOpen, ped, fetchPost}) => {
  const [name, setName] = useState(ped.name);
  const [photo, setPhoto] = useState(ped.img);
  const [price, setPrice] = useState(ped.price);
  const [age, setAge] = useState(ped.age);
  const [height, setHeight] = useState(ped.height);
  const [sex, setSex] = useState(ped.sex);
  console.log("Modal")
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Navigation />
        

        <Paper
          sx={{
            width: 320,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: " center",
            height: 450,
            justifyContent:"center"

          }}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
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
            onClick={async() => { {
              console.log(name, photo, price, age, height, sex);
              const updateData = doc(db,'Pedestrians', ped.id);
        await updateDoc(updateData,{name, age, height, img:photo, price, sex});
              fetchPost()
              setName("");
              setAge("");
              setHeight("");
              setPrice("");
              setSex("");
              setPhoto("");
              setModalOpen(false)}
            }}
          >
            Update
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
};
