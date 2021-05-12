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
        public static async Task SeedUsers(DataContext context, UserManager<AppUser> userManager) 
        {
            if (await userManager.Users.AnyAsync() && await context.Patients.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var patientData = await System.IO.File.ReadAllTextAsync("Data/PatientSeedData.json");
            var patients = JsonSerializer.Deserialize<List<Patient>>(patientData);

            foreach(var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            foreach (var patient in patients)
            {
                context.Patients.Add(patient);
            }
            
            await context.SaveChangesAsync();
        }  
    }
}