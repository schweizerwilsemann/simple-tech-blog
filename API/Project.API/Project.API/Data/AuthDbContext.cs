using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Project.API.Data
{
    public class AuthDbContext(DbContextOptions<AuthDbContext> options) : IdentityDbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "771c2377-96a8-4122-9dd0-e9bd30fde9b7";
            var writerRoleId = "2d374abc-2c04-4465-848f-49f31f31dcfa";
            // craete reader and writer role
            var roles = new List<IdentityRole>
            {
                new()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                new()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                }
            };

            // seed the role
            builder.Entity<IdentityRole>().HasData(roles);

            // create admin user

            var adminUserId = "037721da-60cd-4766-8ecc-4ab0ec189285";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin@admin.com",
                Email = "admin@admin.com",
                NormalizedEmail = "admin@admin.com".ToUpper(),
                NormalizedUserName = "admin@admin.com".ToUpper(),
                PasswordHash = "AQAAAAIAAYagAAAAELe36+6MvN+Jyl90GTj3A8f3/n8a+aG/a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p==",
                SecurityStamp = adminUserId,
                ConcurrencyStamp = adminUserId
            };

            builder.Entity<IdentityUser>().HasData(admin);

            // give role to admin
            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId
                }
            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }
    }
}