using Microsoft.AspNetCore.Identity;

namespace Project.API.Repositories.Interface
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user, List<string> role);
    }
}