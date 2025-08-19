# Galon Consulting Services Website

A modern, responsive, and AI-powered consulting services website built with **Next.js 15+**, **Tailwind CSS 4+**, **shadcn/ui**, **Supabase** backend, and **Fireworks AI chatbot** integration.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Routes](#api-routes)
- [Booking System](#booking-system)
- [Contact Form](#contact-form)
- [AI Chatbot](#ai-chatbot)
- [Emails & Notifications](#emails--notifications)
- [SEO & Metadata](#seo--metadata)
- [Cron Jobs & Automation](#cron-jobs--automation)
- [Troubleshooting](#troubleshooting)
- [Maintenance & Handoff](#maintenance--handoff)
- [License](#license)

---

## Project Overview

This site is a tailored solution for Galon Consulting Services, LLC, providing healthcare consulting services with:

- Informational pages (Services, FAQ, About, Contact)
- Integrated multi-step booking system with double booking prevention
- Contact form connected to Supabase and email notifications
- AI chatbot powered by Fireworks with prompt-engineered business knowledge
- Daily and end-of-day email digests for leads and bookings
- SEO optimized with sitemap and robots.txt

---

## Features

- Responsive design with accessible navigation and components
- Glassmorphic UI styling for cards and modals
- Multi-step booking flow with calendar and time slot selection
- Real-time double booking validation via Supabase
- Custom AI chatbot embedded in a floating widget with message streaming or typing fallback
- Email notifications to business and customers using Resend service
- Scheduled daily digest emails with CSV exports
- Robust SEO metadata management and site indexing

---

## Tech Stack

- **Framework:** Next.js 15+ (app directory)
- **Styling:** Tailwind CSS 4+, CSS variables, shadcn/ui components
- **Backend:** Supabase (PostgreSQL + Storage)
- **Email:** Resend (SMTP + API)
- **AI:** Fireworks API
- **Utilities:** Lucide React icons, react-day-picker, TypeScript

---

## Prerequisites

- Node.js v18+
- npm or yarn
- Supabase account and project setup
- Resend account with verified domain
- Fireworks AI account and deployed models
- Vercel account for deployment (optional but recommended)

---
