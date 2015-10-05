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
        [Authorize]
        [HttpPost, Route("GetTransactions")]
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

        [Authorize]
        [HttpPost, Route("TransByCategory")]
        public IHttpActionResult GetTransByCategory(int accountId, int catId)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            var allTransList = user.Household.Accounts.Where(a => a.Id == accountId).SelectMany(a => a.Transactions);

            var transList = allTransList.Where(t => t.CategoryId == catId);

            return Ok(transList);
        }

        // GET: api/Transactions/5
        [Authorize]
        [HttpPost, Route("GetTransaction")]
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> GetTransaction([FromBody]int id)
        {
            Transaction transaction = await db.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }
        
        // PUT: api/Transactions/5
        [Authorize]
        [HttpPost, Route("EditTransaction")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTransaction(Transaction trans)
        {
            //check the incoming model's validity
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //look up the current user
            var user = db.Users.Find(User.Identity.GetUserId());

            //check the current user's authenticity
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }


            if (trans.Category != null)
            {
                db.Entry(trans.Category).State = trans.Category.Id == 0 ? EntityState.Added : EntityState.Unchanged;
            }
            else
            {
                return BadRequest();
            }

            //if the incoming transaction is an expense
            if (!trans.IsIncome)
            {//change the value to reflect an expense
                if (trans.Amount > 0)
                    trans.Amount *= -1;
            }
            else//if for some reason the user is editing and sets the amount of an income tranaction to be negative change the value to reflect an income
                if (trans.Amount < 0)
                    trans.Amount *= -1;

            //look up the transaction in the database
            var existingTrans = db.Transactions.AsNoTracking().FirstOrDefault(t => t.Id == trans.Id);

            //use the 
            var etaBalance = existingTrans.Account.Balance;
            var etaAmount = existingTrans.Amount;

            etaBalance -= etaAmount;
            etaBalance += trans.Amount;

            var account = db.Accounts.FirstOrDefault(a => a.Id == trans.AccountId);

            account.Balance = etaBalance;

            db.Entry(trans).State = EntityState.Modified;

            if (trans.Category.Id != 0)
            {
                trans.CategoryId = trans.Category.Id;
            }

            trans.Updated = DateTimeOffset.Now;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(trans.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(trans);
        }

        // POST: api/Transactions
        [Authorize]
        [HttpPost, Route("CreateTransaction")]
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> PostTransaction(Transaction trans)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (trans.Category != null)
            {
                db.Entry(trans.Category).State = trans.Category.Id == 0 ? EntityState.Added : EntityState.Unchanged;
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
            var account = db.Accounts.FirstOrDefault(a => a.Id == trans.AccountId);
            account.Balance = account.Balance + trans.Amount;

            if (trans.Category.Id != 0)
            {
                trans.CategoryId = trans.Category.Id;
            }

            db.Transactions.Add(trans);
            await db.SaveChangesAsync();

            return Ok(trans);
        }

        // DELETE: api/Transactions/5
        [Authorize]
        [HttpPost, Route("DeleteTransaction")]
        [ResponseType(typeof(Transaction))]
        public async Task<IHttpActionResult> DeleteTransaction([FromBody]int id)
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