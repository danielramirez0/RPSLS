using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RPSLS
{
    public class Gesture
    {
        // member variables
        public string name;
        public List<string> strengths;
        public List<string> weaknesses;

        public Gesture(string name, List<string> strengths, List<string> weaknesses)
        {
            this.name = name;
            this.strengths = strengths;
            this.weaknesses = weaknesses;
        }
    }
}
