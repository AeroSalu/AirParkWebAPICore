using System;
using System.Collections.Generic;
using System.Linq;
using AirParkWebAPI.Models;

namespace AirParkWebAPI.Repositories
{
    public abstract class GenericRepository<T> : IGeneric<T>
        where T : User, new()
    {
        protected List<T> entityCollection { get; set; }

        public T Add(T entity)
        {
            var maxEntity = 0;
            if (entityCollection.Count > 0)
            {
                maxEntity = entityCollection.Max<T>(u => u.Id);
            }
            entity.Id = maxEntity + 1;
            entity.CreatedDate = DateTime.UtcNow;
            entity.UpdatedDate = DateTime.UtcNow;
            entityCollection.Add(entity);
            return entity;
        }

        public bool Delete(int Id)
        {
            T entity = Get(Id);
            if(entity != null)
            {
                entityCollection.Remove(entity);
                return true;
            }
            return false;
        }

        public IQueryable<T> GetAll()
        {
            return entityCollection.AsQueryable();
        }

        public T Get(int Id)
        {
            return entityCollection.Find(e => e.Id == Id);
        }

        public T Update(T entity)
        {
            T _entity = Get(entity.Id);
            if (_entity == null)
            {
                return null;
            }

            entityCollection.Remove(_entity);

            entity.UpdatedDate = DateTime.UtcNow;
            entityCollection.Add(entity);

            return entity;
        }
    }
}