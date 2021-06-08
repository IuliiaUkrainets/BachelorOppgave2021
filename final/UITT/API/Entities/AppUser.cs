using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        public string Practice { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<UserPhoto> Photos { get; set; }
        public ICollection<Message> MessagessSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }           
    }
}