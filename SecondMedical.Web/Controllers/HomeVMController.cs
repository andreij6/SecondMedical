using SecondMedical.Web.Adapters.DataAdapters;
using SecondMedical.Web.Adapters.Interface;
using SecondMedical.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SecondMedical.Web.Controllers
{
    public class HomeVMController : ApiController
    {
        ISoccerRepo db;

        public HomeVMController()
        {
            db = new SoccerRepo();
        }

        public HomeVMController(ISoccerRepo _db)
        {
            db = _db;
        }
        // GET: api/HomeVM
        public HomeVM Get()
        {
            HomeVM model = db.getHomeVM();

            return model;
        }

        // GET: api/HomeVM/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/HomeVM
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/HomeVM/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/HomeVM/5
        public void Delete(int id)
        {
        }
    }
}
