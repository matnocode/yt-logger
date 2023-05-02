using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace yt_logger.Migrations
{
    /// <inheritdoc />
    public partial class removedItemCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemCount",
                table: "Logs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItemCount",
                table: "Logs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
