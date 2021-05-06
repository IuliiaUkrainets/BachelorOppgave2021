using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PatientRepository : IPatientRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PatientRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<PatientDTO>> GetPatientsAsync()
        {
            return await _context.Patients
                .ProjectTo<PatientDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<Patient> GetPatientByIdAsync(int id)
        {
            return await _context.Patients.FindAsync(id);
        }

        public Task<Patient> GetPatientByLastnameAsync(string lastname)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Patient> GetPatientBySSN(string ssn)
        {
            return await _context.Patients
                .Include(p => p.Images)
                .SingleOrDefaultAsync(patient => patient.SSN == ssn);
        }

        public Task<Patient> GetPatientBySSNAsync(string SSN)
        {
            throw new System.NotImplementedException();
        }

        public Task<Patient> GetPatientDtoAsync(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Patient>> GetPatientDtosAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(Patient patient)
        {
            throw new System.NotImplementedException();
        }

        /*  public async Task<UserDTO> GetUserDtoAsync(string username)
         {
             return await _context.Users
                     .Where(x => x.UserName == username)
                     .ProjectTo<UserDTO>(_mapper.ConfigurationProvider)
                     .SingleOrDefaultAsync();
         }

         public async Task<IEnumerable<UserDTO>> GetUserDtosAsync()
         {
             return await _context.Users
                 .ProjectTo<UserDTO>(_mapper.ConfigurationProvider)
                 .ToListAsync();
         }

         public async Task<IEnumerable<AppUser>> GetUsersAsync()
         {
             return await _context.Users
                 .Include(p => p.Photos)
                 .ToListAsync();
         }

         public async Task<bool> SaveAllAsync()
         {
             return await _context.SaveChangesAsync() > 0;
         }

         public void Update(AppUser user)
         {
             _context.Entry(user).State = EntityState.Modified;
         } */
    }
}