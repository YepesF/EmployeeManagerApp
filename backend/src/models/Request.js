import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Employee from "./Employee";

const Request = sequelize.define("Request", {
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
});

Request.belongsTo(Employee, { foreignKey: "employee_id", targetKey: "id" });

export default Request;
