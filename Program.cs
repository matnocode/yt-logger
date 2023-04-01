using Microsoft.EntityFrameworkCore;
using yt_logger.Data;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;
using yt_logger.Data.Repositories;
using yt_logger.Services;

namespace yt_logger
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<YtLoggerDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("YtLoggerDb")));
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddMediatR(conf => conf.RegisterServicesFromAssemblyContaining(typeof(Program)));

            builder.Services.AddScoped<IAsyncRepository<Playlist>, AsyncRepository<Playlist>>();
            builder.Services.AddScoped<IAsyncRepository<PlaylistItem>, AsyncRepository<PlaylistItem>>();
            builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            builder.Services.AddScoped<IPlaylistItemRepository, PlaylistItemRepository>();


            builder.Services.AddScoped<IYtService , YtService>();
            builder.Services.AddScoped<IPlaylistService, PlaylistService>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {

            }

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}