import dotenv from "dotenv";
import { httpServer } from "./app.js";

dotenv.config({
  path: "./.env",
});
 
//----------------------------------------------------
//---------           Server Config   ----------------
//----------------------------------------------------
const startServer = () => {
  httpServer.listen(process.env.PORT || 8080, () => {
    console.info(
      `📑Server started at: http://localhost:${process.env.PORT || 8080}`
    );
    console.log("⚙️  Server is running on port: " + process.env.PORT);
  });
};
//---------------------------------------------------

startServer();
