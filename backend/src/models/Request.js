import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Employee from "./Employee.js";

const Request = sequelize.define(
  "Request",
  {
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "requests",
  }
);

Request.belongsTo(Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

Employee.hasMany(Request, {
  foreignKey: "employee_id",
  as: "requests",
});

export default Request;
