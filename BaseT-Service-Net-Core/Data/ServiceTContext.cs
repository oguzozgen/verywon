using System;
using System.Linq;
using System.Threading.Tasks;
using BaseT_Service_Net_Core.Data.Entity;
using BaseT_Service_Net_Core.Data.Entity.BaseEntity;
using Microsoft.EntityFrameworkCore;  


namespace BaseT_Service_Net_Core.Data
{
    public class ServiceTContext:DbContext
    {
        public ServiceTContext(DbContextOptions<ServiceTContext> options)                            : base(options)         
            {         
            }         

             public DbSet<ProfileTextShare> ProfileTextShare { get; set; }



         /*   public override int SaveChanges(bool acceptAllChangesOnSuccess)
            {
                OnBeforeSaving();
                return base.SaveChanges(acceptAllChangesOnSuccess);
            }*/

            /* public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
            {
                OnBeforeSaving();
                return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
            }*/
/* 
            private void OnBeforeSaving()
            {

                var entries = ChangeTracker.Entries();

                if (entries == null)
                {
                    return;
                }

                foreach (var entry in entries)
                {
                    
                    if (entry.Entity!=null allias as trackable )
                    {
                        var now = DateTime.UtcNow;
                        var user = GetCurrentUser();
                        switch (entry.State)
                        {
                            case EntityState.Modified:
                                trackable.LastUpdatedAt = now;
                                trackable.LastUpdatedBy = user;
                                break;

                            case EntityState.Added:
                                trackable.CreatedAt = now;
                                trackable.CreatedBy = user;
                                trackable.LastUpdatedAt = now;
                                trackable.LastUpdatedBy = user;
                                break;
                        }
                    }
                }*/




                
/*                foreach (var entry in entries)
                {
                    // get all the properties and are of type string
                    var propertyValues = entry.CurrentValues.Properties.Where(p=> p.ClrType == typeof(string));

                    foreach (var prop in propertyValues)
                    {
                        // access the correct column by it's name and trim the value if it's not null
                        if (entry.CurrentValues[prop.Name] != null) entry.CurrentValues[prop.Name] = entry.CurrentValues[prop.Name].ToString().Trim();
                    }
                }
*/

            
        /* 
            private string GetCurrentUser()
            {
                return "UserName"; // TODO implement your own logic

                // If you are using ASP.NET Core, you should look at this answer on StackOverflow
                // https://stackoverflow.com/a/48554738/2996339
 
            }

            */
    }
}