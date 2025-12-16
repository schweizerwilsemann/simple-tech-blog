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

        public async Task<IEnumerable<Category>> GetAllAsync(string ? query = null)
        {
            // query 
            var categories = _dbContext.Categories.AsQueryable();
            if(query is null)
                Console.WriteLine("Query is null");

            else Console.WriteLine(query);

            // filtering
            if(string.IsNullOrWhiteSpace(query) == false)
            {
                categories = categories.Where(x => x.Name!.Contains(query));
            }

            // sorting
            
            // pagination

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
    }
}
