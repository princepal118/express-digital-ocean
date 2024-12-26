import express from "express";
import logger from "./config/logger.js";

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextd = 1;
//add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextd++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
  console.log("teaData", teaData);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea by id
app.get("/teas/:id", (req, res) => {
  try {
    const id = req.params.id;
    const tea = teaData.find((item) => item.id === parseInt(id));
    if (!tea) res.status(404).send("Tea not found");
    res.status(200).send(tea);
  } catch (error) {
    console.log("error", error);
  }
});
// update the tea by id.
app.put('/teas/:id',(req,res)=>{
    const {name,price} = req.body;
    const id = req.params.id;
    const tea =  teaData.find(item => item.id == parseInt(id));
    if (!tea) res.status(404).send("Tea not found");
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

app.delete('/teas/:id',(req,res)=>{
    const teaId = req.params.id;
    const index = teaData.findIndex(item => item.id == parseInt(teaId));
    if(index == -1){
        res.status(404).send("Tea not found");
    }
    teaData.splice(index,1)
    return res.status(200).send('deleted')
})

app.listen(port, () => {
  console.log(`Server is listening at port : ${port}`);
});
