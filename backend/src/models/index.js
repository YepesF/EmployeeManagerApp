import sequelize from "../config/database.js";
import Employee from "./Employee.js";
import Request from "./Request.js";
import User from "./User.js";

User.hasOne(Employee, { foreignKey: "user_id", as: "employee" });
Employee.belongsTo(User, { foreignKey: "user_id", as: "user" });

Employee.hasMany(Request, { foreignKey: "employee_id", as: "requests" });
Request.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB sync");

    await sequelize.sync({ alter: false });
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  }
})();

export { sequelize, User, Employee, Request };
