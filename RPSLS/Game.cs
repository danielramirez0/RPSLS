using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RPSLS
{
    public class Game
    {
        bool useAi = true;
        int rounds;
        string winner;
        Player player1;
        Player player2;

        public Game()
        {
        }
        // public Game(bool useAi, int rounds, Player player1, Player player2)
        //{
        //    this.useAi = useAi;
        //    this.rounds = rounds;
        //    this.player1 = player1;
        //    this.player2 = player2;
        //}
        public void RunGame()
        {
            DisplayWelcome();
            DisplayRules();
            GetMode();
            RoundCount();
            Start();
            DisplayWinner();
        }

        public void DisplayWelcome()
        {
            Console.WriteLine("Welcome to Rock Paper Scissor Lizard Spock!");
        }

        public void DisplayRules()
        {
            Console.WriteLine("The game RPSLS is just like Rock Paper Scissors, however there are now five options to choose from!\nRules:\nRock beats Scissor and Lizard\nPaper beats Rock and Spock\nScissor beats Paper and Lizard\nLizard beats Spock and Paper\nSpock beats Scissors and Rock");

        }
        public void GetMode()
        {
            string request = "Please select the game mode:\n1: Play versus an AI\n2: Play versus a friend\n";
            Console.WriteLine(request);
            int gameMode = int.Parse(Console.ReadLine());
            if (gameMode == 2)
            {
                useAi = true;
            }
        }
        public void RoundCount()
        {
            string request = "How many rounds would you like to play?\n";
            Console.WriteLine(request);
            rounds = int.Parse((Console.ReadLine()));
        }
        public void Start()
        {
            Console.WriteLine("Player one, enter your name:");
            string p1 = Console.ReadLine();
            player1 = new Human(p1);
            if (useAi == true)
            {
                player2 = new Ai("ROBOCOP");
            }
            else
            {
                Console.WriteLine("Player two, enter your name:");
                string p2 = Console.ReadLine();
                player2 = new Human(p2);
            }

            while (true)
            {
                Gesture playerOneGesture = player1.SelectGesture();
                Gesture playerTwoGesture = player2.SelectGesture();

                Console.WriteLine("{0} chose {1}", player1.name, playerOneGesture.name);
                Console.WriteLine("{0} chose {1}", player2.name, playerTwoGesture.name);

                string roundResult;

                if (playerOneGesture == playerTwoGesture)
                {
                    roundResult = "Tie";
                }
                else if (playerOneGesture.strengths.Contains(playerTwoGesture.name))
                {
                    roundResult = player1.name + " wins this round.";
                    player1.increaseScore();
                }
                else
                {
                    roundResult = player2.name + " wins this round.";
                    player2.increaseScore();
                }

                Console.WriteLine(roundResult);

                if ((double)player1.score / rounds > .5)
                {
                    winner = player1.name;
                    break;
                }
                else if ((double)player2.score / rounds > .5)
                {
                    winner = player2.name;
                    break;
                }
                
            }
        }
        public void DisplayWinner()
        {
            Console.WriteLine("{0} has won the set of {1} round(s)", winner, rounds);
        }
    }

}
