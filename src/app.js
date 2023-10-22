import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import path from 'path';
import swaggerUi from "swagger-ui-express";
import SwaggerUtil from "./lib/SwaggerUtil.js";
import logger from 'morgan';
import httpContext from 'express-http-context';
//---------------------------------------------------------------
//-------------------------- api routes--------------------------
import { errorHandler } from "./middlewares/error.middlewares.js";
import authUser from "./routes/auth/user-auth.js";
import home from "./routes/home/home.js";
let swaggerUtil = new SwaggerUtil();
const __dirname = path.resolve();
 
var app = express();
app.use(cors({
  origin:'http://localhost:8000',
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(httpContext.middleware);
const httpServer = createServer(app);


//--------------------------------------------------------------------------/
//------------                   Route Initialization       ----------------/
//--------------------------------------------------------------------------/
app.get('/',home);
swaggerUtil.addPath(
  '/api/v1/user-login',
  'User Login API',
  {
    email: {
      type: 'string',
      default: '',
    },
    password: {
      type: 'string',
      default: '',
    },
  },
  'post',
);   
app.use("/api/v1/user-login", authUser);

//--------------------------------------------------------------------------/

//--------------------------------------------------------------------------/
//------------                   Swagger integration        ----------------/
//--------------------------------------------------------------------------/

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerUtil.getDocument()));
//--------------------------------------------------------------------------/

//------------------------------Error Handling------------------------------/
app.use(errorHandler);
//--------------------------------------------------------------------------/

export { httpServer };
