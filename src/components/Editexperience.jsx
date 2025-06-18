"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Select from "react-select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { colourStyles, workTypeArrays, locationTypeArrays } from "@/utils";

const EditExperience = ({ experienceId }) => {
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [institution, setInstitution] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [workType, setWorkType] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");

  useEffect(() => {
    const getExperienceData = async () => {
      setLoadingData(true);
      try {
        const res = await axios.get(`/api/experience/${experienceId}`);
        const data = res.data;
        setIndex(data.index);
        setStartDate(new Date(data.year.startDate));
        setEndDate(data.year.endDate === "Present" ? new Date() : new Date(data.year.endDate));
        setInstitution(data.institution);
        setPosition(data.position);
        setDescription(data.description);
        setWorkType(data.workType);
        setLocation(data.location);
        setLocationType(data.locationType);
      } catch (error) {
        console.error("Error fetching experience data", error);
        toast.error("Failed to fetch experience data");
      } finally {
        setLoadingData(false);
      }
    };
    if (experienceId) {
      getExperienceData();
    }
  }, [experienceId]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isPresent = dayjs(endDate).isSame(dayjs(new Date()), "day");
    const data = {
      index: Number(index),
      year: {
        startDate,
        endDate: isPresent ? "Present" : endDate,
      },
      institution,
      position,
      description,
      workType,
      location,
      locationType,
    };
    try {
      const res = await axios.put(`/api/experience/${experienceId}`, data);
      if (res.status === 200) {
        toast.success("Experience successfully edited");
        setTimeout(() => {
          router.push("/admin/allexperience");
        }, 2000);
      } else {
        toast.error("Failed to edit experience");
      }
    } catch (error) {
      console.error("Error editing experience", error);
      toast.error("An error occurred while editing experience");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <p>Loading...</p>;

  return (
    <form>
      <div className="my-2 flex flex-col">
        <label className="pb-2 dark:text-[#fff] text-black">Index</label>
        <input
          type="number"
          name="index"
          value={index}
          placeholder="Enter the index"
          onChange={(e) => setIndex(e.target.value)}
          className="bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] 
                     rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black"
        />
      </div>

      <div className="my-2 flex items-center gap-2">
        <div className="flex flex-col w-full">
          <label className="pb-2 dark:text-[#fff] text-black">Start Date</label>
          <DatePicker
            style={{ width: "100%" }}
            value={dayjs(startDate)}
            onChange={(newDate) => setStartDate(newDate)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="pb-2 dark:text-[#fff] text-black">End Date</label>
          <DatePicker
            style={{ width: "100%" }}
            value={dayjs(endDate)}
            onChange={(newDate) => setEndDate(newDate)}
          />
        </div>
      </div>

      <div className="my-2 flex flex-col">
        <label className="pb-2 dark:text-[#fff] text-black">Institution or Company</label>
        <input
          type="text"
          name="institution"
          value={institution}
          placeholder="Enter the institution or company name"
          onChange={(e) => setInstitution(e.target.value)}
          className="bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd]
                     rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black"
        />
      </div>

      <div className="my-2 flex flex-col">
        <label className="pb-2 dark:text-[#fff] text-black">Role or Position</label>
        <input
          type="text"
          name="position"
          value={position}
          placeholder="Enter the role or position"
          onChange={(e) => setPosition(e.target.value)}
          className="bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd]
                     rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black"
        />
      </div>

      <div className="my-2 flex flex-col">
        <label className="pb-2 dark:text-[#fff] text-black">Description</label>
        <textarea
          rows={5}
          name="description"
          value={description}
          placeholder="Enter the description"
          onChange={(e) => setDescription(e.target.value)}
          className="bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd]
                     rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black"
        />
      </div>

      <div className="my-2 flex flex-col">
        <label className="pb-2 dark:text-[#fff] text-black">Work Type</label>
        <Select
          isClearable
          isSearchable
          className="basic-single bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd]
                     rounded-[5px] p-0 outline-none mb-4 dark:!text-[#fff] !text-black"
          classNamePrefix="select"
          name="workType"
          options={workTypeArrays}
          styles={colourStyles}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          onChange={(selectedOption) =>
            setWorkType(selectedOption ? selectedOption.value : "")
          }
          value={workTypeArrays.find(option => option.value === workType)}
        />
      </div>

      <div className="my-2 flex flex-col">
        <label className="pb-2 dark:text-[#fff] text-black">Location</label>
        <input
          type="text"
          name="location"
          value={location}
          placeholder="Enter the location"
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd]
                     rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black"
        />
      </div>

      <div className="my-2 flex flex-col">
        <label className="pb-2 dark:text-[#fff] text-black">Location Type</label>
        <Select
          isClearable
          isSearchable
          className="basic-single bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd]
                     rounded-[5px] p-0 outline-none mb-4 dark:!text-[#fff] !text-black"
          classNamePrefix="select"
          name="locationType"
          options={locationTypeArrays}
          styles={colourStyles}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          onChange={(selectedOption) =>
            setLocationType(selectedOption ? selectedOption.value : "")
          }
          value={locationTypeArrays.find(option => option.value === locationType)}
        />
      </div>

      <button
        disabled={loading}
        className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#755BB4] text-center text-[#fff] rounded mt-8"
        onClick={submit}
      >
        Edit Experience
      </button>
    </form>
  );
};

export default EditExperience;