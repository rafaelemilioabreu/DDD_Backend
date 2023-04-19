using Domain.Entities;
using Domain.Interfaces;
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
        public Task CreateBookAsync(Book book)
        {
             _dbContext.Books.AddAsync(book);
             return _dbContext.SaveChangesAsync();
            
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _dbContext.Books.FindAsync(id);
        }

        public async Task<IEnumerable<Book>> GetAllAsync()
        {
            return await _dbContext.Books.ToListAsync();
        }

        public async Task AddAsync(Book book)
        {
            await _dbContext.Books.AddAsync(book);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Book book)
        {
            _dbContext.Entry(book).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Book book)
        {
            _dbContext.Books.Remove(book);
            await _dbContext.SaveChangesAsync();
        }
    }
}
