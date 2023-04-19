using Domain.Entities;
using Domain.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly MainDbContext _dbContext;

        public BookRepository(MainDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task CreateAsync(Book book)
        {
            try
            {
                await _dbContext.Set<Book>().AddAsync(book);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while creating the book in the database.", ex);
            }

        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            try
            {
                return await _dbContext.Set<Book>().FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the book from the database.", ex);
            }
        }

        public async Task<IEnumerable<Book>> GetAllAsync()
        {
            try
            {
                return await _dbContext.Set<Book>().ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the books from the database.", ex);
            }
        }



        public async Task UpdateAsync(Book book)
        {
            try
            {
                _dbContext.Entry(book).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the book in the database.", ex);
            }
        }

        public async Task DeleteAsync(Book book)
        {
            try
            {
                _dbContext.Set<Book>().Remove(book);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the book from the database.", ex);
            }
        }
    }
}
