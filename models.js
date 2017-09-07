const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoUrl);

  const waiterSchema = mongoose.Schema({
    waiter_name: String,
    days: [{
        dayName: String,
        working: Boolean
      }]
  });

  waiterSchema.index({
    waiter_name: 1
  }, {
    unique: true
  });

  const waiterDays = mongoose.model('waiter_shifts', waiterSchema);

  return {
    waiterDays
  };

};
