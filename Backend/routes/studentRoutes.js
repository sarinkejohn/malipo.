import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';
import { isAuth, isAdmin, generateToken } from '../utils.js';

const studentRouter = express.Router();

studentRouter.get(
  '/',
  // isAuth,
  //  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const student = await Student.find({}).select('-password');
    if (student) {
      return res.send(student);
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);

studentRouter.get(
  '/:id',
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
      const { password, ...others } = student._doc;
      return res.send(others);
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);

studentRouter.get(
  '/regNo/:regNo',
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const student = await Student.findOne({ regNo: req.params.regNo });
    if (student) {
      const { password, ...others } = student._doc;
      return res.send(others);
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);

studentRouter.get(
  '/search/:key',
  expressAsyncHandler(async (req, res) => {
    const data = await Student.find({
      $or: [
        { regNo: { $regex: req.params.key || '' } },
        // { username: { $regex: req.params.key } },
      ],
    });
    if (data) {
      res.send(data);
    } else {
      return res.status(404).send({ message: 'User Not Found....' });
    }
  })
);

studentRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const student = await student.findById(req.params.id);
    if (student) {
      student.username = req.body.username || student.username;
      const updatedUser = await student.save();
      return res.send({ message: 'User Updated', student: updatedUser });
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);

studentRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const student = await student.findById(req.params.id);
    if (student) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete this User' });
        return;
      }
      await student.deleteOne();
      return res.send({ message: 'User Deleted' });
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  })
);
studentRouter.post(
  '/create',
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newStudent = new Student({
      username: req.body.username,
      address: req.body.address,
      status: req.body.status,
      regNo: req.body.regNo,
      gender: req.body.gender,
      password: bcrypt.hashSync(req.body.password),
    });
    const student = await newStudent.save();
    return res.send({ message: 'Student Created', student });
  })
);
studentRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const student = await student.findOne({ regNo: req.body.regNo });
    if (student) {
      if (bcrypt.compareSync(req.body.password, student.password)) {
        res.send({
          _id: student._id,
          name: student.username,
          regNo: student.regNo,
          isAdmin: student.isAdmin,
          token: generateToken(student),
        });
        return;
      }
    }
    return res.status(401).send({ message: 'Invalid username or password' });
  })
);

// studentRouter.post(
//   '/signup',
//   expressAsyncHandler(async (req, res) => {
//     const newStudent = new student({
//       username: req.body.username,

//       password: bcrypt.hashSync(req.body.password),
//     });
//     const student = await newStudent.save();
//     res.send({
//       _id: student._id,
//       username: student.username,
//       isAdmin: student.isAdmin,
//       token: generateToken(student),
//     });
//     return;
//   })
// );

studentRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await Student.findById(req.student._id);
    if (user) {
      user.username = req.body.name || user.name;
      // user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await student.save();
      res.send({
        _id: updatedUser._id,
        username: updatedUser.name,
        // email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
      return;
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  })
);

export default studentRouter;
