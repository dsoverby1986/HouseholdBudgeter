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
        
        [HttpPost, Route("AccountDetails")]
        [ResponseType(typeof(AccountDetailVM))]
        public IHttpActionResult AccountDetails([FromBody]int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            Account account = user.Household.Accounts.FirstOrDefault(a => a.Id == id);

            AccountDetailVM accountDetail = new AccountDetailVM()
            {
                Id = account.Id,
                Name = account.Name,
                Balance = account.Balance,
                HouseholdId = account.HouseholdId,
                Archived = account.Archived,
                Transactions = account.Transactions.Select(t => new AccountDetailVM.Transaction
                {
                    Id = t.Id,
                    Description = t.Description,
                    Amount = t.Amount,
                    Created = t.Created,
                    Updated = t.Updated,
                    Reconciled = t.Reconciled,
                    AccountId = t.AccountId,
                    CategoryId = t.CategoryId,
                    Archived = t.Archived,
                    IsIncome = t.IsIncome

                }).ToList()

            };

            return Ok(accountDetail);
        }
        
        // GET: api/Accounts
        [HttpPost, Route("GetAccounts")]
        public IHttpActionResult GetAccounts()
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var accountList = user.Household.Accounts.Where(a => a.Archived == false).Select(a => a).ToList();

            return Ok(accountList);
        }

        // GET: api/Accounts/5
        [HttpPost, Route("GetAccount")]
        [ResponseType(typeof(Account))]
        public async Task<IHttpActionResult> GetAccount([FromBody]int id)
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
        [HttpPost, Route("EditAccount")]
        [ResponseType(typeof(Account))]
        public async Task<IHttpActionResult> PutAccount(Account account)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var accountIsHad = user.Household.Accounts.Any(a => a.Id == account.Id);

            var existingAccount = user.Household.Accounts.FirstOrDefault(a => a.Id == account.Id);

            if(!accountIsHad)
            {
                return Ok("You do not have permission to edit this account");
            }

            if(account.Name != existingAccount.Name)
            {
                existingAccount.Name = account.Name;
            }

            if(account.Balance != existingAccount.Balance)
            {
                decimal adjustmentAmount = account.Balance - existingAccount.Balance;

                Transaction trans = new Transaction()
                {
                    Description = "Manual Account Balance Adjustment.",
                    AccountId = existingAccount.Id,
                    Account = existingAccount,
                    Amount = adjustmentAmount,
                    Category = db.Categories.Find(1),
                    Created = DateTimeOffset.Now,
                    CategoryId = 1
                };

                existingAccount.Balance = account.Balance;

                db.Transactions.Add(trans);
            }

            await db.SaveChangesAsync();

            return Ok(existingAccount);
        }

        [HttpPost, Route("AdjustBalance")]
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
        [HttpPost, Route("CreateAccount")]
        [ResponseType(typeof(Account))]
        public async Task<IHttpActionResult> PostAccount(Account account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.Find(User.Identity.GetUserId());

            if (user.HouseholdId == null)
            {
                return Ok("To create accounts you must first create or join a household.");
            }
            account.HouseholdId = (int)user.HouseholdId;
            account.Household = db.Households.Find(user.HouseholdId);
            
            db.Accounts.Add(account);
            await db.SaveChangesAsync();

            Transaction trans = new Transaction()
            {
                Description = "Account Initialization",
                Amount = account.Balance,
                CategoryId = 1,
                Created = DateTimeOffset.Now,
                AccountId = account.Id,
                IsIncome = true
            };

            db.Transactions.Add(trans);
            await db.SaveChangesAsync();
            
            return Ok(account);
            //"The " + account.Name + " account has been created for the " + account.Household.Name + " household. A transaction showing the initialization of this account has also been created." + 
        }

        [HttpPost, Route("ArchiveAccount")]
        public async Task<IHttpActionResult> PutArchiveAccount([FromBody]int id)
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