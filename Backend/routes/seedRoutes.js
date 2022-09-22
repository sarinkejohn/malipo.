import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
import Parent from '../models/parentModel.js';
import Student from '../models/studentModel.js';
import Institution from '../models/institutionModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  await Parent.remove({});
  const createdParents = await Parent.insertMany(data.parents);
  await Student.remove({});
  const createdStudents = await Student.insertMany(data.student);
  await Institution.remove({});
  const createdInstitution = await Institution.insertMany(data.institutionInfo);
  res.send({
    createdProducts,
    createdUsers,
    createdParents,
    createdStudents,
    createdInstitution,
  });
});
export default seedRouter;
