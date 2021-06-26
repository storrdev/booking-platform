const path = require("path");
const router = require("express").Router();

const createCrudRoutes = require("crudify");

const { Appointment, Resource, User } = require(path.resolve("models"));

router.use("/appointments", createCrudRoutes(Appointment));
router.use("/resources", createCrudRoutes(Resource));
router.use("/users", createCrudRoutes(User));

module.exports = router;
