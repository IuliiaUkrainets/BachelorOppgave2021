namespace API.DTOs
{
    public class AppUserDTO
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public int? PhotoId { get; set; } 
    }
}