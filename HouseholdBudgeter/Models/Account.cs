using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace HouseholdBudgeter.Models
{
    public class Account
    {
        public Account()
        {
            this.Transactions = new HashSet<Transaction>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public int HouseholdId { get; set; }
        public bool Archived { get; set; }

        public virtual Household Household { get; set; }
        [JsonIgnore]
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}