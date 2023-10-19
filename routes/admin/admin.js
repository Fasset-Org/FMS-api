const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addDepartment,
  editDepartment,
  getAllDepartments,
  addModule,
  editModule,
  getAllModules,
  getAllUsers,
  editUser,
  deleteUser
} = require("../../controllers/admin/adminController");

const adminRouter = Router();

// Department routes
adminRouter.post("/department", AuthMid, addDepartment);
adminRouter.post("/department/:departmentId", AuthMid, editDepartment);
adminRouter.get("/departments", AuthMid, getAllDepartments);

// Module routes
adminRouter.post("/module", AuthMid, addModule);
adminRouter.post("/module/:moduleId", AuthMid, editModule);
adminRouter.get("/modules", AuthMid, getAllModules);

// Users routes
adminRouter.get("/users", AuthMid, getAllUsers);
adminRouter.put('/user/:userId', AuthMid, editUser);
adminRouter.delete('/user/:userId', AuthMid, deleteUser);

module.exports = adminRouter;
