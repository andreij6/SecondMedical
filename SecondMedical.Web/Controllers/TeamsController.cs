using SecondMedical.DataModels;
using SecondMedical.Web.Adapters.DataAdapters;
using SecondMedical.Web.Adapters.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SecondMedical.Web.Controllers
{
    public class TeamsController : ApiController
    {
        ISoccerRepo db;

        public TeamsController()
        {
            db = new SoccerRepo();
        }

        public TeamsController(ISoccerRepo _db)
        {
            db = _db;
        }

        // POST: api/Teams
        public IHttpActionResult Post([FromBody] Team team)
        {

            int result = db.AddTeam(team);

            return Ok(result);
        }

        // PUT: api/Teams/5
        public void Put(int id, [FromBody]Team team)
        {
            db.UpdateTeam(id, team);
        }

        // DELETE: api/Teams/5
        public void Delete(int id)
        {
            db.DeleteTeam(id);
        }
    }
}
