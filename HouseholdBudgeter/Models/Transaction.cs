using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace HouseholdBudgeter.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Description { get; set; }
        //public string Status { get; set; }
        public decimal Amount { get; set; }
        public System.DateTimeOffset Created { get; set; }
        public Nullable<System.DateTimeOffset> Updated { get; set; }
        public bool Reconciled { get; set; }
        public int CategoryId { get; set; }
        public int AccountId { get; set; }
        public bool Archived { get; set; }
        
        public virtual Category Category { get; set; }
        [JsonIgnore]
        public virtual Account Account { get; set; }

    }
}