import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useEffect, useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from '@mui/icons-material/Update';
import { MyModal } from "./Modal";

export default function Pedestrian() {
  const [pedes, setPedes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPed, setSelectedPed] = useState(null); // New state

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, "Pedestrians"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPedes(newData);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
      <Grid container spacing={2}>
        {pedes.map((ped) => (
            <Grid item xs={3} key={ped.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 300 }} image={ped.img} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ped.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    This is a type of pedestrian, {ped.sex === "male" ? "his" : "her"} age is {ped.age}, height {ped.height} cm
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </div>
                  <div>
                    <Button onClick={() => {
                      setSelectedPed(ped);
                      setModalOpen(true);
                    }}>
                      <UpdateIcon sx={{ fontSize: "30px" }} />
                    </Button>
                    <Button size="small" onClick={async () => {
                      await deleteDoc(doc(db, "Pedestrians", ped.id));
                      fetchPost();
                    }}>
                      <DeleteForeverIcon sx={{ fontSize: "30px" }} />
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </Grid>
        ))}
        {selectedPed && (
            <MyModal modalOpen={modalOpen} setModalOpen={setModalOpen} ped={selectedPed} fetchPost={fetchPost} />
        )}
      </Grid>
  );
}