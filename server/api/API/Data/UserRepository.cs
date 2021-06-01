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
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(user => user.UserName == username);
        }

        public async Task<UserDTO> GetUserDtoAsync(string username)
        {
            return await _context.Users
                    .Where(x => x.UserName == username)
                    .ProjectTo<UserDTO>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync();
        }

        public async Task<PagedList<UserDTO>> GetUserDtosAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.UserName.ToLower() != "admin");

            query = userParams.OrderBy switch 
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            if (userParams.Search != null)
            {
                query = query
                .Where(u => u.LastName.ToLower().Contains(userParams.Search.ToLower())
                        || u.FirstName.ToLower().Contains(userParams.Search.ToLower())
                        || u.Category.ToLower().Contains(userParams.Search.ToLower())
                        );
            }
            
            
            return await PagedList<UserDTO>.CreateAsync(
                query.ProjectTo<UserDTO>(_mapper.ConfigurationProvider).AsNoTracking(), 
                userParams.PageNumber, 
                userParams.PageSize);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }           
        
        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}