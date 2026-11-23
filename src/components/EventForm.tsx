import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { EventFormData } from "../types/types";
import {
  ImagePlus,
  CalendarDays,
  MapPin,
  Type,
  AlignLeft,
  X,
} from "lucide-react";

interface Props {
  initialValue?: Partial<EventFormData>;
  onSubmit: (formData: FormData) => void;
}

const EventForm = ({ initialValue, onSubmit }: Props) => {
  const [name, setName] = useState(initialValue?.name ?? "");
  const [description, setDescription] = useState(
    initialValue?.description ?? "",
  );
  const [location, setLocation] = useState(initialValue?.location ?? "");
  const [datetime, setDatetime] = useState(initialValue?.datetime ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreview("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    const dateTime = new Date(datetime);

    data.append("name", name);
    data.append("description", description);
    data.append("location", location);
    data.append("datetime", dateTime.toISOString());

    if (imageFile) {
      data.append("image", imageFile);
    }

    onSubmit(data);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name!);
      setDescription(initialValue.description!);
      setLocation(initialValue.location!);
      setDatetime(initialValue.datetime!);

      if (initialValue.image) {
        setPreview(initialValue.image);
      }
    }
  }, [initialValue]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Event Name */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Type size={16} className="text-indigo-600" />
          Event Name
        </label>

        <input
          type="text"
          placeholder="Enter your event name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <AlignLeft size={16} className="text-indigo-600" />
          Description
        </label>

        <textarea
          rows={5}
          placeholder="Tell people more about your event..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} resize-y`}
          required
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <MapPin size={16} className="text-indigo-600" />
          Location
        </label>

        <input
          type="text"
          placeholder="Enter event location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {/* Date & Time */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <CalendarDays size={16} className="text-indigo-600" />
          Date & Time
        </label>

        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ImagePlus size={16} className="text-indigo-600" />
          Event Cover
        </label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50">
          <div className="mb-3 rounded-full bg-indigo-100 p-4 text-indigo-600">
            <ImagePlus size={28} />
          </div>

          <p className="text-sm font-semibold text-slate-700">
            Click to upload an image
          </p>

          <p className="mt-1 text-xs text-slate-400">PNG, JPG or JPEG</p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e.target.files?.[0])}
          />
        </label>

        {/* Image Preview */}
        {preview ? (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
            <img
              src={preview}
              alt="Event preview"
              className="h-64 w-full rounded-xl object-cover"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-4 top-4 rounded-full bg-red-500 p-2 text-white shadow-lg transition hover:bg-red-600"
              aria-label="Remove image"
            >
              <X size={18} />
            </button>

            <p className="px-2 py-2 text-xs text-slate-500">
              {imageFile?.name}
            </p>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
            <div className="text-center">
              <ImagePlus size={28} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">No image selected</p>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="border-t border-slate-100 pt-5">
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0"
        >
          Save Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
