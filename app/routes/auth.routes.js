const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const profileController = require("../controllers/profile.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/add",
    [
      verifySignUp.checkDuplicateTitle
      //verifySignUp.checkRolesExisted
    ],
    controller.todo
  );

  app.get(
    "/api/todo-list",
    controller.todoList
  );

  app.post(
    "/api/delete-todo",
    controller.deleteTodo
  );

  app.post(
    "/api/edit-todo",
    controller.editTodo
  );

  app.post(
    "/api/update-todo",
    controller.updateTodo
  );
};