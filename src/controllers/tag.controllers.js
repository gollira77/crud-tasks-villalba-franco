import Tag from "../models/tags.model.js";

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const existing = await Tag.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: "Ya existe un tag con ese nombre" });
    }

    const tag = await Tag.create({ name });
    res.status(201).json({ message: "Tag creado", tag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tags", error });
  }
};

export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag no encontrado" });

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tag", error });
  }
};

export const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag no encontrado" });

    const { name } = req.body;
    if (name) tag.name = name;

    await tag.save();
    res.status(200).json({ message: "Tag actualizado", tag });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tag", error });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag no encontrado" });

    await tag.destroy();
    res.status(200).json({ message: "Tag eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tag", error });
  }
};
