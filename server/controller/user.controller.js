import UserModel from "../model/user.model.js";

async function getAllUser(req, res) {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}

export default getAllUser;
