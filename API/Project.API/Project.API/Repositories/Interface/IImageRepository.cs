using Project.API.Models.Domain;

namespace Project.API.Repositories.Interface
{
    public interface IImageRepository
    {
        Task<BlogImage?> Upload(IFormFile file, BlogImage blogImage);
    }
}
