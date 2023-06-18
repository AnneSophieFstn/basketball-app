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
      !req.query.name ||
      !req.query.adresse ||
      !req.query.nbrTerrains ||
      !req.query.nbrPaniers ||
      !req.query.longitude ||
      !req.query.latitude ||
      !req.query.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const createTerrain = await Terrain.create({
      name: req.query.name,
      adresse: req.query.adresse,
      nbrTerrains: req.query.nbrTerrains,
      nbrPaniers: req.query.nbrPaniers,
      longitude: req.query.longitude,
      latitude: req.query.latitude,
      user_id: req.query.user_id,
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
      !req.query.name ||
      !req.query.adresse ||
      !req.query.nbrTerrains ||
      !req.query.nbrPaniers ||
      !req.query.longitude ||
      !req.query.latitude ||
      !req.query.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const updateTerrain = await Terrain.update(
      {
        name: req.query.name,
        adresse: req.query.adresse,
        nbrTerrains: req.query.nbrTerrains,
        nbrPaniers: req.query.nbrPaniers,
        longitude: req.query.longitude,
        latitude: req.query.latitude,
        user_id: req.query.user_id,
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
