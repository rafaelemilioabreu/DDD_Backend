using Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Validations
{
    public class BookValidator : AbstractValidator<Book>
    {
        public BookValidator() {

            RuleFor(b => b.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

            RuleFor(b => b.Author)
                .NotEmpty().WithMessage("Author is required.")
                .MaximumLength(100).WithMessage("Author must not exceed 100 characters.");

            RuleFor(b => b.Publisher)
                .NotEmpty().WithMessage("Publisher is required.")
                .MaximumLength(100).WithMessage("Publisher must not exceed 100 characters.");

            RuleFor(b => b.Year)
                .NotEmpty().WithMessage("Year is required.")
                .Must(BeAValidDate).WithMessage("Year must be a valid date.");
        }

        private bool BeAValidDate(DateTime date)
        {
            return !date.Equals(default(DateTime));
        }

    
    }
}
