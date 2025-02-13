using Microsoft.AspNetCore.Identity;

namespace BookApp.Core.Models
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
    }
}
