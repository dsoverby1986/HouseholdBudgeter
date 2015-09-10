using System;
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

            return Ok(budgetItems);
        }

        // GET: api/BudgetItems/5
        [HttpPost, Route("BudgetItem")]
        [ResponseType(typeof(BudgetItem))]
        public async Task<IHttpActionResult> GetBudgetItem(int id)
        {
            BudgetItem budgetItem = await db.BudgetItems.FindAsync(id);
            if (budgetItem == null)
            {
                return NotFound();
            }

            return Ok(budgetItem);
        }

        // PUT: api/BudgetItems/5
        [Route("EditBudgetItem")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBudgetItem(BudgetItem budgetItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.Find(User.Identity.GetUserId());
            var item = db.BudgetItems.Find(budgetItem.Id);
            var itemIshad = user.Household.BudgetItems.Any(i => i.Id == budgetItem.Id);

            if (!itemIshad)
                return Ok("You do not have permission to alter this budget item.");

            if (budgetItem.Amount != item.Amount)
                item.Amount = budgetItem.Amount;

            if (budgetItem.CategoryId != 0 && budgetItem.CategoryId != item.CategoryId)
            {
                item.CategoryId = budgetItem.CategoryId;
                item.Category = db.Categories.Find(budgetItem.CategoryId);
            }

            if (budgetItem.Frequency != item.Frequency)
                item.Frequency = budgetItem.Frequency;

            if (budgetItem.Name != null && budgetItem.Name != item.Name)
                item.Name = budgetItem.Name;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BudgetItemExists(budgetItem.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(item);
        }

        // POST: api/BudgetItems
        [Authorize]
        [HttpPost, Route("CreateBudgetItem")]
        [ResponseType(typeof(BudgetItem))]
        public async Task<IHttpActionResult> PostBudgetItem(BudgetItem budgetItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.Find(User.Identity.GetUserId());

            budgetItem.HouseHoldId = (int)user.HouseholdId;
            budgetItem.Household = user.Household;
            budgetItem.Category = db.Categories.Find(budgetItem.CategoryId);

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