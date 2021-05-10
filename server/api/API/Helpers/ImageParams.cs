namespace API.Helpers
{
    public class ImageParams
    {
        private const int MaxPageSize = 20;
        public int PageNumber { get; set; } = 1;
        public int _pageSize { get; set; } = 20;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string SSN { get; set; } = null;
        public string LastName { get; set; }
    }
}