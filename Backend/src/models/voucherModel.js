const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Voucher code is required'],
    unique: true,
    trim: true,
    maxlength: [20, 'Voucher code cannot exceed 20 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [50, 'Title cannot exceed 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  discount: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: [0, 'Discount cannot be negative']
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage',
    required: true
  },
  validFrom: {
    type: Date,
    required: [true, 'Start date is required']
  },
  validUntil: {
    type: Date,
    required: [true, 'Expiry date is required'],
    validate: {
      validator: function(value) {
        return value > this.validFrom;
      },
      message: 'Expiry date must be after start date'
    }
  },
  minSpend: {
    type: Number,
    default: 0,
    min: [0, 'Minimum spend cannot be negative']
  },
  maxDiscount: {
    type: Number,
    min: [0, 'Maximum discount cannot be negative'],
    default: null
  },
  usageLimit: {
    type: Number,
    required: [true, 'Usage limit is required'],
    min: [1, 'Usage limit must be at least 1']
  },
  usedCount: {
    type: Number,
    default: 0,
    min: [0, 'Used count cannot be negative']
  },
  category: {
    type: String,
    enum: ['general', 'first-time', 'premium', 'loyalty', 'special'],
    default: 'general'
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance

voucherSchema.index({ validUntil: 1 });
voucherSchema.index({ active: 1 });
voucherSchema.index({ category: 1 });

// Virtual properties
voucherSchema.virtual('isExpired').get(function() {
  return this.validUntil < new Date();
});

voucherSchema.virtual('isUsable').get(function() {
  return this.active && 
         !this.isExpired && 
         (this.usageLimit ? this.usedCount < this.usageLimit : true);
});

voucherSchema.virtual('usagePercentage').get(function() {
  if (!this.usageLimit) return 0;
  return Math.round((this.usedCount / this.usageLimit) * 100);
});

// Pre-save hooks
voucherSchema.pre('save', function(next) {
  // Ensure code is uppercase
  this.code = this.code.toUpperCase();
  
  // Set maxDiscount to null for fixed amount vouchers
  if (this.type === 'fixed') {
    this.maxDiscount = null;
  }
  
  next();
});

// Static methods
voucherSchema.statics.getVoucherStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalVouchers: { $sum: 1 },
        activeVouchers: { 
          $sum: { 
            $cond: [
              { $and: [
                { $eq: ['$active', true] },
                { $gt: ['$validUntil', new Date()] }
              ]}, 
              1, 
              0 
            ] 
          } 
        },
        totalUsage: { $sum: '$usedCount' },
        expiredVouchers: { 
          $sum: { 
            $cond: [
              { $lt: ['$validUntil', new Date()] }, 
              1, 
              0 
            ] 
          } 
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalVouchers: 0,
    activeVouchers: 0,
    totalUsage: 0,
    expiredVouchers: 0
  };
};

// Model methods
voucherSchema.methods.incrementUsage = async function() {
  if (this.usedCount < this.usageLimit) {
    this.usedCount += 1;
    await this.save();
    return true;
  }
  return false;
};

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
