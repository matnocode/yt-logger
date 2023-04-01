namespace yt_logger
{
    //use this to add services //fixx
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
