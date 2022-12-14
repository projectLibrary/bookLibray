const {User} = require('../../../data/models');
const ResponseModel = require('../../../utilities/responseModel');
const tokenHandler = require('../../../utilities/tokenHandler');

// Login function.
module.exports.login = async(req, res) => {
    const {email, password} = req.body;
    
    // Check if user exists.
    var user = await User.findOne({where: {
        email: email, 
        password: password}
    });

    if(!user){
        return res.json(new ResponseModel(null, null, ['Invalid credentials.']));
    }

    // Create token.
    const token = tokenHandler.createToken({
        id: user.id,
        name: user.name,
        role: user.role
    });

    res.json(new ResponseModel(token));
}

// Register function.
module.exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        // Check if user already exists.
        const userExists = await User.findOne({where: {email: email}});
        if(userExists){
            return res.status(400)
                .json(new ResponseModel(null, null, ['User already exists.']));
        }

        var user = await User.create({
            name: name,
            email: email,
            password: password
        });
        res.json(new ResponseModel(user));
    }
    catch(err){
        console.log(err);
        res.status(500).json(new ResponseModel(null, null, ['Unable to create user.']));
    }
}