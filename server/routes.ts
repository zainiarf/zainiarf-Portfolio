import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";
import { contactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate incoming data using zod schema
      const contactData = contactSchema.parse(req.body);
      
      // Create a nodemailer transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "user@example.com",
          pass: process.env.EMAIL_PASS || "password",
        },
      });
      
      // Email template to admin
      const mailOptions = {
        from: process.env.EMAIL_USER || "user@example.com",
        to: "hello@zainiarf.com", // Admin email
        subject: `Contact Form: ${contactData.subject || "New Message"}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Subject:</strong> ${contactData.subject || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message}</p>
        `,
      };
      
      // Log contact message to storage for record keeping
      await storage.createContactMessage(contactData);
      
      // In development or if email credentials not set, just log and return success
      if (process.env.NODE_ENV === "development" || !process.env.EMAIL_USER) {
        console.log("Contact form submitted:", contactData);
        return res.status(200).json({ message: "Message received! (Email sending skipped in development)" });
      }
      
      // Send the email
      await transporter.sendMail(mailOptions);
      
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      
      console.error("Error sending contact form:", error);
      res.status(500).json({ message: "Failed to send message. Please try again later." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
