'use strict'
/////////////////module exports function/////////////////////////////
module.exports = function(models) {
  const index = function(req, res) {
    res.render('pages/index')
  }

  const reset = function(req, res, next) {
      models.waiterDays.remove({}, function(err, waiter_shifts) {
        if (err) {
          return next(err)
        } else {
          res.redirect('/days')
        }
      });
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
          var waiterName = req.params.username;
          req.flash('error', 'name exists')
          res.redirect('/waiters/' + waiterName);
        } else {
          return next(err);
        }
      } else {
        var waiterName = results.waiter_name;
        res.render('pages/waiter', {
          WaiteData : daysWorking,
          Data: waiterName+" you are woking on :",
          waiterName
        })

      }
    })
  }



  var getWaiterData = function(req, res, next) {
    models.waiterDays.find({}, function(err, results) {
      if (err) {
        return next(err);
      } else {
        //     // console.log(results);
        // function waitersForDay(cb){
        //   return models.waiterDays.find({ "days.dayName" : day, "days.working" : true }, {waiter_name : 1, _id : 0}).exec(function(err, waiters_aV) {
        //     if (err) {
        //       return next(err);
        //     }
        //     cb(null, waiters_aV);
        //   });
        // }
        // function waitersForDay(day) {
        //   return models.waiterDays.find({
        //     "days.dayName": day,
        //     "days.working": true
        //   }, {
        //     waiter_name: 1,
        //     _id: 0
        //   }, function(err, results) {
        //     if (err) {
        //       return next()
        //     }
        //     console.log(results);
        //   })
        // }

        // var days = ["Monday", "Tuesday"];
        //
        // var dayPromises = days.map(function(day){
        //   return waitersForDay(day);
        // })
        // var monday = waitersForDay("Monday");
        // var tuesday = waitersForDay("Tuesday");
        // var wednesday = waitersForDay("Wednesday");
        // var thursday = waitersForDay("Thursday");
        // var friday = waitersForDay("Friday");
        // var saturday = waitersForDay("Saturday");
        // var sunday = waitersForDay("Sunday");
        //
        // console.log(monday);
        // waitersForDay(function(err, results) {
        //   if (err) {
        //     return next(err)
        //   } else {
        //     res.render('pages/admin', {
        //       Admin: results
        //         // Monday : monday,
        //         // Tuesday : tuesday,
        //         // Wednesday : wednesday,
        //         // Thursday : thursday,
        //         // Friday : friday,
        //         // Saturday : saturday,
        //         // Sunday : sunday
        //     })
        //
        //   }
        // })

        var monday = [];
        var tuesday = [];
        var wednesday = [];
        var thursday = [];
        var friday = [];
        var saturday = [];
        var sunday = [];
        //
        //
        // Promise.all(monday,tuesday, function(err, results){
        //   //results[]
        //   console.log(results);
        // });



        // var weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        for (var i = 0; i < results.length; i++) {
          var waiterData = results[i].days;
          for (var x = 0; x < waiterData.length; x++) {
            var modifyData = waiterData[x].dayName
            if (modifyData == 'Monday') {
              monday.push(results[i].waiter_name);
            } else if (modifyData == 'Tuesday') {
              tuesday.push(results[i].waiter_name);
            } else if (modifyData == 'Wednesday') {
              wednesday.push(results[i].waiter_name);
            } else if (modifyData == 'Thursday') {
              thursday.push(results[i].waiter_name);
            } else if (modifyData == 'Friday') {
              friday.push(results[i].waiter_name);
            } else if (modifyData == 'Saturday') {
              saturday.push(results[i].waiter_name);
            } else if (modifyData == 'Sunday') {
              sunday.push(results[i].waiter_name);
            }
          }
        }
        // console.log(monday,tuesday,wednesday,thursday,friday,saturday,sunday);
        res.render('pages/admin', {
          Monday: monday,
          Tuesday: tuesday,
          Wednesday: wednesday,
          Thursday: thursday,
          Friday: friday,
          Saturday: saturday,
          Sunday: sunday
        })
      }
    })
  }


  return {
    index,
    waiterScreen,
    waiterdataCapture,
    getWaiterData,
    reset
  }



}
