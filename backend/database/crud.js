import { utils } from './utils';


const createOne = model => async (req, res) => {
  try {
    // create new doc
    await model.create(req.body);

    // get all docs by user order
    getAllByUserOrder(model)(req, res);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const updateOne = model => async (req, res) => {
  try {
    // update doc
    const updatedDoc = await model
      .findByIdAndUpdate(req.body._id, req.body, { new: true })
      .lean()
      .exec();

    // if null, doc doesn't exist
    if (!updatedDoc) {
      res.sendStatus(400);
      return;
    }

    // otherwise, get all docs by user order
    getAllByUserOrder(model)(req, res);

  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};


const deleteOne = model => async (req, res) => {
  try {
    // delete doc
    const removed = await model
      .findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    // if null, doc doesn't exist
    if (!removed) {
      res.sendStatus(400);
      return;
    }

    // otherwise, get all docs by user order
    getAllByUserOrder(model)(req, res);

  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};


const getAllByUserOrder = model => async (req, res) => {
  try {
    const { column, direction } = req.params;

    // get all docs
    let docs = await model.find({}).lean().exec();

    // sort all docs by column and direction
    if (column === 'title') {
      direction === 'ascending' ? docs = utils.sortAscending(docs, 'title', 'name') : docs = utils.sortDescending(docs, 'title', 'name');
    } else if (column === 'author') {
      direction === 'ascending' ? docs = utils.sortAscending(docs, 'author', 'volume', 'issue') : docs = utils.sortDescending(docs, 'author', 'volume', 'issue');
    } else if (column === 'description') {
      direction === 'ascending' ? docs = utils.sortAscending(docs, 'description') : docs = utils.sortDescending(docs, 'description');
    } else if (column === 'price') {
      direction === 'ascending' ? docs = utils.sortAscending(docs, 'price') : docs = utils.sortDescending(docs, 'price');
    }

    // send all docs
    res.send(docs);

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


export const crud = (model) => ({
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
  getAllByUserOrder: getAllByUserOrder(model)
});