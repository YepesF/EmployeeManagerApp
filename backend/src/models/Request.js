import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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
    freezeTableName: true,
    tableName: "requests",
  }
);

export default Request;
