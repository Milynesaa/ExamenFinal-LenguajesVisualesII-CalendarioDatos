import React, { useEffect, useState } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from './api';
import EventForm from './EventForm';
import EventList from './EventList';

export default function App() {
    const [events, setEvents] = useState([]);
    const [editing, setEditing] = useState(null);

    async function load() {
        const list = await getEvents();
        setEvents(list);
    }

    useEffect(() => { load(); }, []);

    async function onCreate(ev) {
        const created = await createEvent(ev);
        setEvents(prev => [...prev, created]);
    }

    async function onUpdate(id, ev) {
        const ok = await updateEvent(id, ev);
        if (ok) {
            setEvents(prev => prev.map(e => (e.id === id ? ev : e)));
            setEditing(null);
            await load();
        }
    }

    async function onDelete(id) {
        const ok = await deleteEvent(id);
        if (ok) setEvents(prev => prev.filter(e => e.id !== id));
    }

    return (
        <div className="min-h-screen" style={{
            background: 'linear-gradient(135deg, #FFF5DC 0%, #E5F7F3 25%, #D4F1F4 50%, #FFE0B2 75%, #E5F7F3 100%)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
            {/* Patrón de fondo decorativo sutil */}
            <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 20% 30%, #C8A2EB 2px, transparent 2px), radial-gradient(circle at 80% 70%, #A8DAF3 2px, transparent 2px)',
                backgroundSize: '80px 80px'
            }}></div>

            {/* Header con glassmorphism */}
            <header className="relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, rgba(200, 162, 235, 0.4) 0%, rgba(168, 218, 243, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }}>
                {/* Círculos decorativos con blur */}
                <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{
                    background: 'radial-gradient(circle, #C8A2EB, transparent)'
                }}></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{
                    background: 'radial-gradient(circle, #A8DAF3, transparent)'
                }}></div>

                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6 gap-4">
                            <div className="text-7xl animate-bounce">📅</div>
                            <h1 className="text-6xl sm:text-7xl font-bold tracking-tight" style={{
                                color: '#9B7EBD',
                                textShadow: '0 2px 20px rgba(200, 162, 235, 0.3)'
                            }}>
                                Calendario de Eventos
                            </h1>
                        </div>
                        <div className="inline-block">
                            <p className="text-xl font-medium flex items-center justify-center gap-3 px-8 py-4 rounded-full" style={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                backdropFilter: 'blur(10px)',
                                color: '#7BA5D6',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
                            }}>
                                <span className="text-2xl">✨</span>
                                Organiza y gestiona tus eventos de manera eficiente
                                <span className="text-2xl">✨</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Onda decorativa SVG */}
                <svg className="absolute bottom-0 w-full" style={{ height: '60px' }} preserveAspectRatio="none" viewBox="0 0 1200 120">
                    <path d="M0,0 C300,80 600,80 900,40 L1200,80 L1200,120 L0,120 Z" style={{
                        fill: '#FFF5DC',
                        opacity: 0.7
                    }}></path>
                    <path d="M0,20 C300,100 600,60 900,80 L1200,100 L1200,120 L0,120 Z" style={{
                        fill: '#E5F7F3',
                        opacity: 0.5
                    }}></path>
                </svg>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Formulario */}
                    <div className="lg:col-span-1">
                        <EventForm onCreate={onCreate} editing={editing} onUpdate={onUpdate} />
                    </div>

                    {/* Lista de eventos */}
                    <div className="lg:col-span-2">
                        <EventList items={events} onEdit={setEditing} onDelete={onDelete} />
                    </div>
                </div>
            </main>

            {/* Footer mejorado */}
            <footer className="relative mt-16 overflow-hidden" style={{
                background: 'linear-gradient(135deg, rgba(200, 162, 235, 0.3) 0%, rgba(168, 218, 243, 0.3) 100%)',
                backdropFilter: 'blur(20px)'
            }}>
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg" style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(10px)',
                            color: '#9B7EBD',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
                        }}>
                            <span className="text-2xl">🚀</span>
                            <span>API: /api/eventos</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}