using System;
using System.ComponentModel.DataAnnotations;

namespace AirParkWebAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ForeName { get; set; }
        [Required]
        public string SurName { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}