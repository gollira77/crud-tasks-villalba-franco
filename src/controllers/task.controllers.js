import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import Project from "../models/projects.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, userId, projectId } = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({ message: "title, description y userId son obligatorios" });
    }

    const existing = await Task.findOne({ where: { title } });
    if (existing) return res.status(400).json({ message: "Ya existe una tarea con ese título" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (projectId) {
      const project = await Project.findByPk(projectId);
      if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    const task = await Task.create({ title, description, status, userId, projectId });
    res.status(201).json({ message: "Tarea creada", task });
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea", error });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Project, as: "project", attributes: ["id", "name"] }
      ]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas", error });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Project, as: "project", attributes: ["id", "name"] }
      ]
    });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    if (req.body.userId) {
      const user = await User.findByPk(req.body.userId);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (req.body.projectId) {
      const project = await Project.findByPk(req.body.projectId);
      if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    await task.update(req.body);
    res.status(200).json({ message: "Tarea actualizada", task });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    await task.destroy();  
    res.status(200).json({ message: "Tarea eliminada (lógicamente)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error });
  }
};
