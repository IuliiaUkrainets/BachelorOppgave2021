using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPatientRepository
    {
        void Update(Patient patient);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<PatientDTO>> GetPatientsAsync(); 
        Task<Patient> GetPatientByIdAsync(int id);
        Task<Patient> GetPatientByLastnameAsync(string lastname);
        Task<Patient> GetPatientBySSNAsync(string SSN);
        Task<PagedList<PatientDTO>> GetPatientDtosAsync(PageParams pageParams);
        Task<Patient> GetPatientDtoAsync(string username);
    }
}