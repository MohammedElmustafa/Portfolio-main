"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const AdminExperienceCard = ({ experience, data, setData }) => {
  const router = useRouter();

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`/api/experience/${experience._id}`);
      if (res.status === 200 || res.statusText === "OK") {
        toast.success("Experience successfully deleted");
        setData(data.filter((item) => item._id !== experience._id));
      } else {
        toast.error("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience", error);
      toast.error("An error occurred");
    }
  };
  return (
    <div className="w-full glass rounded-3xl">
      <div className="h-[100px] flex justify-center items-center">
        {
          experience.workType === "Student" ? (
          <SchoolIcon style={{ color: "#755BB4" }} />
        ) : (
          <WorkIcon style={{ color: "#755BB4" }} />
        )
        }
      </div>
      <div className="w-full py-2 px-4 mt-2">
        <div className="flex items-center justify-end gap-3">
          <MdModeEdit
            onClick={() => router.push(`/admin/editexperience/${experience._id}`)}
            className="dark:text-white text-[20px] mr-2 text-black cursor-pointer"
          />
          <AiOutlineDelete
            onClick={deleteHandler}
            className="dark:text-white text-[20px] mr-2 text-black cursor-pointer"
          />
        </div>
        <h1 className="text-[18px] font-[600] text-start text-[#755BB4]">
          {experience.institution} - {experience.position}
        </h1>
        <p className="text-[14px] dark:text-white text-black font-[500] text-justify">
          {experience.description.substring(0, 250)}
        </p>
        <p className="text-[14px] dark:text-white text-black font-[500]">
          {new Date(experience.year.startDate).getFullYear()} -{" "}
          {experience.year.endDate === "Present"
            ? "Present"
            : new Date(experience.year.endDate).getFullYear()}
        </p>
      </div>
    </div>
  );
};
export default AdminExperienceCard;