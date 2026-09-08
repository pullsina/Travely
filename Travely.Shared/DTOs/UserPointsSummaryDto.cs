namespace Travely.Shared.DTOs
{
    public class UserPointsSummaryDto
    {
        public int TotalPoints { get; set; }
        public List<ContinentPointsDto> Continents { get; set; } = new();
    }
}
