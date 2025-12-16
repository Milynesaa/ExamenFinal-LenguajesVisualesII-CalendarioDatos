📅 Calendario de Eventos - Sistema de Gestión de Eventos
Sistema completo de gestión de eventos construido con ASP.NET Core 8.0 y React 18, que permite crear, editar, eliminar y visualizar eventos de manera intuitiva con una interfaz moderna y responsiva.

📋 Tabla de Contenidos

Descripción General
Características Principales
Arquitectura del Proyecto
Tecnologías Utilizadas
Requisitos Previos
Instalación y Configuración
Estructura del Proyecto
Documentación de la API
Componentes del Frontend
Guía de Desarrollo


🎯 Descripción General
Calendario de Eventos es una aplicación web full-stack que permite a los usuarios gestionar eventos de manera eficiente. El sistema cuenta con una API RESTful desarrollada en ASP.NET Core que persiste datos en formato JSON y un frontend moderno desarrollado en React con Vite como bundler.
Casos de Uso Principales

✅ Crear nuevos eventos con información detallada
✏️ Editar eventos existentes
🗑️ Eliminar eventos
🔍 Filtrar eventos por tipo o búsqueda de texto
👁️ Visualizar eventos en tarjetas con diseño moderno
🌍 Marcar eventos como públicos o privados


✨ Características Principales
Backend (API)

RESTful API con ASP.NET Core 8.0
Persistencia en JSON mediante sistema de archivos
Validación de datos con Data Annotations
Patrón Repository con inyección de dependencias
Swagger/OpenAPI para documentación interactiva
CORS configurado para desarrollo frontend
Operaciones CRUD completas

Frontend (React)

Interfaz moderna con diseño glassmorphism
Tailwind CSS para estilos responsive
Componentes reutilizables con React Hooks
Formularios controlados con validación
Animaciones suaves y transiciones
Diseño responsive para todos los dispositivos
Emojis contextuales según tipo de evento


🏗️ Arquitectura del Proyecto
┌─────────────────────────────────────────────┐
│          Cliente (Navegador)                │
│     React 18 + Vite + Tailwind CSS          │
└─────────────────┬───────────────────────────┘
                  │ HTTP/HTTPS
                  │ (Fetch API)
┌─────────────────▼───────────────────────────┐
│         API REST (ASP.NET Core 8.0)         │
│  ┌─────────────────────────────────────┐   │
│  │   Controllers (EventosController)    │   │
│  └──────────────┬──────────────────────┘   │
│                 │                            │
│  ┌──────────────▼──────────────────────┐   │
│  │   Services (EventService)            │   │
│  │   - Lógica de negocio                │   │
│  │   - Gestión de archivo JSON          │   │
│  └──────────────┬──────────────────────┘   │
│                 │                            │
│  ┌──────────────▼──────────────────────┐   │
│  │   Models (Evento)                    │   │
│  │   - Validaciones                     │   │
│  └─────────────────────────────────────┘   │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│      Persistencia (events.json)             │
│      Sistema de archivos                    │
└─────────────────────────────────────────────┘

🛠️ Tecnologías Utilizadas
Backend
TecnologíaVersiónPropósito.NET8.0Framework principalASP.NET Core8.0Web APIC#12.0Lenguaje de programaciónSwashbuckle6.6.2Documentación OpenAPI/SwaggerSystem.Text.JsonBuilt-inSerialización JSON
Frontend
TecnologíaVersiónPropósitoReact18.3.1Framework UIReact DOM18.3.1Renderizado DOMVite5.4.21Build tool y dev serverTailwind CSS3.x (CDN)Framework CSSJavaScriptES6+Lenguaje de programación

📦 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:

.NET SDK 8.0 o superior

bash  dotnet --version
  # Debe mostrar 8.0.x o superior

Node.js 18.x o superior y npm

bash  node --version
  npm --version

Visual Studio 2022 (opcional, recomendado) o Visual Studio Code
Git para control de versiones


🚀 Instalación y Configuración
1. Clonar el Repositorio
bashgit clone <url-del-repositorio>
cd CalendarioEventos
2. Configurar el Backend
Restaurar dependencias de .NET
bashcd CalendarioEventos
dotnet restore
Verificar configuración
Edita appsettings.json si necesitas cambiar los puertos:
json{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "Https": {
        "Url": "https://localhost:5001"
      }
    }
  }
}
Ejecutar el backend
bashdotnet run
La API estará disponible en:

