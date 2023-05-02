using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace yt_logger.Migrations
{
    /// <inheritdoc />
    public partial class changedLogic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RefId",
                table: "Playlists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PlaylistItems",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "RefId",
                table: "PlaylistItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PlaylistItems");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "PlaylistItems");
        }
    }
}
