using Microsoft.EntityFrameworkCore;
using Project.API.Data;
using Project.API.Models.Domain;
using Project.API.Repositories.Interface;

namespace Project.API.Repositories.Implementation
{
    public class ImageRepository : IImageRepository
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ApplicationDbContext dbContext;

        public ImageRepository(IWebHostEnvironment webHostEnvironment,
                                IHttpContextAccessor httpContextAccessor,
                                ApplicationDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }

        public Task<BlogImage?> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<BlogImage>> GetAllAsync()
        {   
            return await dbContext.BlogImages.OrderByDescending(x => x.DateCreated).ToListAsync();
        }

        public Task<BlogImage?> GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<BlogImage?> Upload(IFormFile file, BlogImage blogImage)
        {
            // upload to api/images folder - just simple
            var localPath = Path
                            .Combine(webHostEnvironment.ContentRootPath,
                                "Images", $"{blogImage.FileName}-{blogImage.Id}{blogImage.FileExtension}");
            using var stream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(stream);

            // update database
            // somwthings like: https:xxx.com/images/filename.jpg

            var httpRequest = httpContextAccessor.HttpContext?.Request;
            if (httpRequest is null)
            {
                return null;
            }
            var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/images/{blogImage.FileName}-{blogImage.Id}{blogImage.FileExtension}";

            blogImage.Url = urlPath;

            await dbContext.BlogImages.AddAsync(blogImage);
            await dbContext.SaveChangesAsync();
            return blogImage;

        }
    }
}