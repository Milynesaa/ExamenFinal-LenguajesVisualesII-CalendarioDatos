using System.Collections.Generic;
using System.Threading.Tasks;
using CalendarioEventos.Models;

namespace CalendarioEventos.Services
{
    public interface IEventService
    {
        Task<List<Evento>> GetAllAsync(string? tipo = null, string? search = null);
        Task<Evento?> GetByIdAsync(int id);
        Task<Evento> CreateAsync(Evento ev);
        Task<bool> UpdateAsync(Evento ev);
        Task<bool> DeleteAsync(int id);
    }
}