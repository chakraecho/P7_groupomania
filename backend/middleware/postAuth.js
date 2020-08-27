const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
      const token = req.cookies.aBigSecret;
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      const email = decodedToken.userId;
      if (req.body.email && req.session.email !== email) {
        throw 'action non autorisé !';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  }