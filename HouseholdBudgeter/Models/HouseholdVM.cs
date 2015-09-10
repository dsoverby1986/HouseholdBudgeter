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
        public List<ApplicationUser> Users { get; set; }
    }
}