export const createEmployee = async (req, res, next) => {
  const { hire_date, name, salary } = req.body;
  res.status(201).send({});
};

export const getEmployees = async (req, res, next) => {
  res.status(200).send({});
};

export const getEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  // if (!employee) return res.status(404).send("Employee not found");
  res.status(200).send({});
};

export const updateEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  // if (!employee) return res.status(404).send("Employee not found");
  res.status(200).send({});
};

export const deleteEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  // if (!employee) return res.status(404).send("Employee not found");
  res.status(204).send({});
};