HTTP: http://localhost:5000
HTTPS: https://localhost:5001
Swagger UI: https://localhost:5001/swagger

3. Configurar el Frontend
Instalar dependencias
bashcd ClientApp
npm install
Configurar la URL de la API
Crea un archivo .env en ClientApp/:
envVITE_API_URL=https://localhost:5001/api/eventos
Ejecutar el frontend
bashnpm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 📂 Estructura del Proyecto
```
CalendarioEventos/
├── CalendarioEventos/                  # Proyecto Backend
│   ├── Controllers/
│   │   └── EventosController.cs        # Controlador API REST
│   ├── Models/
│   │   └── Eventos.cs                  # Modelo de datos
│   ├── Services/
│   │   ├── IEventService.cs            # Interfaz del servicio
│   │   └── EventService.cs             # Implementación del servicio
│   ├── Data/
│   │   └── events.json                 # Base de datos JSON
│   ├── ClientApp/                      # Proyecto Frontend
│   │   ├── App.jsx                     # Componente principal
│   │   ├── EventForm.jsx               # Formulario de eventos
│   │   ├── EventList.jsx               # Lista de eventos
│   │   ├── api.js                      # Cliente API
│   │   ├── main.jsx                    # Punto de entrada
│   │   ├── index.html                  # HTML principal
│   │   ├── styles.css                  # Estilos globales
│   │   ├── package.json                # Dependencias npm
│   │   └── vite.config.js              # Configuración Vite
│   ├── Properties/
│   │   └── launchSettings.json         # Configuración de launch
│   ├── appsettings.json                # Configuración de la app
│   ├── Program.cs                      # Punto de entrada
│   └── CalendarioEventos.csproj        # Proyecto .NET
├── CalendarioEventos.sln               # Solución Visual Studio
└── README.md                           # Este archivo
```

---

## 🔌 Documentación de la API

