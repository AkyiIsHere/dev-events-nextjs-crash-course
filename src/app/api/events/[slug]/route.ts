import { Event, IEvent } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        {
          message: "InvalidId or missing slug parameter.",
        },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    const event: IEvent | null = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    if (!event) {
      return NextResponse.json(
        {
          message: `Event with slug '${sanitizedSlug} not found.'`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event details fetched successfully", event },
      { status: 200 }
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching event by slug: ", err);
    }

    if (err instanceof Error) {
      if (err.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Event fetching failed", error: err },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
