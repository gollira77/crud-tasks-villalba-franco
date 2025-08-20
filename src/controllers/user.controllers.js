import User from '../models/user.model.js';
import Task from '../models/task.model.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    if (name.length > 100 || email.length > 100 || password.length > 100) {
      return res.status(400).json({ message: 'Cada campo debe tener como máximo 100 caracteres.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email.' });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuario creado con éxito.', user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario.' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Task, as: 'tasks', attributes: ['id', 'title', 'isComplete'] }],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Task, as: 'tasks', attributes: ['id', 'title', 'isComplete'] }],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario.' });
  }
};
