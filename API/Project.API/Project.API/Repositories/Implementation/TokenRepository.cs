using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Project.API.Repositories.Interface;

namespace Project.API.Repositories.Implementation
{
    public class TokenRepository(IConfiguration configuration) : ITokenRepository
    {
        private readonly IConfiguration configuration = configuration;

        string ITokenRepository.CreateJwtToken(IdentityUser user, List<string> roles)
        {
            //create claims
            var claims = new List<Claim>
            {
                new(ClaimTypes.Email, user.Email!)
            };
            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            // jwt security token params
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
            );

            // return token
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}