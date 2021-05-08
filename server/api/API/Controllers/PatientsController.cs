using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class PatientsController : BaseApiController
    {
        private readonly IPatientRepository _patientRepository;
        public PatientsController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDTO>>> GetPatients([FromQuery] PageParams pageParams)
        {
            var patients = await _patientRepository.GetPatientDtosAsync(pageParams);
            Response.AddPaginationHeader(
                patients.CurrentPage, 
                patients.PageSize, 
                patients.TotalCount, 
                patients.TotalPages);
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatientById(int id)
        {
            return await _patientRepository
                .GetPatientByIdAsync(id);
        }
    }
}