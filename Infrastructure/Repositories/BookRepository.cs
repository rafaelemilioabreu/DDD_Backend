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
        public  async Task<Book> CreateAsync(Book book)
        {
            try
            {
                await _dbContext.Book.AddAsync(book);
                await _dbContext.SaveChangesAsync();


                return book;
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating book.", ex);
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



        public async Task<Book> UpdateAsync(Book book)
        {
            try
            {
                
                _dbContext.Entry(book).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return book;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the book in the database.", ex);
            }
        }

        public async Task<Book> DeleteAsync(Book book)
        {
            try
            {
                _dbContext.Set<Book>().Remove(book);
                await _dbContext.SaveChangesAsync();
                return book;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the book from the database.", ex);
            }
        }
    }
}
