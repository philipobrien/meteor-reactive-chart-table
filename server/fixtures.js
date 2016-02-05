var tempDoc= {};
var tempArray = [];


Meteor.startup(function() {
  My_First_Collection.remove({});
  

  for (var j = 1; j < 11; j++) {
    tempDoc.date = [];
    tempDoc.value = [];
    var start = new Date(2013, 0, 1);
    var end = new Date(2013, 11, 31);
    var day = moment(start);
    var dates = [];

    while (day <= end) {
      if (day.toDate().getMonth() === 1 && day.toDate().getDate() === 29) {
        //
      } else {
        dates.push(day.toDate());
      }
      day = day.clone().add(1, 'd');
    }
    tempDoc.dateQuarter = [];
    tempDoc.dateQuarter.push(new Date(2013, 0, 1));
    tempDoc.dateQuarter.push(new Date(2013, 3, 1));
    tempDoc.dateQuarter.push(new Date(2013, 6, 1));
    tempDoc.dateQuarter.push(new Date(2013, 9, 1));
    for (var i = 0; i < 364; i++) {
    
      tempDoc.date.push(dates[i]);
      tempDoc.value.push(Math.random() * (100 - 0) + 0);
    }
    tempDoc.datasetID = j;
    My_First_Collection.insert(tempDoc);
  }
  
})