const db = require("../models");
const config = require("../config/auth.config");
require("dotenv").config();//npm install dotenv
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");





exports.todo = (req, res) => {
  // Save User to Database
  User.findOne({
    where: {
      title: req.body.title
    }
  }).then(user => {
     
    User.create({
          title: req.body.title,
          text: req.body.text
        })
          .then(user => {
            res.send({ message: "Todo List Added Successfully!" });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
    
  });
};



exports.todoList = (req, res) => {
  User.findAll({
    
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "No Todo Found" });
      }
      const data = user.map((user)=>{
        return {
          id: user.id,
          title: user.title,
          text: user.text
        }
      })
        res.status(200).send({data});
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
};

exports.deleteTodo = (req, res) => {
  User.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (user) {
        return res.status(200).send({ message: "Todo Deleted Successfully" });
      }
      return res.status(404).send({ message: "Todo Not Found" });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
};


exports.editTodo = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "No Todo Found" });
      }
      res.status(200).send({
        id: user.id,
        title: user.title,
        text: user.text
      });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
};


exports.updateTodo = (req, res) => {
  console.log("=========>",req.body);
  User.findOne({
    where: {
      id: req.body.id
    }
  })
  .then(record => {
      
    if (!record) {
      throw new Error('No record found')
    }
  
    console.log(`retrieved record ${JSON.stringify(record,null,2)}`) 
    
    let values = {
      registered : true,
      title: req.body.title,
      text: req.body.text
    }
    
    record.update(values).then( updatedRecord => {
      return res.status(200).send({ message: "Todo Updated Successfully" });
      //console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
      // login into your DB and confirm update
    })
  
  })
  .catch((error) => {
    // do seomthing with the error
    throw new Error(error)
  })
    
};