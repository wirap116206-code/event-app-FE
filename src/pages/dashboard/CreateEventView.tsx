import { useNavigate } from "react-router";
import EventForm from "../../components/EventForm";
import CustomFetch from "../../config/db";
import { toast } from "react-toastify";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { Link } from "react-router";

const CreateEventView = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData: FormData) => {
    try {
      await CustomFetch.post("/event", formData);

      toast.success("Berhasil Membuat Event");
      navigate("/dashboard/event");
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat event");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/dashboard/event"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
            <CalendarPlus size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Create New Event
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the details below to publish your event.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <EventForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateEventView;
