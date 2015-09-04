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
using Microsoft.AspNet.Identity;

namespace HouseholdBudgeter.Controllers
{
    [Authorize]
    [RoutePrefix("api/Accounts")]
    public class AccountsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Accounts
        public IHttpActionResult GetAccounts()
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var accountList = user.Household.Accounts.ToList();

            return Ok(accountList);
        }

        // GET: api/Accounts/5
        [Route("GetAccount")]
        [ResponseType(typeof(Account))]
        public async Task<IHttpActionResult> GetAccount(int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            Account account = await db.Accounts.FindAsync(id);
            var accountIsHad = user.Household.Accounts.Any(a => a.Id == id);

            if (account == null)
            {
                return NotFound();
            }

            if(!accountIsHad)
            {
                return Ok("You do not have permission to view this account.");
            }
            else if(!account.Archived)
            {
                return Ok(account);
            }

            return Ok("This account has been archived.");
        }

        // PUT: api/Accounts/5
        /*[Route("EditAccount")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAccount(int id, Account account, string name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != account.Id)
            {
                return BadRequest();
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                account.Name = name;
            }

            db.Entry(account).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(account);
        }*/

        // PUT: api/Accounts/5
        [Route("EditAccount")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAccount(int accountId, string name)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var accountIsHad = user.Household.Accounts.Any(a => a.Id == accountId);

            var existingAccount = user.Household.Accounts.FirstOrDefault(a => a.Id == accountId);

            if(!accountIsHad)
            {
                return Ok("You do not have permission to edit this account");
            }

            if(name != existingAccount.Name)
            {
                existingAccount.Name = name;
            }

            await db.SaveChangesAsync();

            return Ok(existingAccount);
        }

        [Route("AdjustBalance")]
        public async Task<IHttpActionResult> AdjustBalance(int id, decimal newBalance)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var account = user.Household.Accounts.FirstOrDefault(a => a.Id == id);

            if(account == null)
            {
                return Ok("You do not have permission to alter this account balance.");
            }

            var adjustment = account.Balance - newBalance;

            db.Transactions.Add(new Transaction() 
            { 
                AccountId = account.Id, 
                Description = "Manual adjustment of account balance.", 
                Amount = adjustment, 
                CategoryId = 1 ,
                Created = DateTimeOffset.Now
            });

            account.Balance -= adjustment;

            await db.SaveChangesAsync();

            return Ok("The balance of the " + account.Name + " has been manually altered.");
        }

        // POST: api/Accounts
        [Route("CreateAccount")]
        [ResponseType(typeof(Account))]
        public async Task<IHttpActionResult> PostAccount(string name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.Find(User.Identity.GetUserId());

            var account = new Account()
            {
                Name = name,
                Balance = 0,
                HouseholdId = (int)user.HouseholdId
            };

            db.Accounts.Add(account);
            await db.SaveChangesAsync();

            return Ok(account);
        }

        [Route("ArchiveAccount")]
        public async Task<IHttpActionResult> PutArchiveAccount(int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var account = db.Accounts.Find(id);

            account.Archived = true;

            foreach(var transaction in account.Transactions)
            {
                transaction.Archived = true;
            }

            await db.SaveChangesAsync();
            //return Ok(user.Household);
            return Ok("The " + account.Name + " account has been archived. It, and any transactions belonging to it, will no longer be available to any members of the " + user.Household.Name + " household.");
        }

        // DELETE: api/Accounts/5
        /*[ResponseType(typeof(Account))]
        public async Task<IHttpActionResult> DeleteAccount(int id)
        {
            Account account = await db.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            db.Accounts.Remove(account);
            await db.SaveChangesAsync();

            return Ok(account);
        }*/

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccountExists(int id)
        {
            return db.Accounts.Count(e => e.Id == id) > 0;
        }
    }
}