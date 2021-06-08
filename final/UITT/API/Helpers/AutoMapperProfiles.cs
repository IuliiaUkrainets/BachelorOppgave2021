using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserDTO>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<UserPhoto, UserPhotoDTO>();
            CreateMap<AppUser, RegisterDTO>();
            CreateMap<RegisterDTO, AppUser>();
            CreateMap<UserUpdateDTO, AppUser>();
            CreateMap<MedicalImage, MedicalImageDTO>();
            CreateMap<Patient, PatientDTO>();
        }
    }
}