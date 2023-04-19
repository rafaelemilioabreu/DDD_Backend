using Application.IServices;
using Domain.Entities;
using Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
        public async Task<Book> CreateBookAsync(Book book)
        {
            try
            {
                
               return await _bookRepository.CreateAsync(book);
               
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding book", ex);
            }

        }

        public async Task<Book> DeleteBookAsync(Book book)
        {
            try
            {
                var existingBook = await _bookRepository.GetByIdAsync(book.Id);
                if (existingBook == null)
                {
                    throw new Exception($"Book with ID {book.Id} not found");
                }

               return await _bookRepository.DeleteAsync(existingBook);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting book with ID {book.Id}", ex);
            }
        }

        public async Task<Book> GetBookAsync(int id)
        {
            try
            {
                var book = await _bookRepository.GetByIdAsync(id);
                if (book == null)
                {
                    throw new Exception($"Book with ID {id} not found");
                }

                return book;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error getting book with ID {id}", ex);
            }
        }

        public async Task<IEnumerable<Book>> GetBooksAsync()
        {
            try
            {
                var books = await _bookRepository.GetAllAsync();
                return books;
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting all books", ex);
            }
        }

        public async Task<Book> UpdateBookAsync(Book book)
        {
            try
            {

               return await _bookRepository.UpdateAsync(book);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating book with ID {book.Id}", ex);
            }
        }
    }
}
