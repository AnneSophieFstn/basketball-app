import Terrain from "../model/terrain.model.js";

async function getAllTerrain(req, res) {
  try {
    const terrains = await Terrain.findAll();
    return res.status(200).json(terrains);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
async function getOneTerrain(req, res) {
  try {
    const terrain = await Terrain.findByPk(req.params.id);

    if (!terrain) {
      return res.status(404).json({ message: "Ce terrain n'existe pas" });
    }
    return res.status(200).json(terrain);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function createTerrain(req, res) {
  try {
    if (
      !req.file ||
      !req.body.name ||
      !req.body.adresse ||
      !req.body.nbrTerrains ||
      !req.body.nbrPaniers ||
      !req.body.longitude ||
      !req.body.latitude ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const filePath = req.file.path; // Chemin du fichier téléchargé
    const correctedPath = filePath.replace(/\\/g, "/");

    const createTerrain = await Terrain.create({
      image: correctedPath,
      name: req.body.name,
      adresse: req.body.adresse,
      nbrTerrains: req.body.nbrTerrains,
      nbrPaniers: req.body.nbrPaniers,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      user_id: req.body.user_id,
    });

    return res.status(200).json({
      message: "Terrain ajouté avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
async function updateTerrain(req, res) {
  try {
    if (
      !req.file ||
      !req.body.name ||
      !req.body.adresse ||
      !req.body.nbrTerrains ||
      !req.body.nbrPaniers ||
      !req.body.longitude ||
      !req.body.latitude ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const filePath = req.file.path; // Chemin du fichier téléchargé
    const correctedPath = filePath.replace(/\\/g, "/");

    const updateTerrain = await Terrain.update(
      {
        image: correctedPath,
        name: req.body.name,
        adresse: req.body.adresse,
        nbrTerrains: req.body.nbrTerrains,
        nbrPaniers: req.body.nbrPaniers,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        user_id: req.body.user_id,
      },
      { where: { id: req.params.id } }
    );

    if (!updateTerrain) {
      res.status(400).json({ message: "Ce terrain n'existe pas" });
    }

    return res.status(200).json({
      message: "Terrain modifié avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
async function deleteTerrain(req, res) {
  try {
    const deleteTerrain = Terrain.destroy({
      where: { id: req.params.id },
    });

    if (!deleteTerrain) {
      res.status(400).json({ message: "Ce terrain n'existe pas" });
    }

    return res.status(200).json({ message: "Le terrain à bien été supprimé" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export {
  getAllTerrain,
  getOneTerrain,
  createTerrain,
  updateTerrain,
  deleteTerrain,
};
