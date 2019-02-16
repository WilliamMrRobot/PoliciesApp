using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http;

namespace Api
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			// Configuración y servicios de Web API
			// Configure Web API para usar solo la autenticación de token de portador.
			config.SuppressDefaultHostAuthentication();
			config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

			// Rutas de Web API
			config.MapHttpAttributeRoutes();

			config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
				new CamelCasePropertyNamesContractResolver();

			config.EnableCors();

			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);
		}
	}
}
