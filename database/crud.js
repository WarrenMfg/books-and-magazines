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

const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findByIdAndUpdate(req.body._id, req.body, { new: true })
      .lean()
      .exec();

    if (!updatedDoc) {
      res.sendStatus(400);
      return;
    }

    getAll(model)(req, res);

  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
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