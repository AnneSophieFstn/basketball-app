import Match from "../model/match.model.js";

async function getAllMatch(req, res) {
  try {
    const matchs = await Match.findAll();
    return res.status(200).json(matchs);
  } catch (error) {
    return res.status(500).json(
      console.log(error) /* {
      message: "Une erreur est survenue lors de la récupération du match",
    } */
    );
  }
}
async function getOneMatch(req, res) {
  try {
    const match = await Match.findByPk(req.params.id);
    /*  */
    if (!match) {
      return res.status(404).json({ message: "Ce match n'existe pas" });
    }

    return res.status(200).json(match);
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du match",
    });
  }
}

async function getMatchByTerrain(req, res) {
  try {
    const matchByTerrain = await Match.findAll({
      where: {
        terrain_id: req.params.terrain_id,
      },
    });

    if (!matchByTerrain.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun match trouver pour ce terrain." });
    }

    return res.status(200).json(matchByTerrain);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function createMatch(req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.heure ||
      !req.body.nbrParticipants ||
      !req.body.type ||
      !req.body.description ||
      !req.body.terrain_id ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const createMatch = Match.create({
      name: req.body.name,
      date: req.body.date,
      heure: req.body.heure,
      nbrParticipants: req.body.nbrParticipants,
      type: req.body.type,
      description: req.body.description,
      terrain_id: req.body.terrain_id,
      user_id: 1,
    });

    return res.status(200).json({
      message: "Match ajouté avec succès",
    });
  } catch (error) {
    return res.status(500).json(
      {
        message: "Une erreur est survenue lors de la récupération du match",
      },
      console.log(error.response)
    );
  }
}
async function updateMatch(req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.heure ||
      !req.body.nbrParticipants ||
      !req.body.type ||
      !req.body.description ||
      !req.body.terrain_id ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const updateMatch = Match.update(
      {
        name: req.body.name,
        date: req.body.date,
        heure: req.body.heure,
        nbrParticipants: req.body.nbrParticipants,
        type: req.body.type,
        description: req.body.description,
        terrain_id: req.body.terrain_id,
        user_id: req.body.user_id,
      },
      { where: { id: req.params.id } }
    );
    if (!updateMatch) {
      res.status(400).json({ message: "Ce match n'existe pas" });
    }

    return res.status(200).json({
      message: "Le match a bien été mis à jour..",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du match",
    });
  }
}
async function deleteMatch(req, res) {
  try {
    const deleteMatch = await Match.destroy({
      where: { id: req.params.id },
    });

    if (!deleteMatch) {
      res.status(400).json({ message: "Ce match n'existe pas" });
    }

    return res.status(200).json({ message: "Le match à bien été supprimé" });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du match",
    });
  }
}

export {
  getAllMatch,
  getOneMatch,
  getMatchByTerrain,
  createMatch,
  updateMatch,
  deleteMatch,
};
