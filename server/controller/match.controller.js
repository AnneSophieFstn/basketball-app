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
async function createMatch(req, res) {
  try {
    if (
      !req.query.name ||
      !req.query.date ||
      !req.query.heure ||
      !req.query.nbrParticipants ||
      !req.query.typeMatch ||
      !req.query.description ||
      !req.query.terrain_id ||
      !req.query.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const createMatch = Match.create({
      name: req.query.name,
      date: req.query.date,
      heure: req.query.heure,
      nbrParticipants: req.query.nbrParticipants,
      typeMatch: req.query.typeMatch,
      description: req.query.description,
      terrain_id: req.query.terrain_id,
      user_id: req.query.user_id,
    });

    return res.status(200).json({
      message: "Match ajouté avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du match",
    });
  }
}
async function updateMatch(req, res) {
  try {
    if (
      !req.query.name ||
      !req.query.date ||
      !req.query.heure ||
      !req.query.nbrParticipants ||
      !req.query.typeMatch ||
      !req.query.description ||
      !req.query.terrain_id ||
      !req.query.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const updateMatch = Match.update(
      {
        name: req.query.name,
        date: req.query.date,
        heure: req.query.heure,
        nbrParticipants: req.query.nbrParticipants,
        typeMatch: req.query.typeMatch,
        description: req.query.description,
        terrain_id: req.query.terrain_id,
        user_id: req.query.user_id,
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

export { getAllMatch, getOneMatch, createMatch, updateMatch, deleteMatch };
