import Evenement from "../model/evenement.model.js";

async function getAllEvenement(req, res) {
  try {
    const evenements = await Evenement.findAll();
    return res.status(200).json(evenements);
  } catch (error) {
    return res.status(500).json({ messages: error });
  }
}
async function getOneEvenement(req, res) {
  try {
    const evenement = await Evenement.findByPk(req.params.id);

    if (!evenement) {
      return res.status(404).json({ message: "Cet evenement n'existe pas" });
    }
    return res.status(200).json(evenement);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
async function createEvenement(req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.heure ||
      !req.body.nbrPlaces ||
      !req.body.payant ||
      !req.body.type ||
      !req.body.description ||
      !req.body.terrain_id ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const createEvenement = await Evenement.create({
      name: req.body.name,
      date: req.body.date,
      heure: req.body.heure,
      nbrPlaces: req.body.nbrPlaces,
      payant: req.body.payant,
      type: req.body.type,
      description: req.body.description,
      terrain_id: req.body.terrain_id,
      user_id: 1,
    });

    return res.status(200).json({
      message: "Evenement ajouté avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
async function updateEvenement(req, res) {
  try {
    if (
      !req.query.name ||
      !req.query.date ||
      !req.query.heure ||
      !req.query.nbrPlaces ||
      !req.query.payant ||
      !req.query.type ||
      !req.query.description ||
      !req.query.terrain_id ||
      !req.query.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const updateEvenement = await Evenement.update(
      {
        name: req.query.name,
        date: req.query.date,
        heure: req.query.heure,
        nbrPlaces: req.query.nbrPlaces,
        payant: req.query.payant,
        type: req.query.type,
        description: req.query.description,
        terrain_id: req.query.terrain_id,
        user_id: req.query.user_id,
      },
      { where: { id: req.params.id } }
    );

    if (!updateEvenement) {
      res.status(400).json({ message: "Cet evenement n'existe pas" });
    }

    return res.status(200).json({
      message: "Evenement modifié avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function deleteEvenement(req, res) {
  try {
    const deleteEvenement = await Evenement.destroy({
      where: { id: req.params.id },
    });

    if (!deleteEvenement) {
      res.status(400).json({ message: "Cet evenement n'existe pas" });
    }

    return res.status(200).json({ message: "L'evenement à bien été supprimé" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export {
  getAllEvenement,
  getOneEvenement,
  createEvenement,
  updateEvenement,
  deleteEvenement,
};
