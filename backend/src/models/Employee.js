import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Employee = sequelize.define("Employee", {
  hire_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  salary: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
});

export default Employee;
