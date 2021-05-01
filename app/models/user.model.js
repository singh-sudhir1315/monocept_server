module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("todo", {
      
      title: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };