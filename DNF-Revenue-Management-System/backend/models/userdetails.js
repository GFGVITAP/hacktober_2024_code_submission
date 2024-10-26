  // property-tax.schema.js
  const mongoose = require('mongoose');

  const UserDetailsSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    
    },
    propertyTax: {
      type: Number,
      default: 0
    },
    waterTax: {
      type: Number,
      default: 0
    },
    garbageTax: {
      type: Number,
      default: 0
    },
    others: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    rewards: {
      type: Number,
      default: 0
    },
    dueTaxes: {
      type: Number,
      default: 0
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending'
    },
    paymentHistory: [
      {
        paymentDate: {
          type: Date,
          required: true
        },
        paymentAmount: {
          type: Number,
          required: true
        },
        paymentMethod: {
          type: String,
          required: true
        }
      }
    ]
  }, {
    timestamps: true
  });

  const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

  module.exports = {UserDetails};