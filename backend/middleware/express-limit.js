const rateLimit = require('express-rate-limit')

exports.limit20 = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20 // limit each IP to 100 requests per windowMs
  });

exports.limit400 =rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 400 // limit each IP to 100 requests per windowMs
  });