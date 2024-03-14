import express from "express";
import jwt from "jsonwebtoken";
import mondoose from "mongoose";
import { registerValidation } from "./validations/auth";
import { validationResult } from "express-validator";

mondoose
  .connect("mongodb+srv://admin:Zmmz159@clusterfuilfusion.dumknae.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFuilFusion")
  .then(() => console.log(`[DB] - Connetn Success`))
  .catch((err) => console.log(`[DB] - ${err}`));

const app = express();
const port = 3000;

app.use(express.json());

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  });
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: "Alex Alexov",
      password: req.body.password,
    },
    "secret123"
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