### Base URL
```
https://localhost:5001/api/eventos
Endpoints
1. Obtener todos los eventos
httpGET /api/eventos
Query Parameters:

tipo (opcional): Filtrar por tipo de evento
search (opcional): Buscar en título y descripción

Ejemplo de solicitud:
bashcurl -X GET "https://localhost:5001/api/eventos?tipo=Reunión" -k
Respuesta exitosa (200 OK):
json[
  {
    "id": 1,
    "titulo": "Reunión de equipo",
    "descripcion": "Reunión semanal del equipo de desarrollo",
    "fecha": "2025-12-20T10:00:00",
    "tipo": "Reunión",
    "lugar": "Sala de conferencias A",
    "esPublico": true
  }
]
2. Obtener evento por ID
httpGET /api/eventos/{id}
Ejemplo de solicitud:
bashcurl -X GET "https://localhost:5001/api/eventos/1" -k
Respuesta exitosa (200 OK):
json{
  "id": 1,
  "titulo": "Reunión de equipo",
  "descripcion": "Reunión semanal del equipo de desarrollo",
  "fecha": "2025-12-20T10:00:00",
  "tipo": "Reunión",
  "lugar": "Sala de conferencias A",
  "esPublico": true
}
Respuesta de error (404 Not Found):
json{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404
}
3. Crear un nuevo evento
httpPOST /api/eventos
Content-Type: application/json
Cuerpo de la solicitud:
json{
  "titulo": "Conferencia de tecnología",
  "descripcion": "Conferencia anual sobre nuevas tecnologías",
  "fecha": "2025-12-25T09:00:00",
  "tipo": "Conferencia",
  "lugar": "Auditorio principal",
  "esPublico": true
}
Ejemplo con curl:
bashcurl -X POST "https://localhost:5001/api/eventos" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Conferencia de tecnología",
    "descripcion": "Conferencia anual",
    "fecha": "2025-12-25T09:00:00",
    "tipo": "Conferencia",
    "lugar": "Auditorio principal",
    "esPublico": true
  }' -k
Respuesta exitosa (201 Created):
json{
  "id": 2,
  "titulo": "Conferencia de tecnología",
  "descripcion": "Conferencia anual sobre nuevas tecnologías",
  "fecha": "2025-12-25T09:00:00",
  "tipo": "Conferencia",
  "lugar": "Auditorio principal",
  "esPublico": true
}
4. Actualizar un evento
httpPUT /api/eventos/{id}
Content-Type: application/json
Cuerpo de la solicitud:
json{
  "id": 1,
  "titulo": "Reunión de equipo actualizada",
  "descripcion": "Descripción actualizada",
  "fecha": "2025-12-21T10:00:00",
  "tipo": "Reunión",
  "lugar": "Sala B",
  "esPublico": false
}
Ejemplo con curl:
bashcurl -X PUT "https://localhost:5001/api/eventos/1" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "titulo": "Reunión actualizada",
    "descripcion": "Nueva descripción",
    "fecha": "2025-12-21T10:00:00",
    "tipo": "Reunión",
    "lugar": "Sala B",
    "esPublico": false
  }' -k
Respuesta exitosa (204 No Content)
Respuesta de error (404 Not Found) si el evento no existe
5. Eliminar un evento
httpDELETE /api/eventos/{id}
Ejemplo de solicitud:
bashcurl -X DELETE "https://localhost:5001/api/eventos/1" -k
Respuesta exitosa (204 No Content)
Respuesta de error (404 Not Found) si el evento no existe

🎨 Componentes del Frontend
1. App.jsx - Componente Principal
El componente raíz que gestiona el estado global de la aplicación.
jsximport React, { useEffect, useState } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from './api';
import EventForm from './EventForm';
import EventList from './EventList';

export default function App() {
    const [events, setEvents] = useState([]);
    const [editing, setEditing] = useState(null);

    // Cargar eventos al montar el componente
    async function load() {
        const list = await getEvents();
        setEvents(list);
    }

    useEffect(() => { 
        load(); 
    }, []);

    // Crear nuevo evento
    async function onCreate(ev) {
        const created = await createEvent(ev);
        setEvents(prev => [...prev, created]);
    }

    // Actualizar evento existente
    async function onUpdate(id, ev) {
        const ok = await updateEvent(id, ev);
        if (ok) {
            setEvents(prev => prev.map(e => (e.id === id ? ev : e)));
            setEditing(null);
            await load();
        }
    }

    // Eliminar evento
    async function onDelete(id) {
        const ok = await deleteEvent(id);
        if (ok) setEvents(prev => prev.filter(e => e.id !== id));
    }

    return (
        <div className="min-h-screen">
            {/* Header con diseño glassmorphism */}
            <header>
                <h1>Calendario de Eventos</h1>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Formulario */}
                    <div className="lg:col-span-1">
                        <EventForm 
                            onCreate={onCreate} 
                            editing={editing} 
                            onUpdate={onUpdate} 
                        />
                    </div>

                    {/* Lista de eventos */}
                    <div className="lg:col-span-2">
                        <EventList 
                            items={events} 
                            onEdit={setEditing} 
                            onDelete={onDelete} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
2. EventForm.jsx - Formulario de Eventos
Componente para crear y editar eventos con validación.
jsximport React, { useEffect, useState } from 'react';

const empty = {
    titulo: '',
    descripcion: '',
    fecha: '',
    tipo: '',
    lugar: '',
    esPublico: true
};

const tiposEvento = [
    { value: 'reunion', label: 'Reunión', emoji: '👥' },
    { value: 'conferencia', label: 'Conferencia', emoji: '🎤' },
    { value: 'taller', label: 'Taller', emoji: '🛠️' },
    { value: 'webinar', label: 'Webinar', emoji: '💻' },
    // ... más tipos
];

export default function EventForm({ onCreate, editing, onUpdate }) {
    const [form, setForm] = useState(empty);

    // Actualizar formulario cuando cambia el evento a editar
    useEffect(() => {
        if (editing) {
            setForm({
                id: editing.id,
                titulo: editing.titulo,
                descripcion: editing.descripcion,
                fecha: editing.fecha,
                tipo: editing.tipo,
                lugar: editing.lugar,
                esPublico: editing.esPublico
            });
        } else {
            setForm(empty);
        }
    }, [editing]);

    // Actualizar campo del formulario
    function f(name, val) {
        setForm(prev => ({ ...prev, [name]: val }));
    }

    // Enviar formulario
    async function submit(e) {
        e.preventDefault();
        const payload = {
            ...(form.id ? { id: form.id } : {}),
            titulo: form.titulo,
            descripcion: form.descripcion,
            fecha: form.fecha,
            tipo: form.tipo,
            lugar: form.lugar,
            esPublico: !!form.esPublico
        };

        if (form.id) {
            await onUpdate(form.id, payload);
        } else {
            await onCreate(payload);
            setForm(empty);
        }
    }

    return (
        <div className="rounded-3xl shadow-lg p-8">
            <h2>{form.id ? 'Editar Evento' : 'Nuevo Evento'}</h2>
            
            <form onSubmit={submit} className="space-y-6">
                {/* Campo: Título */}
                <div>
                    <label>💬 Título</label>
                    <input
                        type="text"
                        value={form.titulo}
                        onChange={e => f('titulo', e.target.value)}
                        required
                        maxLength={200}
                        placeholder="Ej: Reunión de equipo"
                        className="w-full px-4 py-3 rounded-xl"
                    />
                </div>

                {/* Campo: Fecha y Hora */}
                <div>
                    <label>📆 Fecha y Hora</label>
                    <input
                        type="datetime-local"
                        value={form.fecha}
                        onChange={e => f('fecha', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl"
                    />
                </div>

                {/* Campo: Tipo */}
                <div>
                    <label>🏷️ Tipo de Evento</label>
                    <select
                        value={form.tipo}
                        onChange={e => f('tipo', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl"
                    >
                        <option value="">Selecciona un tipo</option>
                        {tiposEvento.map(tipo => (
                            <option key={tipo.value} value={tipo.label}>
                                {tipo.emoji} {tipo.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo: Descripción */}
                <div>
                    <label>📝 Descripción</label>
                    <textarea
                        value={form.descripcion}
                        onChange={e => f('descripcion', e.target.value)}
                        maxLength={2000}
                        rows={4}
                        placeholder="Describe los detalles..."
                        className="w-full px-4 py-3 rounded-xl"
                    />
                </div>

                {/* Campo: Lugar */}
                <div>
                    <label>📍 Lugar</label>
                    <input
                        type="text"
                        value={form.lugar}
                        onChange={e => f('lugar', e.target.value)}
                        maxLength={200}
                        placeholder="Ej: Sala de conferencias A"
                        className="w-full px-4 py-3 rounded-xl"
                    />
                </div>

                {/* Campo: Evento Público */}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={!!form.esPublico}
                            onChange={e => f('esPublico', e.target.checked)}
                        />
                        🌍 Evento Público
                    </label>
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                    <button type="submit" className="flex-1">
                        {form.id ? '🔄 Actualizar' : '✨ Crear Evento'}
                    </button>
                    {form.id && (
                        <button type="button" onClick={() => setForm(empty)}>
                            ❌ Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
3. EventList.jsx - Lista de Eventos
Componente para mostrar eventos en tarjetas con opciones de edición y eliminación.
jsximport React from 'react';

export default function EventList({ items, onEdit, onDelete }) {
    // Mensaje si no hay eventos
    if (!items || items.length === 0) {
        return (
            <div className="rounded-3xl shadow-lg p-16 text-center">
                <div className="text-8xl mb-6 animate-bounce">📭</div>
                <h3>No hay eventos</h3>
                <p>Crea tu primer evento usando el formulario ✨</p>
            </div>
        );
    }

    // Determinar emoji según tipo de evento
    const getEventEmoji = (tipo) => {
        const t = tipo?.toLowerCase() || '';
        if (t.includes('reunión')) return '👥';
        if (t.includes('conferencia')) return '🎤';
        if (t.includes('taller')) return '🛠️';
        // ... más casos
        return '📌';
    };

    return (
        <div>
            {/* Header de la lista */}
            <div className="mb-8 rounded-3xl shadow-lg p-6">
                <h2>📋 Eventos Programados</h2>
                <span className="badge">{items.length} eventos</span>
            </div>

            {/* Grid de eventos */}
            <div className="space-y-6">
                {items.map(ev => {
                    const emoji = getEventEmoji(ev.tipo);

                    return (
                        <div key={ev.id} className="rounded-3xl shadow-lg">
                            {/* Header de la tarjeta */}
                            <div className="flex items-start justify-between p-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-5xl">{emoji}</span>
                                        <div>
                                            <h3>{ev.titulo}</h3>
                                            {ev.esPublico && (
                                                <span className="badge">🌍 Público</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Badge de tipo */}
                                    <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full">
                                        <span>{emoji}</span>
                                        <span>{ev.tipo}</span>
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-3">
                                    <button onClick={() => onEdit(ev)}>
                                        ✏️
                                    </button>
                                    <button onClick={() => onDelete(ev.id)}>
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            {/* Información de fecha */}
                            <div className="p-5">
                                <span>🕐</span>
                                <div>
                                    {new Date(ev.fecha).toLocaleDateString('es-ES', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <div>
                                    {new Date(ev.fecha).toLocaleTimeString('es-ES', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            {/* Descripción */}
                            {ev.descripcion && (
                                <div className="p-5">
                                    <span>📄</span>
                                    <p>{ev.descripcion}</p>
                                </div>
                            )}

                            {/* Ubicación */}
                            {ev.lugar && (
                                <div className="p-5">
                                    <span>📍</span>
                                    <span>{ev.lugar}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
4. api.js - Cliente de la API
Módulo con funciones para comunicarse con el backend.
javascriptconst BASE = import.meta.env.VITE_API_URL ?? 'https://localhost:5001/api/eventos';

// Obtener todos los eventos con filtros opcionales
export async function getEvents(tipo, search) {
    const q = new URL(BASE);
    if (tipo) q.searchParams.append('tipo', tipo);
    if (search) q.searchParams.append('search', search);
    const res = await fetch(q.toString());
    return await res.json();
}

// Crear un nuevo evento
export async function createEvent(ev) {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ev)
    });
    return await res.json();
}

// Actualizar un evento existente
export async function updateEvent(id, ev) {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ev)
    });
    if (res.status === 204) return true;
    return false;
}

// Eliminar un evento
export async function deleteEvent(id) {
    const res = await fetch(`${BASE}/${id}`, { 
        method: 'DELETE' 
    });
    return res.status === 204;
}

💻 Guía de Desarrollo
Modelo de Datos
El modelo Evento con validaciones:
csharpusing System;
using System.ComponentModel.DataAnnotations;

namespace CalendarioEventos.Models
{
    public class Evento
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio")]
        [StringLength(200, ErrorMessage = "El título no puede exceder 200 caracteres")]
        public string Titulo { get; set; } = string.Empty;

        [StringLength(2000, ErrorMessage = "La descripción no puede exceder 2000 caracteres")]
        public string Descripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha es obligatoria")]
        public DateTime Fecha { get; set; }

        [Required(ErrorMessage = "El tipo es obligatorio")]
        [StringLength(100, ErrorMessage = "El tipo no puede exceder 100 caracteres")]
        public string Tipo { get; set; } = string.Empty;

        [StringLength(200, ErrorMessage = "El lugar no puede exceder 200 caracteres")]
        public string Lugar { get; set; } = string.Empty;

        public bool EsPublico { get; set; }
    }
}
Servicio de Eventos
Implementación del servicio con persistencia en JSON:
csharpusing System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using CalendarioEventos.Models;

namespace CalendarioEventos.Services
{
    public class EventService : IEventService
    {
        private readonly string _filePath;
        private readonly object _lock = new();

        public EventService(string filePath)
        {
            _filePath = filePath;
            
            // Crear directorio si no existe
            var dir = Path.GetDirectoryName(_filePath);
            if (!string.IsNullOrWhiteSpace(dir) && !Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            // Crear archivo si no existe
            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "[]");
            }
        }

        // Leer todos los eventos del archivo
        private List<Evento> ReadAll()
        {
            lock (_lock)
            {
                var json = File.ReadAllText(_filePath);
                return JsonSerializer.Deserialize<List<Evento>>(json, 
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<Evento>();
            }
        }

        // Escribir eventos al archivo
        private void WriteAll(List<Evento> events)
        {
            lock (_lock)
            {
                var json = JsonSerializer.Serialize(events, 
                    new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(_filePath, json);
            }
        }

        // Obtener todos los eventos con filtros opcionales
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
                    e.Titulo.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    e.Descripcion.Contains(search, StringComparison.OrdinalIgnoreCase));
            }
            var result = all.OrderBy(e => e.Fecha).ToList();
        return Task.FromResult(result);
    }

    // Obtener evento por ID
    public Task<Evento?> GetByIdAsync(int id)
    {
        var ev = ReadAll().FirstOrDefault(e => e.Id == id);
        return Task.FromResult(ev);
    }

    // Crear nuevo evento
    public Task<Evento> CreateAsync(Evento ev)
    {
        var all = ReadAll();
        var nextId = all.Count == 0 ? 1 : all.Max(e => e.Id) + 1;
        ev.Id = nextId;
        if (ev.Fecha == default) ev.Fecha = DateTime.UtcNow;
        all.Add(ev);
        WriteAll(all);
        return Task.FromResult(ev);
    }

    // Actualizar evento existente
    public Task<bool> UpdateAsync(Evento ev)
    {
        var all = ReadAll();
        var idx = all.FindIndex(e => e.Id == ev.Id);
        if (idx < 0) return Task.FromResult(false);
        all[idx] = ev;
        WriteAll(all);
        return Task.FromResult(true);
    }

    // Eliminar evento
    public Task<bool> DeleteAsync(int id)
    {
        var all = ReadAll();
        var removed = all.RemoveAll(e => e.Id == id) > 0;
        if (removed) WriteAll(all);
        return Task.FromResult(removed);
    }
}
}

### Configuración de Program.cs
```csharp
using CalendarioEventos.Services;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios al contenedor
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrar EventService con la ruta del archivo JSON
var dataPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "events.json");
builder.Services.AddSingleton<IEventService>(sp => new EventService(dataPath));

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configurar el pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### Scripts NPM Disponibles
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción

