import jwt from "jsonwebtoken";
import express from "express";

interface JwtPayload {
  _id: string;
}

export default function checkAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123") as JwtPayload;

      req.userId = decoded._id;
      next();
    } catch (err) {
      console.log("Ошибка при проверке токена.", err);
      return res.status(403).json({
        message: "Нет доступа.",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа.",
    });
  }
}
