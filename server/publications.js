Meteor.publish('My_First_Collection', function() {
    return My_First_Collection.find({});
});