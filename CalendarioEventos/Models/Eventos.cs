using System;
using System.ComponentModel.DataAnnotations;

namespace CalendarioEventos.Models
{
    public class Evento
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Descripcion { get; set; } = string.Empty;

        [Required]
        public DateTime Fecha { get; set; }

        [Required]
        [StringLength(100)]
        public string Tipo { get; set; } = string.Empty;

        [StringLength(200)]
        public string Lugar { get; set; } = string.Empty;

        public bool EsPublico { get; set; }
    }
}