using System;
using System.Collections.Generic;
using System.Text;
using Travely.Shared.Enums;

namespace Travely.Shared.Entities
{
    public class Country
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Capital { get; set; } = string.Empty;

        public Continent Continent { get; set; }

        public Difficulty Difficulty { get; set; }

        public string Fact { get; set; } = string.Empty;

        public string FlagUrl { get; set; } = string.Empty;

        public string FactUrl { get; set; } = string.Empty;
    }
}
