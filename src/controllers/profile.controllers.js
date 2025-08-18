import Profile from "../models/profiles.model.js";
import User from "../models/user.model.js"; 

export const createProfile = async (req, res) => {
  try {
    const { bio, userId } = req.body;
    const profile = await Profile.create({ bio, userId });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el perfil", error });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: {
        model: User,
        attributes: ["id", "name", "email"],
      },
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfiles", error });
  }
};
