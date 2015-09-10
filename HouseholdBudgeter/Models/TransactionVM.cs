using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseholdBudgeter.Models
{
    public class TransactionVM
    {
        public string Description { get; set; }
        public string Status { get; set; }

        public decimal Amount { get; set; }
        public System.DateTimeOffset Created { get; set; }
        public Nullable<System.DateTimeOffset> Updated { get; set; }

        public bool Reconciled { get; set; }
        public int CategoryId { get; set; }
    }
}