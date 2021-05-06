using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ImagesController : BaseApiController
    {
        private readonly IMedicalImageRepository _imageRepository;
        public ImagesController(IMedicalImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalImageDTO>>> GetImages()
        {
            var images = await _imageRepository.GetAllMedicalImages();            
            return Ok(images);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalImageDTO>> GetImagesByPatientId(int id)
        {
            var images = await _imageRepository.GetImageByPatientId(id);
            return Ok(images);
        }
    }
}