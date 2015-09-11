using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseholdBudgeter.Models
{
    public class HouseholdVM
    {
        public string Name { get; set; }
        public List<Account> Accounts { get; set; }
        public List<BudgetItem> BudgetItems { get; set; }
        public List<User> Users { get; set; }

        public class User
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string DisplayName { get; set; }
            public string Email { get; set; }
        }
    }
}