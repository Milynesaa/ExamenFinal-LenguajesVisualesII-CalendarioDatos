import React from 'react';

export default function EventList({ items, onEdit, onDelete }) {
    if (!items || items.length === 0) {
        return (
            <div className="rounded-3xl shadow-lg p-16 text-center border transition-all duration-300" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderColor: '#E5E7EB',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
                <div className="flex flex-col items-center">
                    <div className="text-8xl mb-6 animate-bounce">📭</div>
                    <h3 className="text-4xl font-bold mb-3" style={{ color: '#9B7EBD' }}>
                        No hay eventos
                    </h3>
                    <p className="text-lg font-medium" style={{ color: '#7BA5D6' }}>
                        Crea tu primer evento usando el formulario ✨
                    </p>
                </div>
            </div>
        );
    }

    const getEventEmoji = (tipo) => {
        const t = tipo?.toLowerCase() || '';
        if (t.includes('reunión') || t.includes('reunion')) return '👥';
        if (t.includes('conferencia')) return '🎤';
        if (t.includes('taller')) return '🛠️';
        if (t.includes('webinar')) return '💻';
        if (t.includes('capacitación') || t.includes('capacitacion')) return '📚';
        if (t.includes('seminario')) return '🎓';
        if (t.includes('networking')) return '🤝';
        if (t.includes('celebración') || t.includes('celebracion')) return '🎉';
        return '📌';
    };

    return (
        <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            {/* Header de la lista */}
            <div className="mb-8 rounded-3xl shadow-lg p-6 border transition-all duration-300 hover:shadow-xl" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderColor: '#E5E7EB'
            }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">📋</span>
                        <h2 className="text-3xl font-bold" style={{ color: '#9B7EBD' }}>
                            Eventos Programados
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        <span className="px-6 py-3 rounded-full text-lg font-semibold shadow-md text-white" style={{
                            background: 'linear-gradient(135deg, #C8A2EB 0%, #9B7EBD 100%)'
                        }}>
                            {items.length} {items.length === 1 ? 'evento' : 'eventos'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Grid de eventos */}
            <div className="space-y-6">
                {items.map(ev => {
                    const emoji = getEventEmoji(ev.tipo);

                    return (
                        <div
                            key={ev.id}
                            className="rounded-3xl shadow-lg transition-all duration-300 overflow-hidden border hover:shadow-xl hover:-translate-y-2"
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderColor: '#E5E7EB'
                            }}
                        >
                            {/* Barra superior decorativa */}
                            <div className="h-2" style={{
                                background: 'linear-gradient(90deg, #C8A2EB 0%, #A8DAF3 50%, #D4F1F4 100%)'
                            }}></div>

                            <div className="p-8">
                                {/* Header de la tarjeta */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-5xl transition-transform duration-300 hover:scale-125">{emoji}</span>
                                            <div className="flex-1">
                                                <h3 className="text-3xl font-bold mb-2" style={{ color: '#7BA5D6' }}>
                                                    {ev.titulo}
                                                </h3>
                                                {ev.esPublico && (
                                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{
                                                        backgroundColor: 'rgba(168, 218, 243, 0.3)',
                                                        color: '#7BA5D6',
                                                        border: '1px solid #A8DAF3'
                                                    }}>
                                                        <span className="text-lg">🌍</span>
                                                        Público
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Badge de tipo */}
                                        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-base font-semibold text-white shadow-md" style={{
                                            background: 'linear-gradient(135deg, #C8A2EB 0%, #9B7EBD 100%)'
                                        }}>
                                            <span className="text-2xl">{emoji}</span>
                                            <span>{ev.tipo}</span>
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="flex gap-3 ml-6">
                                        <button
                                            onClick={() => onEdit(ev)}
                                            className="p-4 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                                            style={{
                                                backgroundColor: 'rgba(168, 218, 243, 0.3)',
                                                border: '1px solid #A8DAF3'
                                            }}
                                            title="Editar evento"
                                        >
                                            <span className="text-2xl">✏️</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(ev.id)}
                                            className="p-4 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                                            style={{
                                                backgroundColor: 'rgba(200, 162, 235, 0.3)',
                                                border: '1px solid #C8A2EB'
                                            }}
                                            title="Eliminar evento"
                                        >
                                            <span className="text-2xl">🗑️</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Información de fecha y hora */}
                                <div className="flex items-center gap-4 mb-5 rounded-xl p-5 transition-all duration-300 hover:shadow-md" style={{
                                    background: 'linear-gradient(135deg, rgba(168, 218, 243, 0.2) 0%, rgba(212, 241, 244, 0.2) 100%)',
                                    border: '1px solid #D4F1F4'
                                }}>
                                    <span className="text-3xl">🕐</span>
                                    <div>
                                        <div className="text-sm font-medium mb-1" style={{ color: '#7BA5D6' }}>
                                            {new Date(ev.fecha).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div className="text-2xl font-bold" style={{ color: '#9B7EBD' }}>
                                            {new Date(ev.fecha).toLocaleTimeString('es-ES', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Descripción */}
                                {ev.descripcion && (
                                    <div className="mb-5 p-5 rounded-xl transition-all duration-300 hover:shadow-md" style={{
                                        backgroundColor: '#FAFAFA',
                                        border: '1px solid #E5E7EB'
                                    }}>
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl">📄</span>
                                            <p className="leading-relaxed flex-1 text-base font-medium" style={{ color: '#6B7280' }}>
                                                {ev.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Ubicación */}
                                {ev.lugar && (
                                    <div className="flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:shadow-md" style={{
                                        background: 'linear-gradient(135deg, rgba(255, 224, 178, 0.2) 0%, rgba(255, 245, 220, 0.2) 100%)',
                                        border: '1px solid #FFE0B2'
                                    }}>
                                        <span className="text-3xl">📍</span>
                                        <span className="text-lg font-semibold" style={{ color: '#9B7EBD' }}>
                                            {ev.lugar}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}