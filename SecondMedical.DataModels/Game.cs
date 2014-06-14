using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecondMedical.DataModels
{
    public class Game
    {
        public int Id           { get; set; }

        public int TeamOneId            { get; set; }
        public virtual Team TeamOne     { get; set; }

        public int TeamTwoId            { get; set; }
        public virtual Team TeamTwo     { get; set; }

        public DateTime Date { get; set; }
    }
}
