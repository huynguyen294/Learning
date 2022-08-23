using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LearnBasic
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] cars = new string[7];
            cars[6] = "A";
            foreach(String car in cars)
            {
                Console.WriteLine(car);
            }
            Console.ReadLine();
        }
    }
}
