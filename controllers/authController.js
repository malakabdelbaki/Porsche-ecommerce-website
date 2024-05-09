const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customer = require("../models/customer.js");
const admin = require("../models/admin.js");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let cust = await customer.findOne({ username });
    let adm = await admin.findOne({ username });
    if (!cust && !adm) {
      return res.status(400).json({ msg: "Invalid Username" });
    }
    let isValid;
    let ID;
    let userr;

    if (cust) {
      isValid = await bcrypt.compare(password, cust.password);
      if (isValid) {
        userr = cust;
      }
    } else if (adm) {
      isValid = await bcrypt.compare(password, adm.password);
      if (isValid) {
        userr = adm;
      }
      }

    if (!isValid) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    const jwtPayload = {
      user: userr,
    };

    jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .json({ token, msg: "logged in successfully", userID: ID });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

const registerCust = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await customer.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "customer already exists" });
    }

    // Create new user
    user = new customer({ username, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create JWT
    const jwtPayload = {
      user: user,
    };

    jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const registerAdm = async (req, res) => {
  try {
    const { username, password, department} = req.body;

    // Check if user already exists
    let user = await admin.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "admin already exists" });
    }

    // Create new user
    user = new admin({ username, password, department });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create JWT
    const jwtPayload = {
      user: user,
    };

    jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { login, registerCust , registerAdm};
