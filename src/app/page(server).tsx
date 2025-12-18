import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import axios from "axios";

const baseUrl = process.env.INTERNAL_BASE_URL;
<<<<<<< Updated upstream
console.log(baseUrl);
=======
// console.log(baseUrl);
>>>>>>> Stashed changes

const Page = async () => {
  let events: IEvent[] = [];

  try {
    const response = await axios.get(`${baseUrl}/api/events`);
    events = response.data.events;
  } catch (err) {
    // console.error("Error fetching events: ", err);

    let message = "Data fetching failed";
    if (axios.isAxiosError(err) && err.response) {
      message = `Server Error: ${err.response.status} - ${err.response.statusText}`;
    } else if (err instanceof Error) {
      message = err.message;
    }

    // Throwing the error breaks the execution and triggers the error.js component
    throw new Error(message);
  }

  return (
    <section className="mt-10 px-5">
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferernces, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        {events.length > 0 ? (
          <ul className="events">
            {events.map((event) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No featured events are available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default Page;
