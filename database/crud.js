const getOne = model => (req, res) => {
  res.send({msg: 'Ok!'});
};

const createOne = model => async (req, res) => {
  const doc = await model.create(req.body);
  if (doc) {
    res.send({ msg: 'OK' });
  } else {
    res.sendStatus(400); // bad request
  }
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

const getAll = model => (req, res) => {

};


module.exports = (model) => ({
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
  getMany: getMany(model),
  getAll: getAll(model)
});