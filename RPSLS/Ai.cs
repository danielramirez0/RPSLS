using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RPSLS
{
    public class Ai : Player
    {
        //public string name = "Robot";

        public Ai(string name)
            :base(name)
        {
        }

        public override Gesture SelectGesture()
        {
            Console.WriteLine("{0} is selecting a gesture.", name);
            var random = new Random();
            int index = random.Next(gestures.Count);
            return gestures[index];
        }

    }
}
