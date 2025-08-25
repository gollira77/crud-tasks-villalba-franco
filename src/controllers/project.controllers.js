import Project from "../models/projects.model.js";
import User from "../models/user.model.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, userId, deadline } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const project = await Project.create({ name, description, userId, deadline });
    res.status(201).json({ message: "Proyecto creado", project });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proyecto", error });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { isActive: true },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proyectos", error });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, isActive: true },
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
    });
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proyecto", error });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project || !project.isActive) return res.status(404).json({ message: "Proyecto no encontrado" });

    await project.update(req.body);
    res.status(200).json({ message: "Proyecto actualizado", project });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar proyecto", error });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project || !project.isActive) return res.status(404).json({ message: "Proyecto no encontrado" });

    await project.update({ isActive: false });
    res.status(200).json({ message: "Proyecto eliminado (lógicamente)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar proyecto", error });
  }
};
