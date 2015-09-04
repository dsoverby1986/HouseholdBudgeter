using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HouseholdBudgeter.Models
{
    public class Invitaton
    {
        public string Code { get; set; }
        [Key, Column(Order=0)]
        public int? HouseholdId { get; set; }
        [Key, Column(Order=1)]
        public string InvitedEmail { get; set; }

        public virtual Household Household { get; set; }
    }
}