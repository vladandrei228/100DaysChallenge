import type { Appointment } from '../types';
import { deleteAppointment } from '../api/appointments';


export default function AppointmentCard({ appointment, onToggle }:
{ appointment: Appointment; onToggle: (id: string, next: boolean) => void }) {

async function handleDelete() {
await deleteAppointment(appointment.id);
}

const isConfirmed = appointment.confirmed;

return (
<div className="p-4 rounded-2xl shadow-sm border border-purple-900 flex items-center justify-between">
<div>
<div className="font-semibold">{appointment.client_name}</div>
<div className="text-sm text-gray-500">{new Date(appointment.date).toLocaleString()}</div>
<div className="text-sm mt-1">Type: {appointment.event_type}</div>
</div>
<div className="flex flex-row items-end gap-2">
<button
    onClick={() => onToggle(appointment.id, !isConfirmed)}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
    ${isConfirmed ? 'bg-green-400 text-white hover:bg-green-600 border border-green-300'
              : 'bg-purple-400 text-white hover:bg-purple-600 border border-purple-300'
    }`}>
    {isConfirmed ? 'Confirmed' : 'Confirm'}
</button>
<button
onClick={handleDelete}
className="px-4 py-2 rounded-full border text-sm bg-red-600 text-white hover:bg-red-700"
>Delete</button>
</div>
</div>
);
}