import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { EventType } from "../../types/types";
import CustomFetch from "../../config/db";
import EventForm from "../../components/EventForm";
import { toast } from "react-toastify";

const UpdateEventView = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType>();

  const navigate = useNavigate();
  const getEventById = async () => {
    const response = await CustomFetch.get(`/event/${id}`);
    setEvent(response.data.event);
  };

  const updateEventById = async (formData: FormData) => {
    try {
      await CustomFetch.put(`/event/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/from-data",
        },
      });
      toast.success("Event berhasil di update");
      navigate("/dashboard/event");
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalaha pada edit event");
    }
  };

  useEffect(() => {
    if (id) {
      getEventById();
    }
  }, [id]);
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold">Update Event</h1>
      {event && (
        <EventForm
          initialValue={{
            name: event.name,
            description: event.description,
            location: event.location,
            datetime: event.datetime.substring(0, 16),
            image: event.image,
          }}
          onSubmit={updateEventById}
        />
      )}
    </div>
  );
};

export default UpdateEventView;
