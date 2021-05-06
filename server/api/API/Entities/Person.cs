using System;

namespace API.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
    }
}