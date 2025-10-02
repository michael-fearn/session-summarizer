import express, { Application, Request, Response, NextFunction } from "express";
// import morgan from "morgan";
// import helmet from "helmet";
// import cors from "cors";
// import compression from "compression";
import path from "path";

import apiRoutes from "./api";
// import authRoutes from "./routes/auth";

export function createApp(): Application {
  const app = express();

  /** ----------------------------
   *  Global middleware
   * ----------------------------- */
  //   app.use(helmet()); // security headers
  //   app.use(cors()); // enable CORS
  //   app.use(compression()); // gzip compression
  //   app.use(morgan("dev")); // request logging

  // Parse incoming JSON and urlencoded payloads
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Serve static assets (e.g. images, frontend build, docs)
  app.use("/public", express.static(path.join(__dirname, "../public")));

  /** ----------------------------
   *  Routes
   * ----------------------------- */
  //   app.get("/", (req: Request, res: Response) => {
  //     res.json({ message: "Welcome to the API 👋" });
  //   });

  app.use("/api", apiRoutes);
  //   app.use("/auth", authRoutes);

  /** ----------------------------
   *  Error Handling
   * ----------------------------- */
  // 404 handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: "Not Found" });
  });
  // central error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  });

  return app;
}
