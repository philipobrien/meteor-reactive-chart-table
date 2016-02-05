datasetID = new ReactiveVar(1);

var datasetIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


Template.dashboardChart.helpers({
    datasetIDs : function() {
        return datasetIDs;
    },
    datasetID: function () {
        return datasetID.get();
    }
});


Template.dashboardChart.rendered = function () {
    $('.dropdown-button').dropdown({
    });

    var data = My_First_Collection.find({datasetID: datasetID.get()}).fetch();
    plotData(data);
    createLocalCollection(data);
};

Template.dashboardChart.events({
    'click #dataset-list': function (event) {
        event.preventDefault();
        datasetID.set(parseInt(event.target.id));
        var data = My_First_Collection.find({datasetID: parseInt(event.target.id)}).fetch();
        updatePlot(data);
        createLocalCollection(data);

    }
});


var plotData = function(values) {
    var data = ['data'];
    var time = ['x'];

    chart = c3.generate({
        bindto: '#dataset-chart',
        data: {
            x: 'x',
            columns: [
                data.concat(values[0].value),
                time.concat(values[0].date),
            ],
            type: 'spline'
        },
        point: {
            show: false
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    values: values[0].dateQuarter,
                    format: "%e %b %y"
                }
            },
            y: {
                label: {
                    text: 'Value',
                    position: 'outer-middle'
                },
                tick: {
                    format: d3.format("0,000")
                }
            }
        },
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                var $$ = this, config = $$.config, CLASS = $$.CLASS,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor;
                var error;
                for (i = 0; i < d.length; i++) {
                    if (!(d[i] && (d[i].value || d[i].value === 0))) { continue; }
                    if (!text) {
                        title = d[i].x.toDateString();
                        text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='3'>" + title + "</th></tr>" : "");
                    }
                    name = nameFormat(d[i].name);
                    value = valueFormat(Math.round(d[i].value), d[i].ratio, d[i].id, d[i].index);
                    bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);
                    text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
                    text += "<td class='name'><span style='background-color:" + bgcolor + "; border-radius: 5px;'></span>" + name + "</td>";
                    text += "<td class='value'>" + value + "</td>";


                }

                return text;
            }
        }
    });

};


var updatePlot = function(values) {

    var data = ['data'];

    var time = ['x'];
    chart.load({
        columns: [
            data.concat(values[0].value),
            time.concat(values[0].date),
        ]
    });
};

var createLocalCollection = function(values) {
    var tempDoc = {};
    local.remove({});
    for (var i in values[0].value) {
        tempDoc = {};
        tempDoc.value = values[0].value[i];
        tempDoc.date = values[0].date[i];
        local.insert(tempDoc);
    }
};