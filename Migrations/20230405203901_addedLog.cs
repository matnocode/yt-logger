using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace yt_logger.Migrations
{
    /// <inheritdoc />
    public partial class addedLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LogId",
                table: "PlaylistItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LogId1",
                table: "PlaylistItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeStamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RefId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistItems_LogId",
                table: "PlaylistItems",
                column: "LogId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistItems_LogId1",
                table: "PlaylistItems",
                column: "LogId1");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistItems_Logs_LogId",
                table: "PlaylistItems",
                column: "LogId",
                principalTable: "Logs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistItems_Logs_LogId1",
                table: "PlaylistItems",
                column: "LogId1",
                principalTable: "Logs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistItems_Logs_LogId",
                table: "PlaylistItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistItems_Logs_LogId1",
                table: "PlaylistItems");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropIndex(
                name: "IX_PlaylistItems_LogId",
                table: "PlaylistItems");

            migrationBuilder.DropIndex(
                name: "IX_PlaylistItems_LogId1",
                table: "PlaylistItems");

            migrationBuilder.DropColumn(
                name: "LogId",
                table: "PlaylistItems");

            migrationBuilder.DropColumn(
                name: "LogId1",
                table: "PlaylistItems");
        }
    }
}
