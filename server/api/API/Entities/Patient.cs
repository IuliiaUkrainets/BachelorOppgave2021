using System.Collections.Generic;

namespace API.Entities
{
    public class Patient : Person
    {
        public string SSN { get; set; }
        public string FirstName { get; set; }
        public string Middlename { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ExtraInfo { get; set; }
        public ICollection<MedicalImage> Images { get; set; }
    }
}