import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export type Task = {
  id: number;
  title: string;
  author: string;
  status: "pending" | "working" | "completed";
};


// TODO: Implement fetchTasks()
export async function fetchTasks():Promise<Task[]> {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Error fetching tasks:", error);
      return [];
    } 
    return (data as Task[]) || [];
  }

  // TODO: Implement addTask()
export async function addTask(title: string, author:string, status: Task["status"] = "pending"):Promise<Task | undefined> {

    const { data, error } = await supabase
      .from("tasks")
      .insert({ title, author, status })
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
      throw error;
    } else if (data) {
      return data;
    }
  }

  // TODO: Implement updateStatus()
export async function updateStatus(id: number, current: Task["status"]):Promise<void> {
    const { data, error } = await supabase
      .from("tasks")
      .update({ status: current })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating status:", error);
    } else if (data) {
      return data;
    }
    
  }

  // TODO: Implement deleteTask()
export async function deleteTask(id: number):Promise<void> {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if(error){
      console.error("Error deleting task:", error);
    }else{
        return;
    }
  }

export async function clearAllTasks():Promise<void> {
    const { error } = await supabase.from("tasks").delete().neq("id", 0);
    if(error){
      console.error("Error clearing tasks:", error);
    }else{
        return;
    };
}

export async function filterTasksByStatus(status: Task["status"]):Promise<Task[]> {
  const { data, error } = await supabase.from("tasks").select("*").eq("status", status);
  if(error){
    console.error("Error filtering tasks:", error);
    return [];
  }else {
    return (data as Task[]) || [];
  }
}

export async function counterTasksByStatus(status: Task["status"]):Promise<number> {
  const { count, error } = await supabase.from("tasks").select("*", { count: "exact", head: true}).eq("status", status);
  if(error){
    console.error("Error counting tasks:", error);
    return 0;
  }else {
    return count || 0;
  }
}