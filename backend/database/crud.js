import { utils } from './utils';


// const getOne = model => (req, res) => {
//   res.send({msg: 'Ok!'});
// };


const createOne = model => async (req, res) => {
  try {
    await model.create(req.body);

    getAllByUserOrder(model)(req, res);
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

    getAllByUserOrder(model)(req, res);

  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};


const deleteOne = model => async (req, res) => {
  try {
    const removed = await model
      .findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    if (!removed) {
      res.sendStatus(400);
      return;
    }

    getAllByUserOrder(model)(req, res);

  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};


// const getMany = model => (req, res) => {
//   res.send({msg: 'Ok!'});
// };


// const getAll = model => async (req, res) => {
//   try {
//     const docs = await model.find({}).sort({ price: -1 }).lean().exec();
//     res.send(docs);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(400);
//   }
// };

const getAllByUserOrder = model => async (req, res) => {
  try {
    const { column, direction } = req.params;
    let docs = await model.find({}).lean().exec();

    if (column === 'title') {
      direction === 'ascending' ? docs = utils.sortAscending(docs, 'title', 'name') : docs = utils.sortDescending(docs, 'title', 'name');
    } else if (column === 'author') {
      direction === 'ascending' ? docs = utils.sortAscending(docs, 'author', 'volume', 'issue') : docs = utils.sortDescending(docs, 'author', 'volume', 'issue');
    } else if (column === 'description') {
      direction === 'ascending' ? docs = utils.sortAscending(docs, 'description') : docs = utils.sortDescending(docs, 'description');
    } else if (column === 'price') {
      direction === 'ascending' ? docs = utils.sortAscending(docs, 'price') : docs = utils.sortDescending(docs, 'price');
    }

    res.send(docs);

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


export const crud = (model) => ({
  // getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
  // getMany: getMany(model),
  // getAll: getAll(model),
  getAllByUserOrder: getAllByUserOrder(model)
});