const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  try {
    const User = require('../models/userModel');

    // Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@luxe.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await User.create({
        name: 'Admin User',
        email: 'admin@luxe.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Seeded Admin user: admin@luxe.com / admin');
    }
  } catch (err) {
    console.error('Database seeding failed:', err);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDatabase();
  } catch (error) {
    console.error(`MongoDB Connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
