Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});


Router.route('/', {
    template: 'dashboard',
    waitOn: function() {
        return [
            Meteor.subscribe('My_First_Collection')
        ];
    }
});