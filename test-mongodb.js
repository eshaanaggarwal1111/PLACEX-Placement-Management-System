const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');

mongoose.connect('mongodb://127.0.0.1:27017/PlaceX')
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('📊 Database: PlaceX');
    console.log('🔗 Host: localhost:27017');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ MongoDB connection failed:', err.message);
    console.log('');
    console.log('🔧 Solutions:');
    console.log('1. Install MongoDB Community Server');
    console.log('2. Start MongoDB service: net start MongoDB');
    console.log('3. Check if MongoDB is running on port 27017');
    console.log('');
    console.log('📖 See MONGODB-SETUP.md for detailed instructions');
    process.exit(1);
  });