### Tips de Desarrollo

#### 1. Hot Reload

Ambos entornos soportan hot reload:
- **Backend**: `dotnet watch run`
- **Frontend**: `npm run dev` (incluido por defecto en Vite)

#### 2. Debugging

**Backend en Visual Studio:**
1. Coloca breakpoints en el código
2. Presiona F5 o haz clic en "Iniciar depuración"

**Frontend en VS Code:**
1. Instala la extensión "Debugger for Chrome"
2. Usa las herramientas de desarrollador del navegador (F12)

#### 3. Formato de Fechas

El sistema usa `datetime-local` en HTML5, que tiene el formato:
YYYY-MM-DDTHH:mm

Ejemplo: `2025-12-25T14:30`

#### 4. Agregar Nuevos Tipos de Evento

Edita el array `tiposEvento` en `EventForm.jsx`:
```javascript
const tiposEvento = [
    { value: 'nuevo-tipo', label: 'Nuevo Tipo', emoji: '🎭' },
    // ... tipos existentes
];
```

#### 5. Personalizar Estilos

Los estilos principales usan Tailwind CSS via CDN. Para personalizaciones:

1. **Colores del tema:**
```css
/* En styles.css */
:root {
    --primary-purple: #9B7EBD;
    --primary-blue: #7BA5D6;
    --primary-cyan: #6CB8D8;
}
```

