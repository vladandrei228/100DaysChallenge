import type { Appointment } from '../types';
import { supabase } from '../supabaseClient';


export async function fetchAppointments(): Promise<Appointment[]> {
const { data, error } = await supabase
.from('appointments')
.select('*')
.order('date', { ascending: true });


if (error) throw error;
return (data || []) as Appointment[];
}


export async function updateAppointmentConfirmed(id: string, confirmed: boolean) {
const { data, error } = await supabase
.from('appointments')
.update({ confirmed })
.eq('id', id)
.select()
.single();


if (error) throw error;
return data as Appointment;
}

export async function deleteAppointment(id: string){
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) throw error;
}

export async function insertAppointment(payload: Omit<Appointment, 'id'>){
    const { data, error } = await supabase
    .from('appointments')
    .insert([payload])
    .select()
    .single();
    
    if(error) throw error;
    return data as Appointment;
}