using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace HouseholdBudgeter.Models
{
    public class Category
    {
        public Category()
        {
            this.BudgetItems = new HashSet<BudgetItem>();
            this.Transactions = new HashSet<Transaction>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? HouseholdId { get; set; }

        public virtual Household Household { get; set; }
        [JsonIgnore]
        public virtual ICollection<BudgetItem> BudgetItems { get; set; }
        [JsonIgnore]
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}