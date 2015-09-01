using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseholdBudgeter.Models
{
    public class BudgetItem
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int HouseHoldId { get; set; }
        public int CategoryId { get; set; }
        public int Frequency { get; set; }

        public virtual Household Household { get; set; }
        public virtual Category Category { get; set; }
    }
}