import express, { urlencoded } from "express";
import cors from "cors";
import fs from "fs";
import { request } from "https";


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./todo.json"));
  console.log("THIS RIGHT HERE" + data);
  res.status(200).json(data);
});

app.post("/add", (req, res) => {
  const newTask = {
    name: req.body.name,
  };
  const data = JSON.parse(fs.readFileSync("./todo.json"));
  data.push(newTask);
  console.log(data);
  fs.writeFileSync("./todo.json", JSON.stringify(data));

  res.status(200).json(data);
});

app.delete("/delete/:name", (req, res) => {
  const delTask = {
    name: req.params.name,
  };
  const data = JSON.parse(fs.readFileSync("./todo.json"));

  const indexOfObject = data.findIndex((task) => {
    return task.name === delTask.name;
  });

  if (indexOfObject !== -1) {
    data.splice(indexOfObject, 1);
    fs.writeFileSync("./todo.json", JSON.stringify(data));
  }

  res.status(200).json(data);
});

app.listen(3001, () => {
  console.log("Listening on port 3001  :)");
});
