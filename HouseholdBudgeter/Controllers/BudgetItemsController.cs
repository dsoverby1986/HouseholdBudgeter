﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;

namespace HouseholdBudgeter.Models
{
    [RoutePrefix("api/BudgetItems")]
    [Authorize]
    public class BudgetItemsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/BudgetItems
        [HttpPost, Route("BudgetItems")]
        [ResponseType(typeof(BudgetItem))]
        public IHttpActionResult GetBudgetItems()
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var budgetItems = user.Household.BudgetItems;

            foreach (var item in budgetItems)
            {
                if (item.IsIncome)
                {
                    item.Type = "Income";
                }
                else
                {
                    item.Type = "Expenditure";
                }
            }

            return Ok(budgetItems);
        }

        // GET: api/BudgetItems/5
        [HttpPost, Route("BudgetItem")]
        [ResponseType(typeof(BudgetItem))]
        public async Task<IHttpActionResult> GetBudgetItem([FromBody]int id)
        {
            BudgetItem budgetItem = await db.BudgetItems.FindAsync(id);
            if (budgetItem == null)
            {
                return NotFound();
            }

            return Ok(budgetItem);
        }

        // PUT: api/BudgetItems/5
        [HttpPost, Route("EditBudgetItem")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBudgetItem(BudgetItem budgetItem)
        {
            string badRequestDescription = "";

            if (budgetItem.Name == "" || budgetItem.Name == null)
            {
                badRequestDescription = "itemNameError";

                return Ok(badRequestDescription);
            }
            else if (budgetItem.Amount == 0 || budgetItem.Amount == null)
            {
                badRequestDescription = "limitAmountError";

                return Ok(badRequestDescription);
            }
            else if (budgetItem.Frequency == 0 || budgetItem.Frequency == null)
            {
                badRequestDescription = "frequencyError";

                return Ok(badRequestDescription);
            }
            else if (budgetItem.Category.Name == "" || budgetItem.Category.Name == null)
            {
                badRequestDescription = "categoryError";

                return Ok(badRequestDescription);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (budgetItem.Category != null)
            {
                db.Entry(budgetItem.Category).State = budgetItem.Category.Id == 0 ? EntityState.Added : EntityState.Unchanged;
            }

            var existingItem = db.BudgetItems.FirstOrDefault(i => i.Id == budgetItem.Id);

            if (budgetItem.Name != existingItem.Name)
            {
                existingItem.Name = budgetItem.Name;
            }

            if (budgetItem.Amount != existingItem.Amount)
            {
                existingItem.Amount = budgetItem.Amount;
            }

            if (budgetItem.CategoryId != existingItem.CategoryId)
            {
                existingItem.CategoryId = budgetItem.CategoryId;
            }

            if (budgetItem.Frequency != existingItem.Frequency)
            {
                existingItem.Frequency = budgetItem.Frequency;
            }

            if (budgetItem.IsIncome != existingItem.IsIncome)
            {
                existingItem.IsIncome = budgetItem.IsIncome;
            }

            if (budgetItem.IsIncome)
            {
                existingItem.Type = "Income";
            }
            else
            {
                existingItem.Type = "Expenditure";
            }

            await db.SaveChangesAsync();

            return Ok(budgetItem);
        }

        // POST: api/BudgetItems
        [Authorize]
        [HttpPost, Route("CreateBudgetItem")]
        [ResponseType(typeof(BudgetItem))]
        public async Task<IHttpActionResult> PostBudgetItem(BudgetItem budgetItem)
        {
            string badRequestDescription = "";

            if (budgetItem.Name == "" || budgetItem.Name == null)
            {
                badRequestDescription = "itemNameError";

                return Ok(badRequestDescription);
            }
            else if (budgetItem.Amount == 0 || budgetItem.Amount == null)
            {
                badRequestDescription = "limitAmountError";

                return Ok(badRequestDescription);
            }
            else if (budgetItem.Frequency == 0 || budgetItem.Frequency == null)
            {
                badRequestDescription = "frequencyError";

                return Ok(badRequestDescription);
            }
            else if (budgetItem.Category.Name == "" || budgetItem.Category.Name == null)
            {
                badRequestDescription = "categoryError";

                return Ok(badRequestDescription);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (budgetItem.Category != null)
            {
                db.Entry(budgetItem.Category).State = budgetItem.Category.Id == 0 ? EntityState.Added : EntityState.Unchanged;
            }

            var user = db.Users.Find(User.Identity.GetUserId());

            budgetItem.Category.HouseholdId = user.HouseholdId;

            budgetItem.HouseHoldId = (int)user.HouseholdId;
            
            if (budgetItem.Category.Id != 0)
            {
                budgetItem.CategoryId = budgetItem.Category.Id;
            }

            if (budgetItem.IsIncome)
            {
                budgetItem.Type = "Income";
            }
            else
            {
                budgetItem.Type = "Expenditure";
            }

            db.BudgetItems.Add(budgetItem);
            await db.SaveChangesAsync();

            return Ok(budgetItem);
        }

        // DELETE: api/BudgetItems/5
        [Authorize]
        [HttpPost, Route("DeleteBudgetItem")]
        [ResponseType(typeof(BudgetItem))]
        public async Task<IHttpActionResult> DeleteBudgetItem(int id)
        {
            BudgetItem budgetItem = await db.BudgetItems.FindAsync(id);
            if (budgetItem == null)
            {
                return NotFound();
            }

            db.BudgetItems.Remove(budgetItem);
            await db.SaveChangesAsync();

            return Ok("The " + budgetItem.Name + " budget item has been deleted.");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BudgetItemExists(int id)
        {
            return db.BudgetItems.Count(e => e.Id == id) > 0;
        }
    }
}