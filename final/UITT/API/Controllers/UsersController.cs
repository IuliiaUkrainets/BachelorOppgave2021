using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using API.Extensions;
using System.Linq;
using API.Helpers;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        private readonly IPhotoService _photoService;
        public UsersController(IUnitOfWork unitOfWork, IPhotoService photoService, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _photoService = photoService;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers([FromQuery] UserParams userParams)
        {
            userParams.CurrentUsername = User.GetUsername();

            var users = await _unitOfWork.UserRepository.GetUserDtosAsync(userParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<UserDTO>> GetUser(string username)
        {
            return await _unitOfWork.UserRepository.GetUserDtoAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserUpdateDTO userUpdateDTO)
        {
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            _mapper.Map(userUpdateDTO, user);

            _unitOfWork.UserRepository.Update(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<UserPhotoDTO>> AddPhoto(IFormFile file)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new UserPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            user.Photos.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<UserPhotoDTO>(photo));
            }

            return BadRequest("Problem adding photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to Delete the Photo");
        }

    }
}