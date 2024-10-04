const jwt = require('jsonwebtoken');
const config = require('../common/config.js');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
      console.log('Token no presente');
      return res.status(401).send({ server: config.SERVER, data: `Se requiere token` });
    }
    
    jwt.verify(token, config.SECRET, (err, user) => {
      if (err) {
        console.log('Token no válido', err);
        return res.status(403).send({ server: config.SERVER, data: `Token no válido` });
      }
      req.user = user;
      
      next();
    });
  }
  

const verifyRol = (requiredRoles) => {
    return (req, res, next) => {
        if (!requiredRoles.includes(req.user.role))
            return res.status(403).send({ server: config.SERVER, data: `Permisos insuficientes` });
        
        next();
    };
}

module.exports = {
    verifyToken,
    verifyRol
};
