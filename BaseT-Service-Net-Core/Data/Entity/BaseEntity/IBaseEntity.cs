using System;

namespace BaseT_Service_Net_Core.Data.Entity.BaseEntity
{
    public interface IBaseEntity<T>
    {
        T Id {get; set;}
        DateTimeOffset CreatedAt { get; set; }
        DateTimeOffset LastUpdatedAt { get; set; }
        bool IsDeleted { get; set; }
    
        
    }
}