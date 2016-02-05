Template.dashboardTable.helpers({
    settings: function () {
        return {
            collection: local,
            rowsPerPage: 5,
            showFilter: true,
            fields: [
                {
                    fieldId: 'date',
                    key: 'date',
                    label: 'Date',
                    sortByValue: true,
                    sortOrder: 0,
                    sortDirection: 'ascending',
                    fn: function(value) {
                        return moment(value).format('ddd MMM DD YYYY')
                    }
                },
                {
                    fieldId: 'value',
                    key: 'value',
                    label: 'Value',
                    fn: function(value) {
                        return Math.round(value)
                    }
                }],
            useFontAwesome: false
        };
    }
});

Template.dashboardTable.onCreated( function() {
    this.subscribe('local');
});

Template.dashboardTable.rendered = function () {
    this.subscribe('local');
};