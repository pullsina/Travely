using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Travely.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProgressFieldsToUserResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Continent",
                table: "UserResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Difficulty",
                table: "UserResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsCorrect",
                table: "UserResults",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "QuestionId",
                table: "UserResults",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsedHintsCount",
                table: "UserResults",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Continent",
                table: "UserResults");

            migrationBuilder.DropColumn(
                name: "Difficulty",
                table: "UserResults");

            migrationBuilder.DropColumn(
                name: "IsCorrect",
                table: "UserResults");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "UserResults");

            migrationBuilder.DropColumn(
                name: "UsedHintsCount",
                table: "UserResults");
        }
    }
}
