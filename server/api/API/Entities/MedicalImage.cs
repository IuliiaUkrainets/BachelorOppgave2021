using System;

namespace API.Entities
{
    public class MedicalImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public Patient Patient { get; set; }
        public int PatientId { get; set; }      
        public DateTime Taken { get; set; }
    }
}