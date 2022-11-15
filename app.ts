import express, { Request, Response } from "express";

const app = express();

app.get("/getPacket", (req: Request, res: Response) => {
  res.json();
});

app.listen(8080)