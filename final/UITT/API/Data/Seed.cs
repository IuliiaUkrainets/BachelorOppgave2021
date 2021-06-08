using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context, 
            UserManager<AppUser> userManager, RoleManager<AppRole> roleManager) 
        {
            if (await userManager.Users.AnyAsync() && await context.Patients.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var patientData = await System.IO.File.ReadAllTextAsync("Data/PatientSeedData.json");
            var patients = JsonSerializer.Deserialize<List<Patient>>(patientData);

            var roles = new List<AppRole>
            {
                new AppRole{ Name = "User"},
                new AppRole{ Name = "Admin"},
                new AppRole{ Name = "Moderator"}
            };

            foreach (var role in roles) 
            {
                await roleManager.CreateAsync(role);
            }

            foreach(var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "User");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new [] {"Admin", "Moderator"});

            foreach (var patient in patients)
            {
                context.Patients.Add(patient);
            }
            
            await context.SaveChangesAsync();
        }  
    }
}