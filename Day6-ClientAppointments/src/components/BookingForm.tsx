import {useState} from 'react';
import { insertAppointment } from '../api/appointments';

type Props = {
    onDone?: () => void;
}

export default function BookingForm({onDone}: Props) {
    const [clientName, setClientName] = useState('');
    const [date, setDate] = useState('');
    const [eventType, setEventType] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            await insertAppointment({client_name: clientName, date, event_type: eventType, confirmed});
            setClientName('');
            setDate('');
            setEventType('');
            setConfirmed(false);
            onDone?.();
        } catch (err) {
            if(err) {
                setError("An error occurred, the booking was not created. Please try again!");
            }
        } finally {
            setLoading(false);
        }    
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 items-center flex flex-col">

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-800 font-extrabold">{error}</div>}
            <input type='text' placeholder='Client Name' value={clientName} onChange={(e) => setClientName(e.target.value)} className="p-4 rounded-2xl shadow-sm border flex items-center justify-between w-full" />
            <input title='Date' type='date' value={date} onChange={(e) => setDate(e.target.value)} className="p-4 rounded-2xl shadow-sm border flex items-center justify-between w-full"/>
            <input type="text" placeholder='Event Type' value={eventType} onChange={(e) => setEventType(e.target.value)} className="p-4 rounded-2xl shadow-sm border flex items-center justify-between w-full" />
            
            <input type="submit" value="Make Appointment" className="bg-purple-400 text-white hover:bg-purple-600 border border-purple-900 py-2 px-4 rounded-full px-2 py-1 " />
        </form>
    )
}