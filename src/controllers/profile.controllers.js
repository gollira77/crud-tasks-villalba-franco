import Profile from "../models/profiles.model.js";
import User from "../models/user.model.js";

export const createProfile = async (req, res) => {
  try {
    const { bio, avatar, userId } = req.body;

    if (!userId) return res.status(400).json({ message: "El userId es obligatorio" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const profile = await Profile.create({ bio, avatar, userId });
    res.status(201).json({ message: "Profile creado", profile });
  } catch (error) {
    res.status(500).json({ message: "Error al crear profile", error });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener profiles", error });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id, {
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
    });
    if (!profile) return res.status(404).json({ message: "Profile no encontrado" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener profile", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile no encontrado" });

    if (req.body.userId) {
      const user = await User.findByPk(req.body.userId);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await profile.update(req.body);
    res.status(200).json({ message: "Profile actualizado", profile });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar profile", error });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile no encontrado" });

    await profile.destroy();
    res.status(200).json({ message: "Profile eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar profile", error });
  }
};
