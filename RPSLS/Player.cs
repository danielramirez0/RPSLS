using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RPSLS
{
    public abstract class Player
    {
        public List<Gesture> gestures;
        public int score;
        public string name; 

        public Player (string name)
        {
            this.name = name;
            gestures = new List<Gesture> ();
            score = 0;
            GenerateGestures();
        }

        public void GenerateGestures()
        {
            gestures.Add(new Gesture("rock", new List<string> { "scissors", "lizard" }, new List<string> { "paper", "spock" }));
            gestures.Add(new Gesture("paper", new List<string> { "rock", "spock" }, new List<string> { "scissors", "lizard" }));
            gestures.Add(new Gesture("scissors", new List<string> { "paper", "lizard" }, new List<string> { "rock", "spock" }));
            gestures.Add(new Gesture("lizard", new List<string> { "paper", "spock" }, new List<string> { "scissors", "rock" }));
            gestures.Add(new Gesture("spock", new List<string> { "scissors", "rock" }, new List<string> { "lizard", "paper" }));
        }
        public void increaseScore()
        {
            score++;
        }

        public abstract Gesture SelectGesture();
    }
}
