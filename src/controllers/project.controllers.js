import Project from "../models/projects.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const project = await Project.create({ name, description, userId });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proyecto", error });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: "user", 
          attributes: ["id", "name", "email"],
        }
      ],
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyectos", error: error.message });
  }
};

