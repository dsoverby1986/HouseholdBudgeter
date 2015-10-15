using HouseholdBudgeter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace HouseholdBudgeter.Controllers
{
    [Authorize]
    [RoutePrefix("api/charting")]
    public class ChartingController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();
        [Route("Month")]
        public IHttpActionResult GetMonth()
        {
            var r = new Random();
            var user = db.Users.Find(User.Identity.GetUserId());
            return Ok(new dynamic[]
            {
                new
                {
                    key = "Budgeted",
                    color = "#06c5ac",
                    values = from b in user.Household.BudgetItems.Where(b=>b.IsIncome == false)
                            select new {
                                x = b.Category.Name,
                                y = b.Amount
                            }
                },
                new
                {
                    key = "Spent",
                    color = "#b94a48",
                    values = from b in user.Household.BudgetItems.Where(b=>b.IsIncome == false)
                            select new {
                                x = b.Category.Name,
                                y = b.Category.Transactions.Where(t=>t.Created > DateTimeOffset.Now.AddDays(-(DateTimeOffset.Now.Day-1))).Select(t=>t.Amount).DefaultIfEmpty().Sum() * -1
                            }
                }
            });
        }
        [Route("Monthly")]
        public IHttpActionResult GetMonthly()
        {
            var monthsToDate = Enumerable.Range(1, DateTime.Today.Month)
                           .Select(m => new DateTime(DateTime.Today.Year, m, 1))
                           .ToList();

            var user = db.Users.Find(User.Identity.GetUserId());

            return Ok(new dynamic[]{
                new {
                    key = "Budgeted",
                    color = "#06c5ac",
                    values = from month in monthsToDate
                             select new {
                                 x = month.ToString("MMM"),
                                 y = db.BudgetItems.Where(b=>b.HouseHoldId == user.HouseholdId).Select(b=>b.Amount).DefaultIfEmpty().Sum()
                    }
                },
                new {
                    key = "Spent",
                    color = "#b94a48",
                    values = from month in monthsToDate
                             select new {
                                 x = month.ToString("MMM"),
                                 y = db.Transactions.Where(t=>t.Created.Month == month.Month && t.Created.Year == month.Year && t.Account.HouseholdId == user.HouseholdId && !t.IsIncome && !t.Archived).Select(t=>t.Amount).DefaultIfEmpty().Sum() * -1
                    }
                },
                new {
                    key = "Earned",
                    color = "#1F77B4",
                    values = from month in monthsToDate
                             select new {
                                 x = month.ToString("MMM"),
                                 y = db.Transactions.Where(t=>t.Created.Month == month.Month && t.Created.Year == month.Year  && t.Account.HouseholdId == user.HouseholdId && t.IsIncome && !t.Archived && t.Category.Name != "Initial Account Balance" && t.Category.Name != "Manual Balance Adjustment")
                                                        .Select(t=>t.Amount).DefaultIfEmpty().Sum()
                    }
                },

            });
        }
    }
}