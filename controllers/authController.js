const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const customer = require('../models/customer.js');

const login = async (req, res) => {
  try{
    const{ username, password } = req.body;
    let cust = await customer.findOne({username});
    if(!cust){
      return res.status(400).json({msg : 'Invalid Username'});
    }
    const isValid = await bcrypt.compare(password, cust.password);
    if(!isValid){
      return res.status(400).json({msg : 'Invalid Password'});
    }

    const jwtPayload = {
      user:{
        id: cust.id,
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: 3600},
      (err, token) =>{
          if(err) throw err;
          res.json({token})
      }
    );
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }

}

const register  = async(req,res) => {
    try {
        const { username, email, password } = req.body;
    
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }
    
        // Create new user
        user = new User({ username, email, password });
    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    
        // Save user to database
        await user.save();
    
        // Create JWT
        const payload = {
          user: {
            id: user.id,
          },
        };
    
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 }, // expires in 1 hour
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}

module.exports = {login,register}
