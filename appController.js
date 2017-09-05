'use strict'
/////////////////module exports function/////////////////////////////
module.exports = function(models) {
  const index = function(req, res) {
    res.render('pages/index')
  }

  // var waiterMaps = {};
  var waiterScreen = function(req, res) {

    var waiterName = req.params.username;
    res.render('pages/waiter', {
      msg: "Welcome " + waiterName,
      waiterName
    })

  }

  var waiterdataCapture = function(req, res, next) {

    var waiterName = req.params.username;
    var daysWorking = req.body.day;

    var waiter_shifts = {
      waiter_name: waiterName,
      days: {
        dayName: daysWorking,
        working: true
      }
    };

    models.waiterDays.create(waiter_shifts, function(err, results) {
      console.log(results);

      if (err) {
        if (err.code === 11000) {
          req.flash('error', 'name exists')
        } else {
          return next(err);
        }
      }
      var waiterName = results.waiter_name;
      res.render('pages/waiter', {
        Data: "Waiter Name added",
        waiterName
      })
    })
  }

  var getWaiterData = function(req, res, next){
    models.waiterDays.find({}, function(err, results) {
      if (err) {
          return next(err);
        }else {
res.render('pages/admin', {Admin : results})
        }
    })
  }


  return {
    index,
    waiterScreen,
    waiterdataCapture,
    getWaiterData
  }



}
