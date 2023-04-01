using System.ComponentModel.DataAnnotations;

namespace yt_logger.Data.Entities
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; protected set; }
    }
}
