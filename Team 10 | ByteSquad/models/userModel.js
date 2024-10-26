const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required:true
  },
  isVerified:{
    type:Boolean,
    required:true
  },
  resetToken :{
    type:String,
    default:"",
  },
});


module.exports = mongoose.model('user', userSchema);
