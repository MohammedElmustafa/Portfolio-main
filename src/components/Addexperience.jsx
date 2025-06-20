"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import Select from "react-select";
import { DatePicker } from "@mui/x-date-pickers";
import { colourStyles, locationTypeArrays, workTypeArrays } from "@/utils";

const AddexperienceFrom = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [position, setPosition] = useState("");
  const [institution, setInstitution] = useState("");
  const [description, setDescription] = useState("");
  const [workType, setWorkType] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");

  const reset = () => {
    setIndex("");
    setStartDate(new Date());
    setEndDate(new Date());
    setPosition("");
    setInstitution("");
    setDescription("");
    setWorkType("");
    setLocation("");
    setLocationType("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // إذا كان تاريخ النهاية يساوي التاريخ الحالي (الافتراضي) نفترض أن المستخدم يعني "Present"
    const isPresent = dayjs(endDate).isSame(dayjs(new Date()), "day");
    const data = {
      index: Number(index),
      year: {
        startDate: startDate,
        endDate: isPresent ? "Present" : endDate,
      },
      position: position,
      institution: institution,
      description: description,
      workType: workType,
      location: location,
      locationType: locationType,
    };
    try {
      const res = await axios.post("/api/experience", data);
      if (res.status === 200) {
        toast.success("Experience successfully posted");
        setTimeout(() => {
          reset();
        }, 2000);
      } else {
        toast.error("Failed to post experience");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black'>Index</label>
        <input
          type='text'
          name='index'
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          placeholder='Enter the index of the experience'
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black'
        />
      </div>
      <div className='my-2 flex items-center gap-2 justify-between'>
        <div className='my-2 flex flex-col w-full'>
          <label className='pb-2 dark:text-[#fff] text-black'>Start date</label>
          <DatePicker
            style={{ width: "100%" }}
            value={dayjs(startDate)}
            onChange={(newDate) => setStartDate(newDate)}
          />
        </div>
        <div className='my-2 flex flex-col w-full'>
          <label className='pb-2 dark:text-[#fff] text-black'>End date</label>
          <DatePicker
            style={{ width: "100%" }}
            value={dayjs(endDate)}
            onChange={(newDate) => setEndDate(newDate)}
          />
        </div>
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black'>Institution or Company</label>
        <input
          type='text'
          name='institution'
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder='Enter the institution or company name'
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black'
        />
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black'>Role or Position</label>
        <input
          type='text'
          name='position'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder='Enter the position'
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black'
        />
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black'>Description</label>
        <textarea
          rows={5}
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter the description'
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black'
        />
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black'>Work Type</label>
        <Select
          isClearable
          isSearchable
          className='basic-single bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-0 outline-none mb-4 dark:!text-[#fff] !text-black'
          classNamePrefix='select'
          name='workType'
          options={workTypeArrays}
          styles={colourStyles}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          onChange={(selectedOptions) =>
            setWorkType(selectedOptions.value || "")
          }
        />
      </div>
      <div className='my-2 flex items-center gap-2 justify-between'>
        <div className='my-2 flex flex-col w-full'>
          <label className='pb-2 dark:text-[#fff] text-black'>Location</label>
          <input
            type='text'
            name='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Enter the location'
            className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4 dark:text-[#fff] text-black'
          />
        </div>
        <div className='my-2 flex flex-col w-full'>
          <label className='pb-2 dark:text-[#fff] text-black'>Location Type</label>
          <Select
            isClearable
            isSearchable
            className='basic-single bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-0 outline-none mb-4 dark:!text-[#fff] !text-black'
            classNamePrefix='select'
            name='locationType'
            options={locationTypeArrays}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            styles={colourStyles}
            onChange={(selectedOptions) => {
              setLocationType(selectedOptions.value || "");
            }}
          />
        </div>
      </div>
      <button
        disabled={loading}
        className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#755BB4] text-center text-[#fff] rounded mt-8'
        onClick={onSubmit}
      >
        Create Experience
      </button>
    </form>
  );
};

export default AddexperienceFrom;
