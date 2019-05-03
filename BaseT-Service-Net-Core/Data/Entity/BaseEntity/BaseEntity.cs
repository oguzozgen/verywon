using System;

namespace BaseT_Service_Net_Core.Data.Entity.BaseEntity
{
    public class BaseEntity<T>:IBaseEntity<T>
    {
        public T Id {get; set;}
        public DateTimeOffset CreatedAt { get; set; }
        public  DateTimeOffset LastUpdatedAt { get; set; } =DateTimeOffset.UtcNow;
        public bool IsDeleted { get; set; }
    }
}