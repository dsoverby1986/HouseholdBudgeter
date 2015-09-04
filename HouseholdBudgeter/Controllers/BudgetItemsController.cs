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
    public class BudgetItemsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/BudgetItems
        public IQueryable<BudgetItem> GetBudgetItems()
        {
            return db.BudgetItems;
        }

        // GET: api/BudgetItems/5
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
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBudgetItem(int id, BudgetItem budgetItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != budgetItem.Id)
            {
                return BadRequest();
            }

            db.Entry(budgetItem).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BudgetItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BudgetItems
        [ResponseType(typeof(BudgetItem))]
        public async Task<IHttpActionResult> PostBudgetItem(BudgetItem budgetItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.Find(User.Identity.GetUserId());

            db.BudgetItems.Add(budgetItem);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = budgetItem.Id }, budgetItem);
        }

        // DELETE: api/BudgetItems/5
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

            return Ok(budgetItem);
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