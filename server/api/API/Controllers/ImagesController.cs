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
    public class ImagesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ImagesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalImageDTO>>> GetImages([FromQuery] ImageParams imageParams)
        {
            var images = await _unitOfWork.MedicalImageRepository.GetImageDtosAsync(imageParams);
            Response.AddPaginationHeader(
                images.CurrentPage,
                images.PageSize,
                images.TotalCount,
                images.TotalPages);
            return Ok(images);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalImageDTO>> GetImagesByPatientId(int id)
        {
            var images = await _unitOfWork.MedicalImageRepository.GetImageByPatientId(id);
            return Ok(images);
        }
    }
}