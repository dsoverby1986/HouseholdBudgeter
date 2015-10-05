using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HouseholdBudgeter.Controllers
{
    [RoutePrefix("api/Values")]
    [Authorize]
    public class ValuesController : ApiController
    {
        // GET api/values
        [Route("GetValues")]
        public IHttpActionResult Get()
        {
            var r = new Random();

            return Ok(new dynamic[]
            {
                new
                {
                    key = "Actual",
                    color = "#51A351",
                    values = Enumerable.Range(0, 10).Select(i =>
                    new
                    {
                        x = (char)('A' + i),
                        y = r.Next(100, 5000),

                    })
                
                },
                new
                {
                    key = "Budgeted",
                    color = "#BD362F",
                    values = Enumerable.Range(0, 10).Select(i =>
                    new
                    {
                        x = (char)('A' + i),
                        y = r.Next(100, 5000),

                    })
                }
            });
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
