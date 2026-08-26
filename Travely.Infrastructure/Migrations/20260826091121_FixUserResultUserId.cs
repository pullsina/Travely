using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Travely.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixUserResultUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserResults_AspNetUsers_UserId1",
                table: "UserResults");

            migrationBuilder.DropIndex(
                name: "IX_UserResults_UserId1",
                table: "UserResults");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "UserResults");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserResults",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_UserResults_UserId",
                table: "UserResults",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserResults_AspNetUsers_UserId",
                table: "UserResults",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserResults_AspNetUsers_UserId",
                table: "UserResults");

            migrationBuilder.DropIndex(
                name: "IX_UserResults_UserId",
                table: "UserResults");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "UserResults",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "UserResults",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserResults_UserId1",
                table: "UserResults",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserResults_AspNetUsers_UserId1",
                table: "UserResults",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
