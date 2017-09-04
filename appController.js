'use strict'
/////////////////module exports function/////////////////////////////
module.exports = function() {
  const index = function(req, res) {
    res.render('pages/index')
  }

  var waiterMaps = {};
  const waiterScreen = function(req, res) {
    var waiterName = req.params.username;
    var daysWorking = req.body.day;

    if (waiterMaps[waiterName] === undefined) {
      waiterMaps[waiterName] = daysWorking;
    }
    console.log(waiterMaps);
    res.render('pages/waiter',{waiterName})
  }
  // 
  // const waiterDays = function(req, res) {
  // }

  return {
    index,
    waiterScreen
    // waiterDays
  }



}
