const getOne = model => (req, res) => {
  res.send({msg: 'Ok!'});
};

const createOne = model => async (req, res) => {
  try {
    await model.create(req.body);
    getAll(model)(req, res);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
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

const getAll = model => async (req, res) => {
  try {
    const docs = await model.find({}).sort({ price: -1 }).lean().exec();
    res.send(docs);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


module.exports = (model) => ({
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
  getMany: getMany(model),
  getAll: getAll(model)
});