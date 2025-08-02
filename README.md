# Room Booking System

This is a simple Room Booking System built with **Node.js**, **Express.js**, and **Sequelize** for managing room bookings, checking availability, and handling user roles via **Role-Based Access Control (RBAC)**.

## Features

- User registration and login (JWT-based authentication)
- Room booking management
- Availability checking for rooms
- Role-based access (Admin access to get all users)

## Installation

Follow these steps to set up the project:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/room-booking-system.git
cd room-booking-system


npx sequelize-cli db:migrate
