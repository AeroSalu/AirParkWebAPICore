using AirParkWebAPI.Models;

namespace AirParkWebAPI.Repositories
{
    public class UserRepository : GenericRepository<User>, IUser
    {
        public UserRepository()
        {
            entityCollection = UsersList.Users;
        }
    }
}