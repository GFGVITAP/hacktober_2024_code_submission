const mongoose = require('mongoose')


exports.connect =  async (uri) => {
    try {
      await mongoose.connect(uri, {

      });
      console.log('MongoDB connected...');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }

