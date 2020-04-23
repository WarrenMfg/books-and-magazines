const getOne = model => (req, res) => {
  res.send({msg: 'Ok!'});
};

const createOne = model => (req, res) => {
  res.send({msg: 'Ok!'});
};

const updateOne = model => (req, res) => {
  res.send({msg: 'Ok!'});
};

const deleteOne = model => (req, res) => {
  res.send({msg: 'Ok!'});
};

const getMany = model => (req, res) => {
  res.send({msg: 'Ok!'});
};


module.exports = (model) => ({
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
  getMany: getMany(model),
});