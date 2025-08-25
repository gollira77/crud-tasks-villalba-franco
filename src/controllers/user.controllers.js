import User from "../models/user.model.js";
import Task from "../models/task.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email ya registrado" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Usuario creado", user });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [{ model: Task, as: "tasks" }] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: ["tasks"] });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update(req.body);
    res.status(200).json({ message: "Usuario actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
