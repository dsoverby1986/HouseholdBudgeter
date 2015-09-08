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
    [RoutePrefix("api/Transactions")]
    [Authorize]
    public class TransactionsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Transactions
        [Route("GetTransactions")]
        public IHttpActionResult GetTransactions(int id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var accountIsHad = user.Household.Accounts.Any(a => a.Id == id);

            if (!accountIsHad)
            {
                return Ok("You do not have permission to view these transactions.");
            }

            var account = db.Accounts.Find(id);
            var transList = account.Transactions.ToList();

            return Ok(transList);
            
        }

        [Route("TransByCategory")]
        public IHttpActionResult GetTransByCategory(int accountId, int catId)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var allTransList = user.Household.Accounts.Where(a => a.Id == accountId).SelectMany(a => a.Transactions);

            var transList = allTransList.Where(t => t.CategoryId == catId);

            return Ok(transList);
        }

        // GET: api/Transactions/5
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> GetTransaction(int id)
        {
            Transaction transaction = await db.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }
        
        // PUT: api/Transactions/5
        [Route("EditTransaction")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTransaction(Transaction alteredTrans)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var trans = db.Transactions.AsNoTracking().FirstOrDefault(t => t.Id == alteredTrans.Id);

            if (trans == null)
            {
                return BadRequest();
            }

            if (!alteredTrans.IsIncome)
            {
                if (alteredTrans.Amount > 0)
                    alteredTrans.Amount *= -1;
            }
            else
                if (alteredTrans.Amount < 0)
                    alteredTrans.Amount *= -1;

            if (alteredTrans.Amount != null)
            {
                trans.Account.Balance -= trans.Amount;
                trans.Amount = alteredTrans.Amount;
                trans.Account.Balance += alteredTrans.Amount;
            }

            trans.Updated = DateTimeOffset.Now;

            db.Update(trans, "Description", "Amount", "Reconciled", "CategoryId", "Archived");

            await db.SaveChangesAsync();

            return Ok(trans);
        }

        // POST: api/Transactions
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> PostTransaction(Transaction trans)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!trans.IsIncome)
            {
                if (trans.Amount > 0)
                    trans.Amount *= -1;
            }
            else
                if (trans.Amount < 0)
                    trans.Amount *= -1;

            trans.Created = DateTimeOffset.Now;
            var account = user.Household.Accounts.FirstOrDefault(a => a.Id == trans.AccountId);
            account.Balance = account.Balance + trans.Amount;

            db.Transactions.Add(trans);
            await db.SaveChangesAsync();

            return Ok(trans);
        }

        // DELETE: api/Transactions/5
        [Route("DeleteTransaction")]
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> DeleteTransaction(int id)
        {
            Transaction transaction = await db.Transactions.FindAsync(id);
            var user = db.Users.Find(User.Identity.GetUserId());
            var account = user.Household.Accounts.FirstOrDefault(a => a.Id == transaction.AccountId);

            if (transaction == null)
            {
                return NotFound();
            }

            account.Balance -= transaction.Amount;
            
            db.Transactions.Remove(transaction);
            await db.SaveChangesAsync();

            return Ok("The transaction with id: " + transaction.Id + " has been deleted. The updated balance for the " + account.Name + " account is " + account.Balance + ".");

            //return Ok(transaction);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransactionExists(int id)
        {
            return db.Transactions.Count(e => e.Id == id) > 0;
        }
    }
}