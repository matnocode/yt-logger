using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace yt_logger.Data.Entities
{
    [PrimaryKey("Id")]
    public class BaseEntity
    {
        public int Id { get; protected set; }
    }
}
