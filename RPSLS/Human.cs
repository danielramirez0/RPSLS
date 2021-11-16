using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RPSLS
{
    public class Human : Player
    {
        //public string name;
        public Human(string name)
            :base(name)
        {
            //this.name = name;
        }

        public override Gesture SelectGesture()
        {
            Console.WriteLine("{0}, select your gesture", name);
            for (int i = 0; i < gestures.Count; i++)
            {
                Console.WriteLine("{0}: {1}", i, gestures[i].name);
            }
            int selection = int.Parse(Console.ReadLine());
            return gestures[selection];
        }
    }
}
