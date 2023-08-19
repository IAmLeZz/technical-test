import React from 'react'
import './History.css'

const History = ({ events }: { events: SpaceXEvent[] }) => {
  return (
    <div className="py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-200 mb-8">Events we are proud of</h1>
        <ul className="space-y-8">
          {events.map((event) => (
            <li key={event.id}>
              <div className="p-6 bg-white rounded-lg event-box">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                <p className="text-gray-600">{new Date(event.event_date_utc).toLocaleDateString()}</p>
                <p className="text-gray-700 mt-2">{event.details}</p>
                <a
                  href={event.links.article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Read more
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default History;