const mongoose = require('mongoose');

// Chicks Request Schema
const chicksRequestSchema = new mongoose.Schema({
  // Reference to the farmer/user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  
  // Farmer details
  farmerName: {
    type: String,
    required: [true, 'Farmer name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Farmer must be at least 18 years old'],
    max: [100, 'Age cannot exceed 100']
  },
  
  farmerType: {
    type: String,
    required: [true, 'Farmer type is required'],
    enum: {
      values: ['newFarmer', 'returnFarmer'],
      message: 'Farmer type must be either newFarmer or returnFarmer'
    }
  },
  
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    validate: {
      validator: function(value) {
        if (this.farmerType === 'newFarmer') {
          return value <= 100;
        } else if (this.farmerType === 'returnFarmer') {
          return value <= 500;
        }
        return true;
      },
      message: function(props) {
        const farmerType = this.farmerType;
        if (farmerType === 'newFarmer') {
          return 'New farmers can request maximum 100 chicks';
        } else if (farmerType === 'returnFarmer') {
          return 'Returning farmers can request maximum 500 chicks';
        }
        return 'Invalid quantity';
      }
    }
  },
  
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['local', 'exotic'],
      message: 'Category must be either local or exotic'
    }
  },
  
  chicksType: {
    type: String,
    required: [true, 'Chicks type is required'],
    enum: {
      values: ['broiler', 'layer'],
      message: 'Chicks type must be either broiler or layer'
    }
  },
  
  unitPrice: {
    type: Number,
    required: [true, 'Unit price is required'],
    min: [0, 'Unit price cannot be negative'],
    default: 1650
  },
  
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative'],
    default: 0
  },
  
  requestDate: {
    type: Date,
    required: [true, 'Request date is required'],
    default: Date.now
  },
  
  status: {
    type: String,
    required: true,
    enum: {
      values: ['Pending', 'Approved', 'Processing', 'Ready', 'Delivered', 'Cancelled', 'Rejected'],
      message: 'Invalid status value'
    },
    default: 'Pending'
  },
  
  salesRep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Optional additional fields
  deliveryDate: {
    type: Date,
    default: null
  },
  
  deliveryAddress: {
    type: String,
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Middleware to auto-calculate total price and set unit price before saving
chicksRequestSchema.pre('save', function(next) {
  // Set fixed unit price
  this.unitPrice = 1650;
  
  // Auto-calculate total price
  if (this.quantity) {
    this.totalPrice = this.quantity * this.unitPrice;
  }
  next();
});

// Instance methods
chicksRequestSchema.methods.calculateTotalPrice = function() {
  return this.quantity * this.unitPrice;
};

chicksRequestSchema.methods.canBeEdited = function() {
  return ['Pending', 'Processing'].includes(this.status);
};

chicksRequestSchema.methods.canBeCancelled = function() {
  return ['Pending', 'Approved'].includes(this.status);
};

// Static methods
chicksRequestSchema.statics.findByFarmer = function(farmerId) {
  return this.find({ user: farmerId }).sort({ createdAt: -1 });
};

chicksRequestSchema.statics.findPendingRequests = function() {
  return this.find({ status: 'Pending' }).sort({ createdAt: 1 });
};

// Indexes for better performance
chicksRequestSchema.index({ user: 1, status: 1 });
chicksRequestSchema.index({ requestDate: -1 });
chicksRequestSchema.index({ status: 1, createdAt: 1 });

// Create and export model
const ChicksRequest = mongoose.model('ChicksRequest', chicksRequestSchema);

module.exports = ChicksRequest;