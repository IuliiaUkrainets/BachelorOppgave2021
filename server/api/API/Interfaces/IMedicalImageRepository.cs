using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IMedicalImageRepository
    {
        Task<IEnumerable<MedicalImageDTO>> GetAllMedicalImages();
        Task<IEnumerable<MedicalImage>> GetAllMedicalImagesWithPatient();
        Task<IEnumerable<MedicalImageDTO>> GetImageByPatientId(int id);
    }
}