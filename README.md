<div align="center">

# 🏥 CuraSync

### Full-Stack Healthcare Management Platform

**Connecting doctors and patients — seamlessly, securely, in real time.**

<br/>

![React](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-File_Handling-FF6600?style=for-the-badge&logoColor=white)

<br/>

CuraSync is a full-stack healthcare platform built to bridge the gap between doctors and patients through seamless appointment management, real-time communication, and critical health services. It supports two primary user roles — **Doctor** and **Patient** — each with dedicated dashboards and workflows. Beyond appointments, CuraSync offers an integrated **real-time chat system**, **file sharing**, and a unique **Blood Bank module** to make healthcare truly accessible.

</div>

---

## 📑 Table of Contents

1. [Key Features](#1--key-features)
2. [Tech Stack](#2-%EF%B8%8F-tech-stack)
3. [Pages & Modules](#3--pages--modules)
4. [Database Schema](#4-%EF%B8%8F-database-schema)
5. [Getting Started](#5--getting-started)
6. [Environment Variables](#6--environment-variables)
7. [Contributing](#7--contributing)
8. [License](#8--license)

---

## 1. ✨ Key Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **🔐 Two-Level Auth** | Separate Doctor and Patient accounts with JWT-secured role-based access |
| 2 | **📅 Appointment Management** | Book, reschedule, cancel, accept, and complete appointments end-to-end |
| 3 | **💬 Real-Time Chat** | Live Doctor ↔ Patient messaging via Socket.io with persistent chat history |
| 4 | **📁 File Sharing** | Share medical reports, prescriptions, and lab results directly within chat |
| 5 | **🩸 Blood Bank Module** | Search blood units, register as a donor, and submit blood requirement requests |
| 6 | **🩺 Doctor Dashboard** | Appointment stats, earnings overview, patient history, and availability toggle |
| 7 | **👤 Patient Profile** | Manage health profile, appointment history, chat logs, and donor status |
| 8 | **🔔 Notifications** | Unread message indicators and notification badges across dashboards |

---

## 2. 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React.js | Component-based UI with role-based routing |
| Backend | Node.js + Express.js | REST API and business logic |
| Database | PostgreSQL 14 | Relational data with ACID compliance |
| Authentication | JWT | Stateless, secure role-based auth |
| Real-Time | Socket.io | WebSocket-based live chat and notifications |
| File Handling | Multer / Cloudinary | Upload, store, and serve medical files |

---

## 3. 📋 Pages & Modules

### 🏠 Home Page
- Search bar to find doctors by name or specialty
- Top-rated doctor previews with profile cards
- Quick-access sections: About, Blood Bank, Contact Us
- Responsive navigation with role-based login/signup prompts

### 🩺 All Doctors Page
- Lists all registered and available doctors
- Filter by **specialty**, **availability**, or **fees**
- Doctor cards link to full appointment booking page

### 📅 Appointment Booking Page
- Full doctor profile: photo, specialty, qualifications, experience, bio
- Visual date and time slot selector
- Appointment saved to PostgreSQL on confirmation
- Unauthenticated users redirected to sign up

### 💬 Chat & File Sharing
- Real-time messaging between Doctor ↔ Patient post-booking
- Supports PDF reports, prescriptions, lab results, and scan images
- Chat history persisted in PostgreSQL and accessible anytime
- Files stored securely and downloadable by both parties

### 🩸 Blood Bank Module
- **Search Blood Units** — find available blood by group and location
- **Register as Donor** — submit blood group, location, and contact info
- **Blood Inventory** — hospital-linked accounts manage unit counts
- **Request Blood** — submit urgent requests matched against registered donors

### 👤 Patient Dashboard
- Editable profile: name, email, phone, DOB, gender, address, photo
- View upcoming and past appointments
- Access all doctor chat histories and shared files
- Donor registration status in Blood Bank section

### 🩺 Doctor Dashboard
- **Stats**: total appointments, patients attended, pending requests, earnings
- **Appointments Panel**: accept, mark complete, or cancel with full patient details
- **Chat Panel**: all active conversations with unread counts and file sharing
- **Profile Management**: update bio, fees, slots, availability status

---

## 4. 🗄️ Database Schema

```
users                     doctor_profiles            patient_profiles
┌──────────────────┐      ┌──────────────────────┐   ┌──────────────────────┐
│ user_id (PK)     │──┬──▶│ doctor_id (FK)       │   │ patient_id (FK)      │
│ name             │  │   │ specialty            │   │ date_of_birth        │
│ email (unique)   │  └──▶│ experience           │   │ gender               │
│ password (hash)  │      │ fees                 │   │ address              │
│ role             │      │ available_slots      │   │ profile_photo        │
│ created_at       │      │ availability_status  │   └──────────────────────┘
└──────────────────┘      └──────────────────────┘

appointments              messages                   file_attachments
┌──────────────────┐      ┌──────────────────────┐   ┌──────────────────────┐
│ appointment_id   │      │ message_id (PK)      │   │ file_id (PK)         │
│ doctor_id (FK)   │      │ sender_id (FK)       │   │ message_id (FK)      │
│ patient_id (FK)  │      │ receiver_id (FK)     │   │ appointment_id (FK)  │
│ date             │      │ content              │   │ file_url             │
│ time_slot        │      │ timestamp            │   │ file_type            │
│ status           │      │ is_read              │   │ uploaded_at          │
│ created_at       │      └──────────────────────┘   └──────────────────────┘
└──────────────────┘

blood_bank
┌──────────────────────┐
│ donor_id (PK)        │
│ user_id (FK)         │
│ blood_group          │
│ location             │
│ contact_info         │
│ units_available      │
│ registered_at        │
└──────────────────────┘
```

**Relationships:** `User` → role → `DoctorProfile` / `PatientProfile` → `Appointment` → `Messages` → `FileAttachments`

---

## 5. 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|------------|---------|
| Node.js | ≥ 18 |
| PostgreSQL | ≥ 14 |

### Steps

**1. Clone the Repository**
```bash
git clone https://github.com/aishani19/curasync.git
cd curasync
```

**2. Install Dependencies**
```bash
npm install
cd client && npm install
```

**3. Configure Environment Variables**

Create a `.env` file in the root directory — see [Environment Variables](#6--environment-variables) below.

**4. Run Database Migrations**
```bash
npm run migrate
```

**5. Start the Application**
```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Backend | `http://localhost:5000` |
| Frontend | `http://localhost:3000` |

---

## 6. 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/curasync
JWT_SECRET=your_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:3000
SOCKET_CORS_ORIGIN=http://localhost:3000
CLOUDINARY_URL=your_cloudinary_url
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `PORT` | ✅ | Backend server port |
| `CLIENT_URL` | ✅ | Frontend origin for CORS |
| `SOCKET_CORS_ORIGIN` | ✅ | Allowed origin for Socket.io |
| `CLOUDINARY_URL` | ❌ | Cloud file storage (or use local Multer) |

> ⚠️ **Never commit `.env` files.** Add them to `.gitignore`.

---

## 7. 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch — `git checkout -b feature/amazing-feature`
3. **Commit** your changes — `git commit -m "Add amazing feature"`
4. **Push** to the branch — `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 8. 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Aishani](https://github.com/aishani19)**

⭐ **Star this repo if you found it useful!**

</div>
