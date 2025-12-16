import React, { useEffect, useState } from 'react';

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
    { value: 'capacitacion', label: 'Capacitación', emoji: '📚' },
    { value: 'seminario', label: 'Seminario', emoji: '🎓' },
    { value: 'networking', label: 'Networking', emoji: '🤝' },
    { value: 'celebracion', label: 'Celebración', emoji: '🎉' },
    { value: 'otro', label: 'Otro', emoji: '📌' }
];

export default function EventForm({ onCreate, editing, onUpdate }) {
    const [form, setForm] = useState(empty);

    useEffect(() => {
        if (editing) {
            setForm({
                id: editing.id,
                titulo: editing.titulo ?? editing.Titulo,
                descripcion: editing.descripcion ?? editing.Descripcion,
                fecha: editing.fecha ?? editing.Fecha,
                tipo: editing.tipo ?? editing.Tipo,
                lugar: editing.lugar ?? editing.Lugar,
                esPublico: editing.esPublico ?? editing.EsPublico
            });
        } else setForm(empty);
    }, [editing]);

    function f(name, val) {
        setForm(prev => ({ ...prev, [name]: val }));
    }

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
        <div className="rounded-3xl shadow-lg p-8 border sticky top-8 transition-all duration-300 hover:shadow-xl" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderColor: '#E5E7EB',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
            {/* Patrón de fondo sutil */}
            <div className="absolute inset-0 opacity-5 rounded-3xl" style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, #C8A2EB 2px, transparent 2px), radial-gradient(circle at 75% 75%, #A8DAF3 2px, transparent 2px)',
                backgroundSize: '50px 50px'
            }}></div>

            {/* Header */}
            <div className="mb-8 relative z-10">
                <div className="flex items-center mb-4">
                    <div className="text-5xl mr-4 transition-transform duration-300 hover:scale-110">
                        {form.id ? '✏️' : '✨'}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-1" style={{ color: '#9B7EBD' }}>
                            {form.id ? 'Editar Evento' : 'Nuevo Evento'}
                        </h2>
                        <p className="text-sm font-medium" style={{ color: '#7BA5D6' }}>
                            {form.id ? 'Actualiza la información del evento' : 'Completa el formulario para crear un evento'}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6 relative z-10">
                {/* Título */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#9B7EBD' }}>
                        <span className="text-xl">💬</span>
                        Título
                    </label>
                    <input
                        type="text"
                        value={form.titulo}
                        onChange={e => f('titulo', e.target.value)}
                        required
                        maxLength={200}
                        placeholder="Ej: Reunión de equipo"
                        className="w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 outline-none"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E5E7EB',
                            color: '#374151'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#C8A2EB';
                            e.target.style.boxShadow = '0 0 0 3px rgba(200, 162, 235, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#E5E7EB';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Fecha y Hora */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#7BA5D6' }}>
                        <span className="text-xl">📆</span>
                        Fecha y Hora
                    </label>
                    <input
                        type="datetime-local"
                        value={form.fecha}
                        onChange={e => f('fecha', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 outline-none"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E5E7EB',
                            color: '#374151'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#A8DAF3';
                            e.target.style.boxShadow = '0 0 0 3px rgba(168, 218, 243, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#E5E7EB';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Tipo de Evento */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#9B7EBD' }}>
                        <span className="text-xl">🏷️</span>
                        Tipo de Evento
                    </label>
                    <select
                        value={form.tipo}
                        onChange={e => f('tipo', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 outline-none appearance-none cursor-pointer"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E5E7EB',
                            color: '#374151',
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239B7EBD\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '3rem'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#C8A2EB';
                            e.target.style.boxShadow = '0 0 0 3px rgba(200, 162, 235, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#E5E7EB';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <option value="" disabled>Selecciona un tipo de evento</option>
                        {tiposEvento.map(tipo => (
                            <option key={tipo.value} value={tipo.label}>
                                {tipo.emoji} {tipo.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#7BA5D6' }}>
                        <span className="text-xl">📝</span>
                        Descripción
                    </label>
                    <textarea
                        value={form.descripcion}
                        onChange={e => f('descripcion', e.target.value)}
                        maxLength={2000}
                        rows={4}
                        placeholder="Describe los detalles del evento..."
                        className="w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 outline-none resize-none"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E5E7EB',
                            color: '#374151'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6CB8D8';
                            e.target.style.boxShadow = '0 0 0 3px rgba(108, 184, 216, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#E5E7EB';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Lugar */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#FFE0B2' }}>
                        <span className="text-xl">📍</span>
                        Lugar
                    </label>
                    <input
                        type="text"
                        value={form.lugar}
                        onChange={e => f('lugar', e.target.value)}
                        maxLength={200}
                        placeholder="Ej: Sala de conferencias A"
                        className="w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 outline-none"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E5E7EB',
                            color: '#374151'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#FFE0B2';
                            e.target.style.boxShadow = '0 0 0 3px rgba(255, 224, 178, 0.2)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#E5E7EB';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Checkbox Público */}
                <div className="rounded-xl p-4 transition-all duration-300" style={{
                    background: 'linear-gradient(135deg, rgba(212, 241, 244, 0.3) 0%, rgba(229, 247, 243, 0.3) 100%)',
                    border: '1px solid #D4F1F4'
                }}>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={!!form.esPublico}
                            onChange={e => f('esPublico', e.target.checked)}
                            className="w-5 h-5 rounded cursor-pointer transition-all"
                            style={{ accentColor: '#6CB8D8' }}
                        />
                        <span className="ml-3 flex items-center gap-2 text-base font-semibold" style={{ color: '#7BA5D6' }}>
                            <span className="text-xl">🌍</span>
                            Evento Público
                        </span>
                    </label>
                    <p className="text-sm font-medium mt-2 ml-8" style={{ color: '#9B7EBD' }}>
                        Los eventos públicos serán visibles para todos los usuarios
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 py-4 px-6 rounded-xl font-semibold text-base shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                        style={{
                            background: form.id
                                ? 'linear-gradient(135deg, #A8DAF3 0%, #7BA5D6 100%)'
                                : 'linear-gradient(135deg, #C8A2EB 0%, #9B7EBD 100%)',
                            color: 'white'
                        }}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <span className="text-2xl">{form.id ? '🔄' : '✨'}</span>
                            {form.id ? 'Actualizar Evento' : 'Crear Evento'}
                        </span>
                    </button>

                    {form.id && (
                        <button
                            type="button"
                            onClick={() => setForm(empty)}
                            className="px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: 'rgba(255, 224, 178, 0.3)',
                                color: '#9B7EBD',
                                border: '1px solid #FFE0B2'
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">❌</span>
                                Cancelar
                            </span>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}