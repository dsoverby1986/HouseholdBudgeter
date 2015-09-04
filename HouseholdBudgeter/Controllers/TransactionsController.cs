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
        public IHttpActionResult TransByCategory(int accountId, int catId)
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
        public async Task<IHttpActionResult> PutTransaction(int id, string description/*, string status*/, decimal? amount, int? catId, bool? rec)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var trans = db.Transactions.Find(id);

            if (id != trans.Id)
            { 
                return BadRequest();
            }

            if (!string.IsNullOrWhiteSpace(description))
            {
                trans.Description = description;
            }

            /*if(!string.IsNullOrWhiteSpace(status))
            {
                trans.Status = status;
            }*/

            if (amount != null)
            {
                trans.Account.Balance -= trans.Amount;
                trans.Amount = (decimal)amount;
                trans.Account.Balance += (decimal)amount;
            }

            if(catId != null)
            {
                trans.CategoryId = (int)catId;
            }

            if(trans.Reconciled != rec)
            {
                trans.Reconciled = (bool)rec;
            }

            trans.Updated = DateTimeOffset.Now;

            await db.SaveChangesAsync();

            return Ok(trans);
        }

        // POST: api/Transactions
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> PostTransaction(Transaction trans)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            trans.Created = DateTimeOffset.Now;
            db.Transactions.Add(trans);
            var account = db.Accounts.Find(trans.AccountId);
            account.Balance = account.Balance + trans.Amount;

            db.Transactions.Add(trans);
            await db.SaveChangesAsync();

            return Ok(trans);
        }

        // DELETE: api/Transactions/5
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> DeleteTransaction(int id)
        {
            Transaction transaction = await db.Transactions.FindAsync(id);
            var user = db.Users.Find(User.Identity.GetUserId());
            var account = user.Household.Accounts.FirstOrDefault(a => a.Id == id);

            if (transaction == null)
            {
                return NotFound();
            }

            account.Balance -= transaction.Amount;
            
            db.Transactions.Remove(transaction);
            await db.SaveChangesAsync();

            return Ok(transaction);
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