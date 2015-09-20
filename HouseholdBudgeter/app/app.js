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
              templateUrl: "/app/templates/user/login.html",
              controller: "login_Ctrl as login"
          })

          .state('home', {
              url: "/home",
              templateUrl: "/app/templates/home.html",
              controller: "home_Ctrl as home"
          })
          .state('household', {
              url: "/household",
              abstract: true,
              templateUrl: "/app/templates/household/household.html",
              controller: "household_Ctrl as house"
          })
          .state('household.details', {
              url: "",
              templateUrl: "/app/templates/household/householddetails.html",
              controller: "household_details_Ctrl as houseDetails",
              resolve: {
                  household: ['householdSvc', function(householdSvc){
                      return householdSvc.getHousehold();
                  }]
              }
          })
          .state('household.join', {
              url: "/join",
              templateUrl: "/app/templates/household/joinHousehold.html",
              controller: "household_join_Ctrl as houseJoin"
          })
          .state('dashboard', {
              url: "/dashboard",
              abstract: true,
              templateUrl: "/app/templates/dashboard/dashboard.html",
              controller: "dashboard_Ctrl as dashboard"
          })
          .state('dashboard.details', {
              url: "",
              templateUrl: "/app/templates/dashboard/dashboardDetails.html",
              controller: "dashboard_details_Ctrl as dashboardDetails"
          })
          .state('accounts', {
              url: "/accounts",
              abstract: true,
              templateUrl: "/app/templates/accounts/accounts.html",
              controller: "accounts_Ctrl as accounts"
          })
          .state('accounts.list', {
              url: "",
              templateUrl: "/app/templates/accounts/accountsList.html",
              controller: "accounts_list_Ctrl as accountsList",
              resolve: {
                  accounts: ['accountSvc', function (accountSvc) {
                      console.log("in the accounts.list state")
                      return accountSvc.getAccounts();
                  }],
                  categories: ['categorySvc', function (categorySvc) {
                      return categorySvc.getCategories();
                  }]
              }
          })
          .state('accounts.list.create', {
              url: "/create",
              templateUrl: "/app/templates/accounts/createAccount.html",
              controller: "accounts_list_create_Ctrl as createAccount"
          })
          .state('accounts.list.details', {
              url: "/:id/details",
              templateUrl: "/app/templates/accounts/accountDetails.html",
              controller: "account_list_details_Ctrl as accountDetails",
              resolve: {
                  account: ['accountSvc', '$stateParams', function (accountSvc, $stateParams) {
                      console.log($stateParams.id);
                      return accountSvc.getAccount($stateParams.id);
                  }]
              }
          })
            .state('accounts.list.edit', {
                url: "/:id/edit",
                templateUrl: "/app/templates/accounts/accountEdit.html",
                controller: "accounts_list_edit_Ctrl as accountEdit",
                resolve: {
                    account: ['accountSvc', '$stateParams', function (accountSvc, $stateParams) {
                        console.log($stateParams.id);
                        return accountSvc.getAccount($stateParams.id);
                    }]
                }
            })
            .state('accounts.list.details.createTrans', {
                url: "/:id/createTrans",
                templateUrl: "/app/templates/accounts/createTrans.html",
                controller: "accounts_list_details_createTrans_Ctrl as createTransCtrl",
                resolve: {
                    categories: ['$stateParams', 'categorySvc', function ($stateParams, categorySvc) {
                        console.log($stateParams.id);
                        console.log('inside createtrans state resolve function');
                        return categorySvc.getCategories();
                    }]
                }
            })
            .state('accounts.list.details.editTrans', {
                url: "/:transId/editTrans",
                templateUrl: "/app/templates/accounts/editTrans.html",
                controller: "accounts_list_details_editTrans_Ctrl as editTransCtrl",
                resolve: {
                    trans: ['transactionSvc', '$stateParams', function (transactionSvc, $stateParams) {
                        console.log("inside resolve function calling to transactionSvc");
                        console.log($stateParams.id);
                        return transactionSvc.getTransaction($stateParams.transId);
                    }]
                }
            })
          .state('budget', {
              url: "/budget",
              abstract: true,
              templateUrl: "/app/templates/budget/budget.html",
              controller: "budget_Ctrl as budget"
          })
          .state('budget.list', {
              url: "",
              templateUrl: "/app/templates/budget/budgetList.html",
              controller: "budget_list_Ctrl as budgetList",
              resolve: {
                  budgetItems: ['budgetItemSvc', function (budgetItemSvc) {
                      return budgetItemSvc.getBudgetItems();
                  }],
                  categories: ['categorySvc', function (categorySvc) {
                      return categorySvc.getCategories();
                  }]
              }
          })
          .state('budget.list.createItem', {
              url: "/create",
              templateUrl: "/app/templates/budget/createBudgetItem.html",
              controller: "budget_list_createItem_Ctrl as createItemCtrl",
              resolve: {
                  categories: ['categorySvc', function (categorySvc) {
                      return categorySvc.getCategories();
                  }]
              }
          })
          .state('budget.list.editItem', {
              url: "/:id/edit",
              templateUrl: "/app/templates/budget/budget_list_editItem.html",
              controller: "budget_list_editItem_Ctrl as editItem",
              resolve: {
                  budgetItem: ['budgetItemSvc', '$stateParams', function (budgetItemSvc, $stateParams) {
                      console.log($stateParams.id);
                      return budgetItemSvc.getBudgetItem($stateParams.id);
                  }]
              }
          })
    });

    console.log("after states list");

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