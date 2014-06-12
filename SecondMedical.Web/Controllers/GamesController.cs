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
    public class GamesController : ApiController
    {
        ISoccerRepo db;

        public GamesController()
        {
            db = new SoccerRepo();
        }

        public GamesController( ISoccerRepo _db)
        {
            db = _db;
        }
        // GET: api/Games
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/Games/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Games
        
        public IHttpActionResult Post([FromBody]Game game)
        {
            int gameId = db.AddGame(game);

            return Ok(gameId);
        }

        // PUT: api/Games/5
        public void Put(int id, [FromBody]Game game)
        {
            db.UpdateGame(id, game);
        }

        // DELETE: api/Games/5
        public void Delete(int id)
        {
            db.CancelGame(id);
        }
    }
}
