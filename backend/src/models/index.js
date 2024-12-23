import sequelize from "../config/database.js";
import Employee from "./Employee.js";
import Request from "./Request.js";
import User from "./User.js";

User.hasOne(Employee, {
  foreignKey: "user_id",
  as: "employee",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Employee.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Employee.hasMany(Request, {
  foreignKey: "employee_id",
  as: "requests",
});
Request.belongsTo(Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

(async () => {
  let retries = 0;

  const connectToDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log("DB connected successfully");
      await sequelize.sync({ alter: false });
    } catch (error) {
      retries += 1;
      if (retries <= 20) {
        console.error(
          `Error connecting to the database. Retrying (${retries}/${10})...`
        );
        setTimeout(connectToDatabase, 4000);
      } else {
        console.error(
          "Max retries reached. Could not connect to the database:",
          error
        );
      }
    }
  };

  await connectToDatabase();
})();

export { sequelize, User, Employee, Request };
