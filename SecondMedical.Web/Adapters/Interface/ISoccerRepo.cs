using SecondMedical.DataModels;
using SecondMedical.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondMedical.Web.Adapters.Interface
{
    public interface ISoccerRepo
    {
        HomeVM getHomeVM();


        int AddTeam(Team team);

        void UpdateTeam(int id, Team team);

        void DeleteTeam(int id);


        int AddGame(Game game);

        void UpdateGame(int id, Game game);

        void CancelGame(int id);
    }
}
