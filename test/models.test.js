const assert = require('assert');
const Models = require('../models');
describe('models should be able to:', function() {

  var models = Models("mongodb://localhost/waiter_data");

  beforeEach(function(done) {
    models.waiterDays.remove({}, function(err) {
      done(err);
    })
  })


  it('store waiter_data in mongoDB', function() {
    var waiter_data = {
      waiter_name: 'new waiter'
    };

    models.waiterDays
      .create(waiter_data, function(err) {
        models.waiterDays.find({
          waiter_name: 'new waiter'
        }, function(err, waiter_datas) {
          assert.equal(1, waiter_datas.length);
          done(err)
        })
      });
  })
})
