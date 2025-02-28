import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/config";
import { useEffect, useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { doc, deleteDoc } from "firebase/firestore";
import { MyModal } from "./Modal";
import UpdateIcon from '@mui/icons-material/Update';



export default function Pedestrian() {
  const [pedes, setPedes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const fetchPost = async () => {
    await getDocs(collection(db, "Pedestrians")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPedes(newData);
      console.log(pedes, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Grid container spacing={2}>
      {pedes.map((ped) => (
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 300 }} image={ped.img} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {ped.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                This is a tipe of pedestrian,{" "}
                {ped.sex == "male" ? "his" : "her"} age is {ped.age}, height{" "}
                {ped.height} cm
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
             
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </div>
              <div>  <Button onClick={()=>setModalOpen(true)}> <UpdateIcon sx={{ fontSize: "30px" }} /></Button>
              <Button size="small" onClick={()=>{ 
                deleteDoc(doc(db, "Pedestrians", ped.id) )
                fetchPost()
                }}>
             
                <DeleteForeverIcon sx={{ fontSize: "30px" }} />
              </Button></div>
              
 
            </CardActions>
          </Card>
        </Grid>
      ))}
      <MyModal modalOpen ={modalOpen} setModalOpen = { setModalOpen} ped = {ped} fetchPost ={fetchPost}/>
    </Grid>
  );
}
