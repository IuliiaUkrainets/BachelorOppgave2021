using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MedicalImageRepository : IMedicalImageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MedicalImageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<MedicalImageDTO>> GetAllMedicalImages()
        {
            return await _context.MedicalImages
                .ProjectTo<MedicalImageDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<MedicalImageDTO>> GetImageByPatientId(int id)
        {
            return await _context.MedicalImages
                    .ProjectTo<MedicalImageDTO>(_mapper.ConfigurationProvider)
                    .Where(i => i.PatientId == id)
                    .ToListAsync();
        }
    }
}