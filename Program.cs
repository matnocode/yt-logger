using Microsoft.EntityFrameworkCore;
using System.Net;
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
            var dev = false;

            if (!dev)
                builder.WebHost.UseKestrel(options =>
                {
                    options.Listen(IPAddress.Any, 5001, listenOptions =>
                    {
                        listenOptions.UseHttps("C:\\Certificate\\certificate.pfx", "Matas333");
                    });
                });

            var connectionString = builder.Configuration.GetConnectionString("YtLoggerDb");

            builder.Services.AddDbContext<YtLoggerDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddMediatR(conf => conf.RegisterServicesFromAssemblyContaining(typeof(Program)));

            builder.Services.AddScoped<IAsyncRepository<Playlist>, AsyncRepository<Playlist>>();
            builder.Services.AddScoped<IAsyncRepository<PlaylistItem>, AsyncRepository<PlaylistItem>>();
            builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            builder.Services.AddScoped<IPlaylistItemRepository, PlaylistItemRepository>();
            builder.Services.AddScoped<ILogRepository, LogRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            builder.Services.AddScoped<IYtService, YtService>();
            builder.Services.AddScoped<IPlaylistService, PlaylistService>();
            builder.Services.AddScoped<IAuthService, AuthService>();

            var app = builder.Build();


            if (dev)
            {
                app.UseCors(options => options
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());
            }
            else
            {
                app.UseCors(options => options
                .WithOrigins("https://ylogger.vercel.app")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

                app.UseHsts();
                app.UseCors(options => options
                  .WithOrigins("https://ylogger.vercel.app")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials());
            }

            app.UseHttpsRedirection();

            app.MapControllers();

            app.Run();
        }
    }
}