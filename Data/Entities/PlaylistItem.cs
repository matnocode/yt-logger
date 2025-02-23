﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace yt_logger.Data.Entities
{
    public class PlaylistItem : BaseEntity
    {
        [Key]
        public string RefId { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; } //save locally, cause if deleted video, image deletes too
        public string VideoOwnerChannelTitle { get; set; }
        public string VideoOwnerChannelId { get; set; }
        public DateTime VideoPublishedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
