using System;
using System.Collections.Generic;
using System.Text;
using Travely.Infrastructure.Interfaces;
using Travely.Shared.Entities;

namespace Travely.Infrastructure.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        public Task<Country?> GetQuestionAsync(int questionId)
        {
            throw new NotImplementedException();
        }
    }
}
