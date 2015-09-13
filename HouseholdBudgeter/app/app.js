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
              abstract: true,
              templateUrl: "/app/templates/dashboard.html",
              controller: "dashboardCtrl as dashboard"
          })
          .state('dashboard.details', {
              url: "",
              tempalteUrl: "/app/templates/dashboardDetails.html",
              controller: "dashboardDetailsCtrl as dashboardDetails"
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
              controller: "accountsListCtrl as accountsList",
              resolve: {
                  accounts: ['accountSvc', function (accountSvc) {
                      return accountSvc.getAccounts();
                  }]
              }
          })
          .state('accounts.list.create', {
              url: "",
              templateUrl: "/app/templates/createAccount.html",
              controller: "createAccountCtrl as createAccount"
          })
          .state('accounts.list.details', {
              url: "",
              templateUrl: "/app/templates/accountDetails.html",
              controller: "accountDetailsCtrl as accountDetails",
              /*resolve: {
                  transactions: ['transactionSvc', function (transactionSvc) {
                      return transactionSvc.getTransactions(id);
                  }]
              }*/
          })
            .state('accounts.list.edit', {
                url: "",
                templateUrl: "/app/templates/editACcount.html",
                controller: "accountEditCtrl as accountEdit"
            })
          .state('budget', {
              url: "/budget",
              abstract: true,
              templateUrl: "/app/templates/budget.html",
              controller: "budgetCtrl as budget"
          })
          .state('budget.list', {
              url: "",
              templateUrl: "/app/templates/budgetList.html",
              controller: "budgetListCtrl as budgetList",
              resolve: {
                  budgetItems: ['budgetItemSvc', function (budgetItemSvc) {
                      return budgetItemSvc.getBudgetItems();
                  }]
              }
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