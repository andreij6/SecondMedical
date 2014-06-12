using SecondMedical.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SecondMedical.Web.Models
{
    public class HomeVM
    {
        public List<Team> Teams { get; set; }
        public List<Game> Games { get; set; }
    }
}