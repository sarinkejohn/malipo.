import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import Parent from '../models/parentModel.js';
import { isAuth, isAdmin, generateToken } from '../utils.js';
import Student from '../models/studentModel.js';

const parentRouter = express.Router();

parentRouter.get(
  '/',
  // isAuth,
  //  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const parent = await Parent.find({}).select('-password');
    if (parent) {
      return res.send(parent);
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);
parentRouter.get(
  '/withstudent',
  // isAuth,
  //  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const parent = await Parent.findOne({ email: req.body.email })
      .populate('student')
      .exec((err) => {
        // console.log('parent ' + student);
      });
    if (parent) {
      return res.send(parent);
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);
parentRouter.get(
  '/:id',
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const parent = await Parent.findById(req.params.id);
    if (parent) {
      const { password, ...others } = parent._doc;
      return res.send(others);
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);

parentRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const parent = await Parent.findById(req.params.id);
    if (parent) {
      parent.username = req.body.username || parent.username;
      parent.email = req.body.email || parent.email;
      const updatedUser = await parent.save();
      return res.send({ message: 'User Updated', parent: updatedUser });
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);

parentRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const parent = await Parent.findById(req.params.id);
    if (parent) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete this User' });
        return;
      }
      await parent.deleteOne();
      return res.send({ message: 'User Deleted' });
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);
parentRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const parent = await Parent.findOne({ email: req.body.email });
    if (parent) {
      if (bcrypt.compareSync(req.body.password, parent.password)) {
        res.send({
          _id: parent._id,
          name: parent.username,
          email: parent.email,
          isAdmin: parent.isAdmin,
          token: generateToken(parent),
        });
        return;
      }
    }
    return res.status(401).send({ message: 'Invalid email or password' });
  })
);

parentRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newParent = new Parent({
      username: req.body.username,
      email: req.body.email,
      // student: req.body.student.map((x) => ({ ...x, student: x._id })),
      password: bcrypt.hashSync(req.body.password),
    });
    const parent = await newParent.save();
    res.send({
      _id: parent._id,
      username: parent.username,
      email: parent.email,
      isAdmin: parent.isAdmin,
      token: generateToken(parent),
    });
    return;
  })
);
parentRouter.post(
  '/create',
  expressAsyncHandler(async (req, res) => {
    const newParent = new Parent({
      username: req.body.username,
      email: req.body.email,
      student: req.body._id,
      phone: req.body.phone,
      location: req.body.location,
      regNo: req.body.regNo,
      status: req.body.status,
      gender: req.body.gender,
      password: bcrypt.hashSync(req.body.password),
    });
    const parent = await newParent.save();
    res.send({
      _id: parent._id,
      username: parent.username,
      email: parent.email,
      isAdmin: parent.isAdmin,
    });
    return;
  })
);

parentRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await Parent.findById(req.parent._id);
    if (user) {
      user.username = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await parent.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
      return;
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  })
);

export default parentRouter;
