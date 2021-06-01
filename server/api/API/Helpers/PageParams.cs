namespace API.Helpers
{
    public class PageParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        public int _pageSize { get; set; } = 10;

        public int PageSize 
        { 
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;    
        }

        public string SSN { get; set; } = null;
        public string LastName { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }  
    }
}