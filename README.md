**CuraSync** is a full-stack healthcare platform built to bridge the gap between doctors and patients through seamless appointment management, real-time communication, and critical health services. It supports two primary user roles — **Doctor** and **Patient** — each with dedicated dashboards and workflows. Beyond appointments, CuraSync offers an integrated **real-time chat system**, **file sharing**, and a unique **Blood Bank module** to make healthcare truly accessible. Built on the **PostgreSQL + Express.js + React.js + Node.js** stack, CuraSync is designed for reliability and scalability.

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Token (JWT)
- **Real-time**: WebSockets (Socket.io)
- **File Handling**: Multer / Cloud Storage

---

## 🔑 Key Features

### 1. Two-Level Authentication

- **Patient Account**:
  - Sign up, log in, and manage a personal health profile.
  - Book, view, reschedule, or cancel appointments with doctors.
  - Chat in real time with doctors and share medical files (reports, prescriptions, scans).
  - Access Blood Bank — search for available blood units or register as a donor.

- **Doctor Account**:
  - Sign up and set up a professional profile (specialty, experience, fees).
  - Manage all incoming appointments — accept, complete, or cancel.
  - Chat with patients and receive or send files directly within the platform.
  - Dashboard with appointment stats, earnings overview, and patient history.

---

## 🏠 Home Page

- Clean, accessible landing with a **search bar** to find doctors by name or specialty.
- Highlights **top-rated doctors** with profile previews.
- Quick-access sections: About CuraSync, Blood Bank, Contact Us.
- Responsive navigation with role-based login/signup prompts.

---

## 🩺 All Doctors Page

- Lists all registered and available doctors.
- Filter by **specialty**, **availability**, or **fees**.
- Clicking a doctor card navigates to their full **Appointment Booking Page**.

---

## 📅 Appointment Booking Page

- Displays the doctor's full profile:
  - Photo, name, specialty, qualifications, experience, and bio.
  - Available date and time slots.
- Patients select a slot and confirm the appointment.
- Appointment details saved securely to PostgreSQL.
- Patients must be **logged in** to book — unauthenticated users are redirected to sign up.

---

## 💬 Chat & File Sharing

- Real-time messaging between **Doctor ↔ Patient** after an appointment is booked.
- Supports sharing of:
  - Medical reports (PDF, images)
  - Prescriptions
  - Lab results and scan files
- Chat history is **persisted in PostgreSQL** and accessible anytime.
- Files are stored securely and downloadable by both parties.
- Unread message indicators and notification badges on the dashboard.

---

## 🩸 Blood Bank Module

A unique feature that makes CuraSync more than just an appointment platform.

- **Search Blood Units**: Patients or their representatives can search for available blood by blood group and location.
- **Register as Donor**: Users can register themselves as blood donors with their blood group, location, and contact info.
- **Blood Inventory**: Admins or hospital-linked accounts can update available blood unit counts.
- **Request Blood**: Submit a blood requirement request with urgency level — matched against registered donors.

---

## 👤 Patient Profile

- Editable profile: name, email, phone, date of birth, gender, address, profile photo.
- View all **upcoming and past appointments**.
- Access **chat history** with all doctors.
- Download previously shared files.
- Donor registration status visible in the Blood Bank section.
- Logout option.

---

## 🩺 Doctor Dashboard

- **Overview Stats**:
  - Total appointments, patients attended, pending requests, total earnings.
- **Appointments Panel**:
  - Full list with patient name, date, time, and status.
  - Actions: **Accept**, **Mark as Completed**, **Cancel**.
- **Chat Panel**:
  - All active patient conversations with unread counts.
  - File send/receive within chat.
- **Profile Management**:
  - Update bio, specialty, fees, address, available time slots, and profile photo.
  - Toggle availability status (available / on leave).

---

## 🗄️ Database — PostgreSQL

CuraSync uses **PostgreSQL** as its relational database, chosen for:
- Strong data integrity with foreign key constraints across Users, Appointments, Messages, and Blood Bank tables.
- Efficient complex queries (joins across patients, doctors, appointments, and chat logs).
- ACID compliance for reliable appointment and payment transactions.

**Core Tables**:
- `users` — shared user table with role field (`doctor` / `patient`)
- `doctor_profiles` — extended profile info for doctors
- `patient_profiles` — extended profile info for patients
- `appointments` — booking records with status tracking
- `messages` — chat messages with sender, receiver, and timestamps
- `file_attachments` — file metadata linked to messages or appointments
- `blood_bank` — donor registry and blood unit availability
## 🌐 Project Setup

### Prerequisites
- Node.js v18+
- PostgreSQL 14+

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/curasync.git
   cd curasync
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   cd client && npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/curasync
   JWT_SECRET=your_jwt_secret
   PORT=5000
   CLIENT_URL=http://localhost:3000
   SOCKET_CORS_ORIGIN=http://localhost:3000
   CLOUDINARY_URL=your_cloudinary_url   # or local Multer config
   ```

4. **Run Database Migrations**:
   ```bash
   npm run migrate
   ```

5. **Start the Application**:
   ```bash
   npm run dev
   ```


