import Task from '../models/task.model.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    const newTask = await Task.create({
      title,
      description,
      isComplete: isComplete || false,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ error: 'No se pudo crear la tarea' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ error: 'No se pudieron obtener las tareas' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

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
