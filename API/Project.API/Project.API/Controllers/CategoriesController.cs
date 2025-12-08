using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.API.Models.DTOs;
using Project.API.Models.Domain;
using Project.API.Data;
using Project.API.Repositories.Interface;


namespace Project.API.Controllers
{
    // http://localhost:xxxx/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;
        public CategoriesController(ICategoryRepository categoryRepo) {
            this._categoryRepo = categoryRepo;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDTO request)
        {
            // map DTO to Domain model
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await _categoryRepo.CreateAsync(category);


            // Domain model To DTO
            var response = new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name, 
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }
    
        // GET: /api/gategories
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryRepo.GetAllAsync();

            // map domain model to DTO
            var response = new List<CategoryDTO>();
            foreach(var category in categories)
            {
                var dto = new CategoryDTO
                {
                    Id = category.Id,
                    Name = category.Name!,
                    UrlHandle = category.UrlHandle!
                };
                response.Add(dto);
            }

            return Ok(response);
        }
    }
}
