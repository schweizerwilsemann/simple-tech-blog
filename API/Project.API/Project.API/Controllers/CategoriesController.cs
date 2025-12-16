using Microsoft.AspNetCore.Mvc;
using Project.API.Models.DTOs;
using Project.API.Models.Domain;
using Project.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;


namespace Project.API.Controllers
{
    // http://localhost:xxxx/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(ICategoryRepository categoryRepo) : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo = categoryRepo;

        [HttpPost]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDTO request)
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

        // GET: /api/categories/{id}
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute]Guid id)
        {
            var existingCategory = await _categoryRepo.GetById(id);
            if (existingCategory is null)
            {
                return NotFound();
            }

            var response = new CategoryDTO
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name!,
                UrlHandle = existingCategory.UrlHandle!
            };
            return Ok(response);
        }

        // PUT: /api/categories/{id}
        [HttpPut]
        [Route("{id:guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> EditCategory ([FromRoute] Guid id, UpdateCategoryRequestDTO request)
        {
            // convert DTO to domain 
            var category = new Category
            {
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };
            category = await _categoryRepo.UpdateAsync(category);
            if(category == null)
            {
                return NotFound();
            }

            // convert domain to DTO
            var response = new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(response);
        }
        // DELETE: /api/categories/{id}
        [HttpDelete]
        [Route("{id:guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            var category = await _categoryRepo.DeleteAsync(id);
            if(category is null)
            {
                return NotFound();
            }

            // convert domain model to DTO
            var response = new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(response);
        }
    }
}
