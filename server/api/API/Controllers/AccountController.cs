using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username)) return BadRequest("Username is taken");

            var user = new AppUser
            {
                UserName = registerDTO.Username.ToLower()
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AppUserDTO 
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
            };
        }

        [HttpGet("renew-token")]
        [Authorize]
        public async Task<ActionResult<AppUserDTO>> RenewToken()
        {
            var username = User.GetUsername();

            if (username == null) return Unauthorized("Token cannot be renewed");


            var user = await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(user => user.UserName == username.ToLower());


            if (user == null) return Unauthorized("Invalid username");


            return new AppUserDTO
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.OrderByDescending(x => x.Id).FirstOrDefault()?.Url,
                PhotoId = user.Photos.OrderByDescending(x => x.Id).FirstOrDefault()?.Id
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(user => user.UserName == loginDTO.Username.ToLower());


            if (user == null) return Unauthorized("Invalid username");


            return new AppUserDTO
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.OrderByDescending(x => x.Id).FirstOrDefault()?.Url,
                PhotoId = user.Photos.OrderByDescending(x => x.Id).FirstOrDefault()?.Id
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }
    }
}