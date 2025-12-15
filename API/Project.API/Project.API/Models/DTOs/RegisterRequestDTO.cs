namespace Project.API.Models.DTOs
{
    public class RegisterRequestDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }

    }
}