export const createUser = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  res.status(201).send({});
};

export const getUsers = async (req, res, next) => {
  res.status(200).send({});
};

export const getUser = async (req, res, next) => {
  const userId = req.params.id;
  // if (!user) return res.status(404).send("User not found");
  res.status(200).send({});
};

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  // if (!user) return res.status(404).send("User not found");
  res.status(200).send({});
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  // if (!user) return res.status(404).send("User not found");
  res.status(204).send({});
};
