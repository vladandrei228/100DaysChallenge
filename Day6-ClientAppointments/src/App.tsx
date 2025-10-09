import { useEffect, useMemo, useState } from 'react';
import type { Appointment } from './types';
import { fetchAppointments , updateAppointmentConfirmed } from './api/appointments';
import AppointmentCard from './components/AppointmentCard';
import BookingForm from './components/BookingForm';
import ToggleSwitch from './components/ToggleSwitch';


export default function App() {
const [appointments, setAppointments] = useState<Appointment[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [search, setSearch] = useState<string>('');
const [error, setError] = useState<string | null>(null);
const [showForm, setShowForm] = useState<boolean>(false);


useEffect(() => {
let cancelled = false;
(async () => {
try {
const data = await fetchAppointments();
if (!cancelled) setAppointments(data);
} catch (err) {
  if(err){
    setError('Failed to load');
  }
} finally {
if (!cancelled) setLoading(false);
}
})();
return () => { cancelled = true; };
}, [appointments]);


// BUG: this filter intentionally has a TypeScript + logic bug for you to fix.
// The current code uses `appointments.filter(a => ... )` but accidentally returns `true` for all
// Please fix so that the search filters by client_name and event_type (case-insensitive, partial match).
const filtered = useMemo(() => {
const str = search.trim().toLowerCase();

if(str.length === 0) {
  return appointments;
}else{
  return appointments.filter(a => a.client_name.toLowerCase().includes(str) || a.event_type.toLowerCase().includes(str));
}
}, [appointments, search]);


async function handleToggle(id: string, next: boolean) {
// Implement optimistic UI: update local state immediately, call API, revert on failure
// Current implementation just calls server and then updates; you must make it optimistic and handle rollback.
const current = [...appointments];
setAppointments((prev) => prev.map((p) => p.id === id ? { ...p, confirmed: next } : p));

// TODO: implement optimistic update
try {
await updateAppointmentConfirmed(id, next);
} catch (err) {
  if(err){
    setAppointments(current);
    setError('Failed to update');
 }
 
}
}


return (
<div className="min-h-screen bg-purple-100 p-4 sm:p-8">
  <header className="flex flex-col items-center mb-6 space-y-2 w-full">
<h1 className="text-[2rem] sm:text-[4rem] font-light tracking-wider leading-[1.35] text-purple-900 uppercase font-serif mb-6">
  Client Appointments
</h1>


<ToggleSwitch checked={showForm} onChange={setShowForm} />
</header>
<div className="max-w-3xl mx-auto">

<div className="relative min-h-[300px]">
          {/* Appointment Cards */}
<div
            className={`transition-opacity duration-300 ${
              showForm ? "opacity-0 pointer-events-none absolute hidden" : "opacity-100 relative border border-purple-900 rounded-2xl p-4"
            }`}
          >
            <div className="mb-4 flex gap-2">
<input
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search clients or event types..."
className="flex-1 p-3 rounded-xl border border-purple-900 focus:outline-none" />
<button onClick={() => setSearch('')} className="px-4 py-2 rounded-xl border border-purple-900 text-gray-700 bg-gray-50 hover:bg-gray-200">Clear</button>
</div>


{error && <div className="mb-4 text-red-600">{error}</div>}


{loading ? (
<div>Loading...</div>
) : (
<div className="grid gap-3 max-h-[350px] overflow-y-auto">
{filtered.map((a) => (
<AppointmentCard key={a.id} appointment={a} onToggle={handleToggle} />
))}
</div>
)}
</div>
         

          {/* Booking Form */}
          <div
            className={`transition-opacity duration-300 ${
              showForm ? "opacity-100 relative" : "opacity-0 pointer-events-none absolute inset-0"
            }`}
          >
            <div className='flex flex-col'>
              <div className="text-[1.3rem] sm:text-[1.3rem] font-light tracking-wider leading-[1.35] text-purple-900 uppercase font-serif text-center">Make an Appointment</div>
              <BookingForm onDone={() => setShowForm(false)} />
            </div>
          </div>
        </div>
 </div>

</div>
);
}