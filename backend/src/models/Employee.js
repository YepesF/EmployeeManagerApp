import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Employee = sequelize.define(
  "Employee",
  {
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "employees",
  }
);

Employee.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasOne(Employee, {
  foreignKey: "user_id",
  as: "employee",
});

export default Employee;
