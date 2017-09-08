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

    let days = daysWorking.map(function(day) {
      return {
        dayName: day,
        working: true
      }
    });


    var waiter_shifts = {
      waiter_name: waiterName,
      days: days
    };

    models.waiterDays.create(waiter_shifts, function(err, results) {

      // console.log(arguments);
      //
      // console.log(results);

      if (err) {
        if (err.code === 11000) {
          req.flash('error', 'name exists')
          return res.redirect("/");
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

  var getWaiterData = function(req, res, next) {
    models.waiterDays.find({}, function(err, results) {
      if (err) {
        return next(err);
      } else {
        // console.log(results);
        var monday = [];
        var tuesday = [];
        var wednesday = [];
        var thursday = [];
        var friday = [];
        var saturday = [];
        var sunday = [];

// var weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        for (var i = 0; i < results.length; i++) {
          var waiterData = results[i].days;
          for (var x = 0; x < waiterData.length; x++) {
            var modifyData = waiterData[x].dayName
            if (modifyData == 'Monday') {
              monday.push(results[i].waiter_name);
            }else if (modifyData == 'Tuesday') {
              tuesday.push(results[i].waiter_name);
            }else if (modifyData == 'Wednesday') {
              wednesday.push(results[i].waiter_name);
            }else if (modifyData == 'Thursday') {
              thursday.push(results[i].waiter_name);
            }else if (modifyData == 'Friday') {
              friday.push(results[i].waiter_name);
            }else if (modifyData == 'Saturday') {
              saturday.push(results[i].waiter_name);
            }else if (modifyData == 'Sunday') {
              sunday.push(results[i].waiter_name);
            }
          }
        }
        // console.log(monday,tuesday,wednesday,thursday,friday,saturday,sunday);
        res.render('pages/admin', {
          Monday : monday,
          Tuesday : tuesday,
          Wednesday : wednesday,
          Thursday : thursday,
          Friday : friday,
          Saturday : saturday,
          Sunday : sunday
        })
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
