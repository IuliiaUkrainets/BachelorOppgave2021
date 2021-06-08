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
        private readonly IUnitOfWork _unitOfWork;
        public PatientsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDTO>>> GetPatients([FromQuery] PatientParams patientParams)
        {
            var patients = await _unitOfWork.PatientRepository.GetPatientDtosAsync(patientParams);
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
            return await _unitOfWork.PatientRepository
                .GetPatientByIdAsync(id);
        }
    }
}