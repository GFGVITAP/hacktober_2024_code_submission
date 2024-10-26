  const mongoose = require("mongoose")
  const { Schema } = mongoose;

  const userSchema = new mongoose.Schema({
      username: {
          type: String,
          required: true,
      },
      userId: {
          type: String,
      },
      aadharno: {
          type: String,
          required: true
      },
      mobileno: {
          type: String,
      },
      password: {
          type: String,
      },

      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
  });

  const propertySchema = new mongoose.Schema({
      propertyId :{type : String},
      ownerId: { type: String },
      address: { type: String,},
      zone: { type: String,},
      ward: { type: String,},
      propertyType: { type: String},
      area: { type: Number },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    const taxSchema = new Schema({
      propertyId: { type: String ,required: true },
      taxId :{type : String},
      taxType: { type: String, required: true, enum: ['Property Tax', 'Water Tax', 'Garbage Collection Tax'] },
      taxAmount: { type: Number, required: true },
      dueDate: { type: Date, required: true },
      status: { type: String, required: true, enum: ['Pending', 'Paid'] },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
    
    const paymentSchema = new Schema({
      userId: { type: String, required: true },
      propertyId: { type: String, required: true },
      taxId: { type: String, required: true },
      paymentDate: { type: Date, required: true },
      amountPaid: { type: Number, required: true },
      paymentStatus: { type: String, required: true, enum: ['Success', 'Failure'] },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
    
    const notificationSchema = new Schema({
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      message: { type: String, required: true },
      dateSent: { type: Date, required: true },
      readStatus: { type: String, required: true, enum: ['Read', 'Unread'] },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
    
    const User = mongoose.model('User', userSchema);
    const Property = mongoose.model('Property', propertySchema);
    const Tax = mongoose.model('Tax', taxSchema);
    const Payment = mongoose.model('Payment', paymentSchema);
    const Notification = mongoose.model('Notification', notificationSchema);

    module.exports = {
      User,
      Property,
      Tax,
      Payment,
      Notification
    };