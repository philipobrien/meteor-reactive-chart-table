My_First_Collection = new Mongo.Collection('My_First_Collection');
local = new Mongo.Collection(null);

TabularTables = {};
Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

local.allow({
    insert: function(){ return true; }
});

My_First_Collection.allow({
    insert: function(){ return true; }
});


TabularTables.MyTable = new Tabular.Table({
    name: "MyTable",
    collection: local,
    columns: [
        {
            data: "value", title: "Value"
        },
        {
          data: "date", title: "Date"
        }
    ]
});