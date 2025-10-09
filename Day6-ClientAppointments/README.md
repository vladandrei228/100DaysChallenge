# Booking App — React, TypeScript & Tailwind

## Project Description

This is a simple **Booking App** built with **React.js**, **TypeScript**, **Tailwind CSS** and **Supabase**.  
The app allows users to view a list of appointments, add new bookings, confirm or cancel appointments, and delete appointments. It also includes a clean, modern UI with a toggle to switch between the list of appointments and the booking form.

The project was created as part of a **100-day problem-solving challenge** focused on frontend and full-stack development.

---

## Features

- 📋 **Appointment List** – View and filter bookings.  
- 🧭 **Search Bar** – Search by client name or event type.  
- 🔁 **Toggle Switch** – Switch between list and add-new form.  
- ➕ **Booking Form** – Add new appointment.  
- 🗑️ **Delete Appointment** – Remove any booking.  
- ⚡ **Optimistic UI** – Instant visual feedback with error rollback.  
- 🎨 **Modern Design** – Minimalist interface with soft transitions and tailored color palette.  

---

## 🧩 Implemented API Calls

- `fetchAppointments()` – Fetch all appointments.  
- `updateAppointmentConfirmed(id: string, confirmed: boolean)` – Update confirmed status.  
- `createAppointment()` – **POST** new appointment.  
- `deleteAppointment()` – **DELETE** existing appointment.  

---

## ✅ Tasks Checklist

### 🏁 Initial Tasks (Day 7 Challenge)

- [ DONE ] Create a **list of appointments** using cards.  
- [ DONE ] Implement **search functionality** by client name and event type.  
- [ DONE ] Implement **optimistic UI** for confirming or cancelling appointments.  
- [ DONE ] Add a **toggle button** to switch between the appointment list and the booking form.  
- [ DONE ] Add a **booking form** for creating new appointments.  

---

### 💡 Extra Tasks (Improvements & Features Added)

- [ DONE ] Implemented **delete button** functionality for appointments.  
- [ DONE ] Added **POST and DELETE API calls** for Supabase backend.  
- [ DONE ] Created a **custom toggle button** with smooth transitions and dark purple theme.  
- [ DONE ] Designed a **minimalist booking form** for adding new appointments.  
- [ DONE ] Improved **main title styling** to contrast with the pale purple background.  
- [ DONE ] Enhanced **overall design** with tall, slim layout and cleaner card structure.  
- [ DONE ] Applied **purple background (bg-purple-100)** for a calming visual tone.  
- [ DONE ] Fixed **alignment issues** when toggling between views.
- [ DONE ] Used **optimistic UI updates** with rollback on API errors.  

## Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS  
- **Backend / API:** Typescript, Supabase  
- **Styling:** Tailwind CSS, responsive layout  

---

## Usage

1: Clone the repository:  

```bash
git clone <repository-url>
```

2: Install dependencies:

```bash
npm install
```

3: Run the development server:  

```bash
npm run dev
```

4: Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Future Improvements

- Add **date and time picker** with ISO date format.  
- Improve **error handling** and loading states.  
- Add **animations and transitions** to enhance UX.  
- Implement **user authentication** with Supabase.  
- Add **filtering by date or event type** for appointments.

---

This app demonstrates a combination of **frontend problem-solving**, **state management**, and **modern UI/UX design** using React and Tailwind.
