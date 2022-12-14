const ResponseModel = require('../utilities/responseModel');
const tokenHandler = require('../utilities/tokenHandler');

module.exports = (req, res, next) => {
    if(!req.url.startsWith('/api/v1/user')){
        return next();
    }

    let token = req.headers['authorization'];
    token = token ? token.split(' ')[1] : null;
    console.log("This is token....",token)
    if(!token){
        return res.status(401)
            .json(new ResponseModel(null, null, ['Unauthorized.']));
    }

    try{
        const tokenResult = tokenHandler.verifyToken(token);
        req.user = tokenResult;
        return next();
    }
    catch(err){
        return res.status(401)
            .json(new ResponseModel(null, null, ['Unauthorized.']));
    }
}