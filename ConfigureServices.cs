using Microsoft.AspNetCore.Authentication.Cookies;

namespace yt_logger
{
    //use this to add services
    public class ConfigureServices
    {
        private readonly IServiceCollection services;

        public ConfigureServices(IServiceCollection services)
        {
            this.services = services;
            Configure();
        }

        private void Configure()
        {
            services.AddMediatR(conf => conf.RegisterServicesFromAssemblyContaining(typeof(Program)));
        }
    }
}
