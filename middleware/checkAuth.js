const JWT = require("jsonwebtoken");


module.exports = async (req ,res , next) => {
    const token = req.header('x-auth-token');

    if(!token){
        res.status(400).send({ message: "Authorization Denied!!" });
    }

    try{
        let user = await JWT.verify(token , "knjknknjknkjnknkjnjknkjnkjnkjnknknkjnjknkjnkjnjknk");
        req.user = user.password;
        console.log(user ,"!!!!!!!!")
        next()

    }
    catch(error){
        res.status(400).send({ message: "Token Invalid !!" });
    }
}