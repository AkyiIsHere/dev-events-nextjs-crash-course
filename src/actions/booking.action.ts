'use server';

import { Booking } from "@/database";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export const createBooking = async({eventId, slug, email}: {eventId: mongoose.Types.ObjectId, slug: string, email:string}) => {
    try {
        await connectDB();

        await Booking.create({eventId, slug, email});
        return {success: true}
    } catch (err) {
        console.error("create booking failed", err);
        return {success: false}
    }
}