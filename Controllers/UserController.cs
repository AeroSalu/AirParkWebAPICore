using AirParkWebAPI.Models;
using AirParkWebAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AirParkWebAPI.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUser _userRepository;

        public UserController(IUser userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet("list")]
        public IEnumerable<User> GetAllUsers()
        {
            return _userRepository.GetAll();
        }

        // GET: api/User/5
        [HttpGet]
        public IActionResult GetUser(int id)
        {
            var user = _userRepository.Get(id);
            if (User == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/User
        [HttpPost]
        public IActionResult AddUser([FromBody]User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userRepository.Add(model);

            return Ok(user);

        }

        // PUT: api/User/5
        [HttpPut]
        public IActionResult UpdateUser([FromBody]User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userRepository.Update(model);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // DELETE: api/User/5
        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            var result = _userRepository.Delete(id);

            if (result == false)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
