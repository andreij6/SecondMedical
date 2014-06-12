using SecondMedical.Data;
using SecondMedical.DataModels;
using SecondMedical.Web.Adapters.Interface;
using SecondMedical.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SecondMedical.Web.Adapters.DataAdapters
{
    public class SoccerRepo : ISoccerRepo
    {

        public HomeVM getHomeVM()
        {
            HomeVM model = new HomeVM();

            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                model.Teams = db.Teams.ToList();

                model.Games = db.Games.ToList();
            }

            return model;
        }


        public int AddTeam(Team team)
        {
            int id;

            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                db.Teams.Add(team);
                db.SaveChanges();

                var newlyAdded = db.Teams.Where(x => x.Name == team.Name).FirstOrDefault();

                id = newlyAdded.Id;
            }
            return id;

        }

        public void UpdateTeam(int id, Team team)
        {
            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                Team oldTeam = db.Teams.Find(id);

                oldTeam.Name = team.Name;

                db.SaveChanges();

            }
        }

        public void DeleteTeam(int id)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                Team deleteMe = db.Teams.Find(id);

                List<Game> games = db.Games.Where(x => x.TeamOneId == id || x.TeamTwoId == id).ToList();

                for (int i = 0; i < games.Count; i++)
                {
                    var game = db.Games.Find(games[i].Id);
                    db.Games.Remove(game);
                }

                db.Teams.Remove(deleteMe);

                db.SaveChanges();
            }
        }


        public int AddGame(Game game)
        {
            int GameId;

            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                Team one = db.Teams.Find(game.TeamOneId);
                Team two = db.Teams.Find(game.TeamTwoId);

                game.TeamOne = one;
                game.TeamTwo = two;

                db.Games.Add(game);

                db.SaveChanges();

                List<Game> newGames = db.Games.ToList();

                GameId = newGames.Last().Id;

            }

            return GameId;
        }

        public void UpdateGame(int id, Game game)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                Game oldGame = db.Games.Find(id);

                oldGame.Date = game.Date;
                oldGame.TeamOneId = game.TeamOneId;
                oldGame.TeamTwoId = game.TeamTwoId;

                db.SaveChanges();

            }
        }

        public void CancelGame(int id)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                Game deleteMe = db.Games.Find(id);

                db.Games.Remove(deleteMe);

                db.SaveChanges();
            }
        }
    }
}