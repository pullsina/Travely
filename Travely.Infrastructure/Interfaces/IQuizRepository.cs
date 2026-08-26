using System;
using System.Collections.Generic;
using System.Text;
using Travely.Shared.Entities;

namespace Travely.Infrastructure.Interfaces
{
    public interface IQuizRepository
    {
        Task<Country?> GetQuestionAsync(int questionId);
    }
}
