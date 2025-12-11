using Microsoft.AspNetCore.Mvc;
using Project.API.Models.DTOs;
using Project.API.Models.Domain;
using Project.API.Repositories.Interface;
using CodePulse.API.Models.DTO;


namespace Project.API.Controllers
{
    // http://localhost:xxxx/api/blogposts
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository _blogPostRepo;
        private readonly ICategoryRepository _categoryRepo;

        public BlogPostsController(IBlogPostRepository blogPostRepo, ICategoryRepository categoryRepo)
        {
            this._blogPostRepo = blogPostRepo;
            this._categoryRepo = categoryRepo;
        }


        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDTO request)
        {
            // convert DTO to domain model
            var blogPost = new BlogPost
            {
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
                Author = request.Author,
                IsVisible = request.IsVisible,
                Categories = []
            };

            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await _categoryRepo.GetById(categoryGuid);
                if (existingCategory is not null)
                {   
                    blogPost.Categories.Add(existingCategory);
                }

            }

            blogPost = await _blogPostRepo.CreateAsync(blogPost);

            // convert domain model to DTO
            var response = new BlogPostDTO
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedDate = blogPost.PublishedDate,
                Author = blogPost.Author,
                IsVisible = blogPost.IsVisible,
                Categories = [
                    .. blogPost?.Categories?
                        .Select(x => new CategoryDTO
                        {
                            Id = x.Id,
                            Name = x.Name,
                            UrlHandle = x.UrlHandle
                        })
                        ?? Enumerable.Empty<CategoryDTO>()
                ]

            };
            return Ok(response);
        }   
    
        // GET: /api/blogposts
        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            var blogPosts = await _blogPostRepo.GetAllAsync();
            // convert domain model to DTO
            
            var response = new List<BlogPostDTO>();
            foreach(var blogPost in blogPosts)
            {
                response.Add(new BlogPostDTO
                {
                    Id = blogPost.Id,
                    Title = blogPost.Title,
                    ShortDescription = blogPost.ShortDescription,
                    Content = blogPost.Content,
                    FeaturedImageUrl = blogPost.FeaturedImageUrl,
                    UrlHandle = blogPost.UrlHandle,
                    PublishedDate = blogPost.PublishedDate,
                    Author = blogPost.Author,
                    IsVisible = blogPost.IsVisible,
                    Categories = [
                    .. blogPost?.Categories?
                        .Select(x => new CategoryDTO
                        {
                            Id = x.Id,
                            Name = x.Name,
                            UrlHandle = x.UrlHandle
                        })
                        ?? Enumerable.Empty<CategoryDTO>()
                    ]
                });
            }
            return Ok(response);
        }

    }
}
