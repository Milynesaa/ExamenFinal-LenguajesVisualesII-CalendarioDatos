const BASE = import.meta.env.VITE_API_URL ?? 'https://localhost:5001/api/eventos';

export async function getEvents(tipo, search) {
    const q = new URL(BASE);
    if (tipo) q.searchParams.append('tipo', tipo);
    if (search) q.searchParams.append('search', search);
    const res = await fetch(q.toString());
    return await res.json();
}

export async function createEvent(ev) {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ev)
    });
    return await res.json();
}

export async function updateEvent(id, ev) {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ev)
    });
    if (res.status === 204) return true;
    return false;
}

export async function deleteEvent(id) {
    const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
    return res.status === 204;
}