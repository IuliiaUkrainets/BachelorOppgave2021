using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
    public class AppUser : Person
    {
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<UserPhoto> Photos { get; set; }
    }
}