using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using CalendarioEventos.Models;

namespace CalendarioEventos.Services
{
    // Implementa la interfaz IEventService
    public class EventService : IEventService
    {
        private readonly string _filePath;
        private readonly object _lock = new();

        public EventService(string filePath)
        {
            _filePath = filePath ?? throw new ArgumentNullException(nameof(filePath));
            var dir = Path.GetDirectoryName(_filePath);
            if (!string.IsNullOrWhiteSpace(dir) && !Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "[]");
            }
        }

        private List<Evento> ReadAll()
        {
            lock (_lock)
            {
                var json = File.ReadAllText(_filePath);
                return JsonSerializer.Deserialize<List<Evento>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    // Permite leer números almacenados como cadenas (por seguridad tolerante)
                    NumberHandling = JsonNumberHandling.AllowReadingFromString
                }) ?? new List<Evento>();
            }
        }

        private void WriteAll(List<Evento> events)
        {
            lock (_lock)
            {
                var json = JsonSerializer.Serialize(events, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(_filePath, json);
            }
        }

        public Task<List<Evento>> GetAllAsync(string? tipo = null, string? search = null)
        {
            var all = ReadAll().AsQueryable();
            if (!string.IsNullOrWhiteSpace(tipo))
            {
                all = all.Where(e => e.Tipo.Equals(tipo, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                all = all.Where(e =>
                    (!string.IsNullOrEmpty(e.Titulo) && e.Titulo.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(e.Descripcion) && e.Descripcion.Contains(search, StringComparison.OrdinalIgnoreCase)));
            }

            var result = all.OrderBy(e => e.Fecha).ToList();
            return Task.FromResult(result);
        }

        public Task<Evento?> GetByIdAsync(int id)
        {
            var ev = ReadAll().FirstOrDefault(e => e.Id == id);
            return Task.FromResult(ev);
        }

        public Task<Evento> CreateAsync(Evento ev)
        {
            var all = ReadAll();
            // asignar Id incremental: 1, 2, 3...
            var nextId = all.Count == 0 ? 1 : all.Max(e => e.Id) + 1;
            ev.Id = nextId;
            if (ev.Fecha == default) ev.Fecha = DateTime.UtcNow;
            all.Add(ev);
            WriteAll(all);
            return Task.FromResult(ev);
        }

        public Task<bool> UpdateAsync(Evento ev)
        {
            var all = ReadAll();
            var idx = all.FindIndex(e => e.Id == ev.Id);
            if (idx < 0) return Task.FromResult(false);
            all[idx] = ev;
            WriteAll(all);
            return Task.FromResult(true);
        }

        public Task<bool> DeleteAsync(int id)
        {
            var all = ReadAll();
            var removed = all.RemoveAll(e => e.Id == id) > 0;
            if (removed) WriteAll(all);
            return Task.FromResult(removed);
        }
    }
}