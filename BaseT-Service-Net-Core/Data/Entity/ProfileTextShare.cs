using BaseT_Service_Net_Core.Data.Entity.BaseEntity;

namespace BaseT_Service_Net_Core.Data.Entity
{
    public class ProfileTextShare:BaseEntity<long>
    {
        public string TextShare { get; set; }         
    }
}