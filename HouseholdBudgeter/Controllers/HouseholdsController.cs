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
using HouseholdBudgeter.Models;

namespace HouseholdBudgeter.Controllers
{
    public class HouseholdsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Households
        public IQueryable<Household> GetHouseholds()
        {
            return db.Households;
        }

        // GET: api/Households/5
        [ResponseType(typeof(Household))]
        public async Task<IHttpActionResult> GetHousehold(int id)
        {
            Household household = await db.Households.FindAsync(id);
            if (household == null)
            {
                return NotFound();
            }

            return Ok(household);
        }

        // PUT: api/Households/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutHousehold(int id, Household household)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != household.Id)
            {
                return BadRequest();
            }

            db.Entry(household).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HouseholdExists(id))
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

        // POST: api/Households
        [ResponseType(typeof(Household))]
        public async Task<IHttpActionResult> PostHousehold(Household household)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Households.Add(household);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = household.Id }, household);
        }

        // DELETE: api/Households/5
        [ResponseType(typeof(Household))]
        public async Task<IHttpActionResult> DeleteHousehold(int id)
        {
            Household household = await db.Households.FindAsync(id);
            if (household == null)
            {
                return NotFound();
            }

            db.Households.Remove(household);
            await db.SaveChangesAsync();

            return Ok(household);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HouseholdExists(int id)
        {
            return db.Households.Count(e => e.Id == id) > 0;
        }
    }
}