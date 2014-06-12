using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SecondMedical.Web.Startup))]
namespace SecondMedical.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
