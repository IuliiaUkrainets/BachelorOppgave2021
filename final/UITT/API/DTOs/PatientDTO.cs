using System;

namespace API.DTOs
{
    public class PatientDTO
    {
        public int Id { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string SSN { get; set; }
        public string FirstName { get; set; }
        public string Middlename { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ExtraInfo { get; set; }
    }
}