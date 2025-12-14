using Microsoft.AspNetCore.Mvc;
using Project.API.Models.Domain;
using Project.API.Models.DTOs;
using Project.API.Repositories.Interface;

namespace Project.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository imageRepository;

        public ImagesController(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }

        private void ValidateFileUpload (IFormFile file)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png", ".webp", "jfif"};
            if (!allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file format.");
            }
            if (file.Length > 10485760)
            {
                ModelState.AddModelError("file", "File size cannot be larger than 10MB.");

            }
        }


        // POST: /api/images
        [HttpPost]
        public async Task<IActionResult> UploadImage
                ([FromForm] IFormFile file, [FromForm] string fileName, [FromForm] string title)
        {
            ValidateFileUpload(file);
            if (ModelState.IsValid)
            {
                // file upload
                var blogImage = new BlogImage
                {
                    FileExtension = Path.GetExtension(file.FileName).ToLower(),
                    FileName = fileName.ToLower().Replace(' ', '-'),
                    Title = title,
                    DateCreated = DateTime.Now
                };

                blogImage = await imageRepository.Upload(file, blogImage);
                if (blogImage is null)
                {
                    return NotFound();
                }

                // Convert Domain Model to DTO
                var response = new BlogImageDTO
                {
                    Id = blogImage.Id,
                    FileName = blogImage.FileName,
                    FileExtension = blogImage.FileExtension,
                    Title = blogImage.Title,
                    Url = blogImage.Url,
                    DateCreated = blogImage.DateCreated
                };

                return Ok(response);
            }
            return BadRequest(ModelState);
        }

        // GET: /api/images
        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            // call repository
            var images = await imageRepository.GetAllAsync();
            // convert domain model to DTO
            var response = new List<BlogImageDTO>();
            foreach (var image in images)
            {
                response.Add(new BlogImageDTO
                {
                    Id = image.Id,
                    FileName = image.FileName,
                    FileExtension = image.FileExtension,
                    Title = image.Title,
                    Url = image.Url,
                    DateCreated = image.DateCreated
                });
            }
            return Ok(response);
        }
    }
}