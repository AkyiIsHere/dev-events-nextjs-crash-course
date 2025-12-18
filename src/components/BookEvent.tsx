"use client";

<<<<<<< Updated upstream
import { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(()=>{
        setSubmitted(true);
    }, 1000)
=======
import { createBooking } from "@/actions/booking.action";
import mongoose from "mongoose";
import { useState } from "react";

const BookEvent = ({eventId, slug}: {eventId: mongoose.Types.ObjectId, slug: string}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {success, error} = await createBooking({eventId, slug, email})
    
    if(success){
      setSubmitted(true);
    } else {
      console.error('Booking creation failed', error)
    }
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              onChange={(e) => e.target.value}
=======
              onChange={(e) => setEmail(e.target.value)}
>>>>>>> Stashed changes
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
