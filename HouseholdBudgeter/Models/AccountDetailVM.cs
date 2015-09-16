using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HouseholdBudgeter.Models
{
    public class AccountDetailVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public List<Transaction> Transactions { get; set; }
        public int? HouseholdId { get; set; }
        public bool Archived { get; set; }

        public class Transaction
        {
            public int Id { get; set; }
            public string Description { get; set; }
            public decimal Amount { get; set; }
            public System.DateTimeOffset Created { get; set; }
            public Nullable<System.DateTimeOffset> Updated { get; set; }
            public decimal Reconciled { get; set; }
            public int AccountId { get; set; }
            public int CategoryId { get; set; }
            public bool Archived { get; set; }
            public bool IsIncome { get; set; }

        }
    }
}