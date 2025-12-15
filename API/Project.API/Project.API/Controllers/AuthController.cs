using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project.API.Models.DTOs;
using Project.API.Repositories.Interface;


namespace Project.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository) : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager = userManager;

        // POST: /api/auth/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            var identityUser = await userManager.FindByEmailAsync(request.Email);
            if(identityUser is not null)
            {
                var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.Password);
                if (checkPasswordResult)
                {
                    var roles = await userManager.GetRolesAsync(identityUser);
                    // create a token and response
                    var jwtToken = tokenRepository.CreateJwtToken(identityUser, [.. roles]);


                    var response = new LoginResponseDTO
                    {
                        Email = request.Email,
                        Roles = [.. roles],
                        Token = jwtToken
                    };
                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or password is incorrect.");
            return ValidationProblem(ModelState);
        }




        // POST: /api/auth/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO request)
        {
            // craete IdentityUser object
            var user = new IdentityUser
            {
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim()
            };

            var identityResult = await userManager.CreateAsync(user, request.Password);

            if (identityResult.Succeeded)
            {
                // add role to user
                identityResult = await userManager.AddToRoleAsync(user, "Reader");
                if (identityResult.Succeeded)
                {
                    return Ok();
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach(var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
        
            return ValidationProblem(ModelState);
        }
    }    
}