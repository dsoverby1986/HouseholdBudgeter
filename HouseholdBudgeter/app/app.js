(function () {
    var app = angular.module('HouseholdBudgeter', ['ui.router', 'ui.bootstrap', 'LocalStorageModule']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        //where to go if path is nonsense
        $urlRouterProvider.otherwise("/login");
        //
        // Now set up the states
        //for one page to be distinguished from another page an entry must go here for that page
        console.log("approaching stateprovider");
        $stateProvider
          .state('login', {
              url: "/login",
              templateUrl: "/app/templates/login.html",
              controller: "loginCtrl as login"
          })

          .state('home', {
              url: "/home",
              templateUrl: "/app/templates/home.html",
              controller: "homeCtrl as home"
          })
          .state('household', {
              url: "/household",
              abstract: true,
              templateUrl: "/app/templates/household.html",
              controller: "householdCtrl as house"
          })
          .state('household.details', {
              url: "",
              templateUrl: "/app/templates/householddetails.html",
              controller: "householdDetailsCtrl as houseDetails",
              resolve: {
                  household: ['householdSvc', function(householdSvc){
                      return householdSvc.getHousehold();
                  }]
              }
          })
          .state('household.join', {
              url: "/join",
              templateUrl: "/app/templates/joinHousehold.html",
              controller: "householdJoinCtrl as houseJoin"
          })
          .state('dashboard', {
              url: "/dashboard",
              templateUrl: "/app/templates/dashboard.html",
              controller: "dashboardCtrl as dashboard"
          })
          .state('accounts', {
              url: "/accounts",
              abstract: true,
              templateUrl: "/app/templates/accounts.html",
              controller: "accountCtrl as accounts"
          })
          .state('accounts.list', {
              url: "",
              templateUrl: "/app/templates/accountsList.html",
              controlller: "accountsListCtrl as accountsList",
              resolve: {
                  accounts: ['accountSvc', function (accountSvc) {
                      return accountSvc.getAccounts();
                  }]
              }
          })
          .state('budget', {
              url: "/budget",
              templateUrl: "/app/template/budget.html",
              controller: "budgetCtrl as budget"
          });
    });

    var serviceBase = 'http://localhost:58596/';

    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorSvc');
    });

    app.run(['authSvc', function (authService) {
        authService.fillAuthData();
    }]);

})();