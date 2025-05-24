using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public enum Role{
        Admin,
        Doctor,
        Supplier
    }
    public class User
    {
        [Key]
        public Guid UserId{get;set;}

        [Required]
        public string Name{get;set;}

        [Required]
        public string Email{get;set;}

        [Required]
        public string PasswordHash{get;set;}


        [Required]
        
        public Role Role{get;set;}
    }
}