const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModal = require("../models/user");

const secret = "test";

class userController {
  //[POST] /users/sign-in
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const oldUser = await UserModal.findOne({ email });

      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exist" });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );

      if (!isPasswordCorrect)
        return res.status(400).json({ message: "invalid credentials" });

      const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
        expiresIn: "1h",
      });

      res.status(200).json({ result: oldUser, token });
    } catch (error) {
      res.status(500).json({ message: "something went wrong!" });
      console.log(error);
    }
  }

  //[POST] /users/sign-up
  async signUp(req, res) {
    try {
      const { email, password, firstName, lastName } = req.body;
      const oldUser = await UserModal.findOne({ email });

      if (oldUser) {
        return res.status(400).json({ message: "User already exits" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await UserModal.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });

      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "1h",
      });
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "something went wrong!" });
      console.log(error);
    }
  }

  //[POST] /users/google-sign-in
  async googleSignIn(req, res) {
    const { email, name, token, googleId } = req.body;

    try {
      const oldUer = await UserModal.findOne({ email });

      if (oldUer) {
        const result = { _id: oldUer._id.toString(), email, name };
        return res.status(200).json({ result, token });
      }

      const result = await UserModal.create({ email, name, googleId });

      res.status(200).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "something went wrong!" });
      console.log(error);
    }
  }
}

module.exports = new userController();
