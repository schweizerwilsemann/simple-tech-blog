using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.API.Data;
using Project.API.Models.Domain;
using Project.API.Repositories.Interface;

namespace Project.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _dbContext.Categories.AddAsync(category);
            await _dbContext.SaveChangesAsync();

            return category;
        }

        public async Task<IEnumerable<Category>> GetAllAsync(string ? query = null, string? sortBy = null,
                                                                string? sortDirection = null, int? pageNumber = 1, int? pageSize = 100)
        {
            // query 
            var categories = _dbContext.Categories.AsQueryable();

            // filtering
            if(string.IsNullOrWhiteSpace(query) == false)
            {
                categories = categories.Where(x => x.Name!.Contains(query));
            }

            // sorting
            if(string.IsNullOrWhiteSpace(sortBy) == false)
            {
                if(string.Equals(sortBy, "Name", StringComparison.OrdinalIgnoreCase))
                {
                    var isAsc = string.Equals(sortDirection, "asc", StringComparison.OrdinalIgnoreCase) ? true : false;
                    categories = isAsc ? categories.OrderBy(x => x.Name) : categories.OrderByDescending(x => x.Name);
                }

                if(string.Equals(sortBy, "URL", StringComparison.OrdinalIgnoreCase))
                {
                    var isAsc = string.Equals(sortDirection, "asc", StringComparison.OrdinalIgnoreCase) ? true : false;
                    categories = isAsc ? categories.OrderBy(x => x.UrlHandle) : categories.OrderByDescending(x => x.UrlHandle);
                }
            }
            
            
            // pagination
            // pageNumber = 1, pageSize = 5 - skip 0 take 5
            // pageNumber = 2, pageSize = 5 - skip 5 take 5
            // pageNumber = 3, pageSize = 5 - skip 10 take 5
            
            var skipResults = (pageNumber - 1) * pageSize;
            categories = categories.Skip(skipResults ?? 0).Take(pageSize ?? 100);

            return await categories.ToListAsync();
            // return await _dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetById([FromRoute] Guid categoryId)
        {
            return await _dbContext.Categories.FirstOrDefaultAsync(category => category.Id == categoryId);
        }

        public async Task<Category?> UpdateAsync(Category category)
        {
            var existingCategory = await _dbContext.Categories.FirstOrDefaultAsync(x => x.Id == category.Id);
            if (existingCategory != null) {
                _dbContext.Entry(existingCategory).CurrentValues.SetValues(category);
                await _dbContext.SaveChangesAsync();
                return category;
            }
            return null;
        }
        public async Task<Category?> DeleteAsync(Guid id)
        {
            var existingCategory = await _dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if(existingCategory is null)
            {
                return null;
            }
            _dbContext.Categories.Remove(existingCategory);
            await _dbContext.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<int> GetCategoryTotal()
        {
            return await _dbContext.Categories.CountAsync();
        }
    }
}
