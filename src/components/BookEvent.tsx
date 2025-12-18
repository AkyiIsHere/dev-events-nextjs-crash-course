"use client";

import { createBooking } from "@/actions/booking.action";
import mongoose from "mongoose";
import { useState } from "react";

const BookEvent = ({eventId, slug}: {eventId: mongoose.Types.ObjectId, slug: string}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(eventId)
    const {success} = await createBooking({eventId, slug, email})
    
    if(success){
      setSubmitted(true);
    } else {
      console.error('Booking creation failed')
    }
  }

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <button type="submit" className="button-submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
