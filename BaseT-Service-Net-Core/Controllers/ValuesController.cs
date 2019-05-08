using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{  
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
      
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] {
                "value12", "value122",
                "value3", "value223",
                "value4", "value224",
                "value5", "value225",
                "value6", "value226",
                "value7", "value227",
                "value8", "value228"
            };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "Web API 2";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [Authorize("jsclient")]
        [HttpPost]
        public Task<string> Merhabain([FromBody]string value)
        {    
            string x="JsClient ile Eristin";
             return Task.FromResult(x);
        }


    }
}
