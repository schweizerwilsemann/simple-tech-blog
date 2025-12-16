using Microsoft.AspNetCore.Mvc;
using Project.API.Models.DTOs;
using Project.API.Models.Domain;
using Project.API.Repositories.Interface;
using Project.API.Models.DTO;
using Microsoft.AspNetCore.Authorization;


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
        [Authorize(Roles = "Writer")]
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
                        ?? []
                    ]
                });
            }
            return Ok(response);
        }

        // GET /api/blogposts/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
        {
            var blogPost = await _blogPostRepo.GetById(id);
            if (blogPost is null)
            {
                return NotFound();
            }

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
                    ?? []
                ]
            };
            return Ok(response);
        }

        //GET: /api/blogposts/{urlHandle}      
        [HttpGet]
        [Route("{urlHandle}")]      
        public async Task<IActionResult>GetBlogPostByUrlHandle([FromRoute] string urlHandle)
        {
            var blogPost = await _blogPostRepo.GetByUrlHandleAsync(urlHandle);
            if (blogPost is null)
            {
                return NotFound();
            }
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
                    ?? []
                ]
            };
            return Ok(response);
        }


        // PUT: /api/blogposts/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> UpdateBlogPostById([FromRoute] Guid id, UpdateBlogPostRequestDTO request)
        {
            // convert DTO to domain model
            var blogPost = new BlogPost
            {
                Id = id,
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
                if(existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }
            var updatedBlogPost = await _blogPostRepo.UpdateAsync(blogPost);
            if(updatedBlogPost == null)
            {
                return NotFound();
            }

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
   
        // DELETE: /api/blogposts/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteBlogPostById([FromRoute] Guid id)
        {
            var deletedBlogPost = await _blogPostRepo.DeleteAsync(id);
            if(deletedBlogPost is null)
            {
                return NotFound();
            }

            var response = new BlogPostDTO
            {
                Id = id,
                Title = deletedBlogPost.Title,
                ShortDescription = deletedBlogPost.ShortDescription,
                Content = deletedBlogPost.Content,
                FeaturedImageUrl = deletedBlogPost.FeaturedImageUrl,
                UrlHandle = deletedBlogPost.UrlHandle,
                PublishedDate = deletedBlogPost.PublishedDate,
                Author = deletedBlogPost.Author,
                IsVisible = deletedBlogPost.IsVisible,
            };
            return Ok(response);
        }
    }
}
