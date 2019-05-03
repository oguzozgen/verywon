using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaseT_Service_Net_Core.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;  

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore(config =>
            {

                var policy = new AuthorizationPolicyBuilder()
                     .RequireAuthenticatedUser()
                     .Build();
                config.Filters.Add(new AuthorizeFilter(policy)); //global authorize filter
               
               
                 // require scope1 or scope2
                var policyc = ScopePolicy.Create("merhabain");
                config.Filters.Add(new AuthorizeFilter(policyc));
            })
                .AddAuthorization(options=>
                     //TODO Blocks values controlle one api but did not let to use
                      options.AddPolicy("jsclient", config =>
                    {
                        config.AddAuthenticationSchemes("bearer");
                        config.RequireClaim("client_id", "spa");
                    })
                )
                .AddJsonFormatters();

            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "http://localhost:5000";
                    options.RequireHttpsMetadata = false;

                    options.ApiName = "verywon-dbservice";
                    
                    options.EnableCaching = true;
                    options.CacheDuration = TimeSpan.FromMinutes(10);
                    
                });

            services.AddCors(options =>
            {
                // this defines a CORS policy called "default"
                options.AddPolicy("default", policy =>
                {
                    policy.WithOrigins("http://localhost:5100")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddDbContext<ServiceTContext>(
                options =>
                     options.UseNpgsql(Configuration.GetConnectionString("PostgreConnection"))
                 );

                // services.AddScoped<IGenericRepostitory, ProductRepository>();
            

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("default");
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
