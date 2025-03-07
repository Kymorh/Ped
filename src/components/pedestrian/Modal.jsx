import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import Navigation from "../../components/navigation/Navigation";
import { db } from "../../config/config";
import { doc, updateDoc } from "firebase/firestore";
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

export const MyModal = ({ setModalOpen, modalOpen, ped, fetchPost }) => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [price, setPrice] = useState(0);
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [sex, setSex] = useState("");

    // Update state when ped changes
    useEffect(() => {
        if (ped) {
            setName(ped.name || "");
            setPhoto(ped.img || "");
            setPrice(ped.price || 0);
            setAge(ped.age || 0);
            setHeight(ped.height || 0);
            setSex(ped.sex || "");
        }
    }, [ped]);

    const handleUpdate = async () => {
        if (!ped || !ped.id) return;

        try {
            const updateData = doc(db, "Pedestrians", ped.id);
            await updateDoc(updateData, {
                name,
                age,
                height,
                img: photo,
                price,
                sex,
            });

            fetchPost();
            setModalOpen(false);
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

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
                        alignItems: "center",
                        height: 450,
                        justifyContent: "center",
                    }}
                >
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    <br />
                    <Input value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" />
                    <Typography gutterBottom> Price {price} </Typography>
                    <PrettoSlider
                        value={price}
                        onChange={(e, value) => setPrice(value)}
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                    />
                    <Typography gutterBottom> Age </Typography>
                    <PrettoSlider
                        value={age}
                        onChange={(e, value) => setAge(value)}
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                    />
                    <Typography gutterBottom> Height </Typography>
                    <PrettoSlider
                        value={height}
                        onChange={(e, value) => setHeight(value)}
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        max={200}
                    />
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                    <Select
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                    >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"non-binary"}>Non-binary</MenuItem>
                    </Select>
                    <br />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleUpdate}>
                        Update
                    </Button>
                </Paper>
            </Box>
        </Modal>
    );
};