namespace API.DTOs
{
    public class MedicalImageDTO
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int PatientId { get; set; }
    }
}