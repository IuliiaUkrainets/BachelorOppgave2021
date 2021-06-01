using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
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

        public async Task<PagedList<PatientDTO>> GetPatientDtosAsync(PatientParams patientParams)
        {
            var query = _context.Patients.AsQueryable();

            if (patientParams.Search != null)
            {
                query = query
                .Where(p => p.LastName.ToLower().Contains(patientParams.Search.ToLower())
                        || p.FirstName.ToLower().Contains(patientParams.Search.ToLower())
                        || p.Middlename.ToLower().Contains(patientParams.Search.ToLower())
                        || p.SSN.Contains(patientParams.Search)
                        || p.Email.ToLower().Contains(patientParams.Search.ToLower())
                        || p.PhoneNumber.ToLower().Contains(patientParams.Search.ToLower())
                        );
            }

            return await PagedList<PatientDTO>.CreateAsync(
                query.ProjectTo<PatientDTO>
                (
                    _mapper.ConfigurationProvider).AsNoTracking(),
                    patientParams.PageNumber,
                    patientParams.PageSize
                );
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
        public void Update(Patient patient)
        {
            throw new System.NotImplementedException();
        }
    }
}