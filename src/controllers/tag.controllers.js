import Tags from "../models/tags.model.js";
import Task from "../models/task.model.js"; 

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tags.create({ name });
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el tag", error });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tags.findAll({
      include: {
        model: Task,
        attributes: ["id", "title", "status"],
      },
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tags", error });
  }
};
