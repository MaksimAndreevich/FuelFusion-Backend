import { validationResult } from "express-validator";
import { createToken } from "../helpers";
import express from "express";
import UserModal from "../models/User";
import bcrypt from "bcrypt";
import { CustomRequest } from "../../types/global";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModal({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = createToken(user._id);

    const { passwordHash, ...userData } = user["_doc"];

    res.json({ ...userData, token });
  } catch (err) {
    console.log("Ошибка при регистрации пользователя", err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться.",
    });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Ошибка авторизации.",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user["_doc"].passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Не верный логин или пароль.",
      });
    }

    const token = createToken(user._id);

    const { passwordHash, ...userData } = user["_doc"];

    res.json({ ...userData, token });
  } catch (err) {
    console.log("Ошибка при авторизации пользователя", err);
    res.status(500).json({
      message: "Не удалось авторизоваться.",
    });
  }
};

export const getMe = async (req: CustomRequest, res: express.Response) => {
  try {
    const user = await UserModal.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const token = createToken(user._id);
    const { passwordHash, ...userData } = user["_doc"];

    res.json({ ...userData, token, success: true });
  } catch (err) {
    console.log("Ошибка при получении информации о пользователе", err);
    return res.status(500).json({
      message: "Нет доступа",
      success: false,
    });
  }
};
