import Task from '../models/task.model.js';
import User from '../models/user.model.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, status, isComplete, userId, tagIds } = req.body;
    const task = await Task.create({ title, description, status, isComplete, userId });
    if (tagIds && tagIds.length > 0) {
      await task.addTags(tagIds); 
    }
    const taskWithTags = await Task.findByPk(task.id, {
      include: {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: { attributes: [] }, 
      },
    });
    res.status(201).json(taskWithTags); 
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ error: 'No se pudieron obtener las tareas' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
    });

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    res.status(500).json({ error: 'No se pudo obtener la tarea' });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (req.body.user_id) {
      const user = await User.findByPk(req.body.user_id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'No se pudo actualizar la tarea' });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await task.destroy();
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ error: 'No se pudo eliminar la tarea' });
  }
};
