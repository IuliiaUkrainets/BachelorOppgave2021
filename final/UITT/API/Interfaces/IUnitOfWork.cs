using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMedicalImageRepository MedicalImageRepository { get; }
        IPatientRepository PatientRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}