2. **Animaciones personalizadas:**
```jsx
<div className="transition-all duration-300 hover:scale-105">
    {/* Tu contenido */}
</div>
```

---

## 🐛 Solución de Problemas Comunes

### Error: Puerto ya en uso

**Backend:**
```bash
# Cambiar el puerto en appsettings.json
"Kestrel": {
  "Endpoints": {
    "Http": {
      "Url": "http://localhost:5050"  // Nuevo puerto
    }
  }
}
```

**Frontend:**
```bash
# Vite usa automáticamente el siguiente puerto disponible
# O especificar en vite.config.js:
export default {
  server: {
    port: 3000
  }
}
```

### Error: CORS Policy

Si ves errores de CORS, verifica que el backend tenga configurado:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

Y que esté habilitado en el pipeline:
```csharp
app.UseCors();
```

### Error: Certificate Invalid (HTTPS)

En desarrollo, acepta el certificado autofirmado:

**Chrome:** Escribe `thisisunsafe` cuando veas el warning

**Firefox:** "Avanzado" > "Aceptar el riesgo"

O usa HTTP en lugar de HTTPS para desarrollo.

### Error: Evento no se actualiza en la UI

Verifica que estés llamando `load()` después de actualizar:
```javascript
async function onUpdate(id, ev) {
    const ok = await updateEvent(id, ev);
    if (ok) {
        await load(); // Recargar eventos
        setEditing(null);
    }
}
```

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

**¡Gracias por usar Calendario de Eventos! 🎉**Claude es IA y puede cometer errores. Por favor, verifica nuevamente las respuestas.
