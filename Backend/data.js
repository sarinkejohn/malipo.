import bcrypt from 'bcryptjs';

const data = {
  institutionInfo: [
    {
      name: 'Msasani sec school',
      regNo: 'S0039/p',
      image:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
  ],
  student: [
    {
      username: 'student',
      regNo: '00/2020',
      password: bcrypt.hashSync('123456'),
      avatar:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      status: 'Normal',
      isAdmin: true,
    },
    {
      username: 'student1',
      regNo: '01/2020',
      password: bcrypt.hashSync('123456'),
      avatar:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      status: 'Normal',
      isAdmin: true,
    },
  ],
  users: [
    {
      name: 'Cyper',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg', // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      // _id: '2',
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 250,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: '3',
      name: 'Nike Slim Pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      image: '/images/p3.jpg',
      price: 25,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      // _id: '4',
      name: 'Adidas Fit Pant',
      slug: 'adidas-fit-pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
  parents: [
    {
      // id: 1,
      username: 'Jon cyper1',
      avatar:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      email: 'jon1@gmail.com',
      status: 'active',
      transaction: 120,
      password: bcrypt.hashSync('123456'),
      phone: +255711223355,
    },
    {
      //id: 2,
      username: 'Jon cyper3',
      avatar:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      email: 'jon3@gmail.com',
      status: 'active',
      transaction: 120,
      password: bcrypt.hashSync('123456'),
    },
    {
      //id: 3,
      username: 'Jon cyper2',
      avatar:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      email: 'jon2@gmail.com',
      status: 'active',
      transaction: 120,
      password: bcrypt.hashSync('123456'),
    },
  ],
};
export default data;
