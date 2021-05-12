using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        public string Practice { get; set; }            
        public ICollection<UserPhotoDTO> Photos { get; set; }
    }
}