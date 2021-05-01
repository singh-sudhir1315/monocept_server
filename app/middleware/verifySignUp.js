const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateTitle = (req, res, next) => {
   // Email
    User.findOne({
      where: {
        title: req.body.title
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Title is already in use!"
        });
        return;
      }
      
      next();
   
  
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateTitle: checkDuplicateTitle,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;