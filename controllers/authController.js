const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const customer = require('../models/customer.js');

const login = async (req, res) => {
  try{
    const{ username, password } = req.body;
    let cust = await customer.findOne({email});
    if(!cust){
      return res.status(400).json({msg : 'Invalid Username'});
    }
    const isValid = await bcrypt.compare(password, cust.password);
    if(!isValid){
      return res.status(400).json({msg : 'Invalid Password'});
    }

    const jwtPayload = {
      user:{
        id: customer.id,
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

const register  = (req,res) => {
    
}

module.exports = {login,register}
