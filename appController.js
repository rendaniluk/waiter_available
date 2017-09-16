'use strict'
/////////////////module exports function/////////////////////////////
module.exports = function(models) {
    //////////////////////rendering landing pages///////////////////////
    const index = function(req, res) {
        res.render('pages/index')
      }
      ////////////////////////////////oOo//////////////////////////////////

    //////////////////reset database for new week schedule//////////////
    const reset = function(req, res, next) {
        models.waiterDays.remove({}, function(err, waiter_shifts) {
          if (err) {
            return next(err)
          } else {
            res.redirect('/days')
          }
        });
      }
      /////////////////////////////////oOo///////////////////////////////

    ///////////////////////rendering waiter screen////////////////////
    var waiterScreen = function(req, res, next) {
        var waiterName = req.params.username;
        models.waiterDays.findOne({
          waiter_name: waiterName
        }, {
          "days.dayName": 1,
          _id: 0
        }, function(err, daysWorking) {
          if (daysWorking) {
            var selectedDays = daysWorking.days;
            var dayList = [];
            for (var i = 0; i < selectedDays.length; i++) {
              var dy = selectedDays[i].dayName;
              if (dy) {
                dayList.push(dy)
              }
            }
            if (dayList.length !== 0) {
              res.render('pages/waiter', {
                msg: "Welcome back " + waiterName +
                  " you previously selected this days: ",
                update: "You can change your previous selection by selecting new days to work on below",
                previousDays: dayList,
                waiterName
              })
            }
          } else {
            res.render("pages/waiter", {
              msg: "Welcome " + waiterName,
              select: "Select three days to work on below:",
              waiterName
            })

          }
        })
      }
      /////////////////////////////////oOo//////////////////////////////////

    ////////////////////Saving and updating data to database/////////////
    var waiterdataCapture = function(req, res, next) {
        var user = req.params.username;
        var waiterName = user.substring(0, 1).toUpperCase() + "" + user.substring(
          1).toLowerCase()
        var daysWorking = req.body.day;

        if (!daysWorking) {
          req.flash('error', 'Please select days you wanna work on');
          res.redirect("/waiters/" + waiterName)
        } else {
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
            if (err) {
              if (err.code === 11000) {
                var waiterName = req.params.username;
                models.waiterDays.findOne({
                  waiter_name: waiter_shifts.waiter_name
                }, function(err, updateWaiter) {
                  if (err) {
                    return next(err)
                  } else {
                    waiterShifUpdate.days = waiter_shifts.days
                    waiterShifUpdate.save()
                    req.flash('error',
                      "You have successfully updated your days")
                    res.redirect("/waiters/" + waiterShifUpdate.waiter_name);
                  }
                })

              }
            } else {
              var waiterName = results.waiter_name;
              res.render('pages/waiter', {
                msg: "Days added successfully",
                WaiteData: daysWorking,
                Data: waiterName + " you are woking on :",
                waiterName
              })

            }
          })
        }
      }
      ///////////////////////////////////oOo/////////////////////////////////

    //////////////////////geting data and display to admin view///////////
    var getWaiterData = function(req, res, next) {
        models.waiterDays.find({}, function(err, results) {
          if (err) {
            return next(err);
          } else {

            var monday = [];
            var tuesday = [];
            var wednesday = [];
            var thursday = [];
            var friday = [];
            var saturday = [];
            var sunday = [];

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
            //coloring table head function
            var colorThead = function(waiterNumber) {
              if (waiterNumber > 3) {
                return "danger"
              } else if (waiterNumber < 3) {
                return "warning"
              } else {
                return "success"
              }
            }

            res.render('pages/admin', {
              Monday: monday,
              m: monday.length,
              mThead: colorThead(monday.length),
              Tuesday: tuesday,
              t: tuesday.length,
              tThead: colorThead(tuesday.length),
              Wednesday: wednesday,
              w: wednesday.length,
              wThead: colorThead(wednesday.length),
              Thursday: thursday,
              th: thursday.length,
              thThead: colorThead(thursday.length),
              Friday: friday,
              f: friday.length,
              fThead: colorThead(friday.length),
              Saturday: saturday,
              s: saturday.length,
              sThead: colorThead(saturday.length),
              Sunday: sunday,
              su: sunday.length,
              suThead: colorThead(sunday.length)
            })
          }
        })
      }
      /////////////////////////////////oOo////////////////////////////////

    //////////returning all functions for module exports////////////////
    return {
      index,
      waiterScreen,
      waiterdataCapture,
      getWaiterData,
      reset
    }
    ///////////////////////////////oOo/////////////////////////////////
  }
  //////////////////////////////oOo/////////////////////////////////
