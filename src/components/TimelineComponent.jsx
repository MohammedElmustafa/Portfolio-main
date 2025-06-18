"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

const TimelineComponent = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get("/api/experience");
        setExperiences(response.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);
  return (
    <div className="w-full flex justify-center py-32">
      <div className="px-40 max-[480px]:px-[20px] max-[890px]:px-[50px]">
        <div className="text-center">
          <h1 className="text-[44px] font-[500] max-[480px]:text-[32px]">
            My <span className="text-[#755BB4]">Education & Career</span> Timeline
          </h1>
          <br/>
        </div>
        <div className="mt-5 mx-auto w-full">
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
            className="max-[480px]:mx-auto !flex-col-reverse !p-0"
          >
            {experiences.map((item, index) => {
              const startYear = item.year?.startDate ? new Date(item.year.startDate).getFullYear() : "";
              const endYear =
                item.year?.endDate === "Present"
                  ? "Present"
                  : item.year?.endDate
                  ? new Date(item.year.endDate).getFullYear()
                  : "";
              return (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "white" }}>
                      {item.workType === "Student" ? (
                        <SchoolIcon style={{ color: "#755BB4" }} />
                      ) : (
                        <WorkIcon style={{ color: "#755BB4" }} />
                      )}
                    </TimelineDot>
                    <TimelineConnector style={{ backgroundColor: "#755BB4" }} />
                  </TimelineSeparator>
                  <TimelineContent className="py-3 px-1 glass !mb-3">
                    <div className="mb-2 flex items-center justify-between max-[480px]:flex-col max-[480px]:items-start">
                      <h4 className="text-[18px] text-[#755BB4] font-[600]">
                        {item.institution}
                      </h4>
                      <p className="text-[14px] dark:text-white text-black font-[500]">
                        {startYear} {endYear && `- ${endYear}`}
                      </p>
                    </div>
                    <p className="text-[14px] dark:text-white text-black font-[500] text-justify">
                      {item.description}
                    </p>
                    <div className="flex max-[480px]:flex-col gap-2 max-[480px]:gap-1 mt-3">
                      {item.position && (
                        <p className="text-[14px] dark:text-white text-black font-[500]">
                          <span className="text-[#755BB4] font-[600] text-[14px]">
                            Position:{" "}
                          </span>
                          {item.position}
                        </p>
                      )}
                      {item.location && (
                        <p className="text-[14px] dark:text-white text-black font-[500]">
                          <span className="text-[#755BB4] font-[600] text-[14px]">
                            Location:{" "}
                          </span>
                          {item.location}
                        </p>
                      )}
                      {item.locationType && (
                        <p className="text-[14px] dark:text-white text-black font-[500]">
                          <span className="text-[#755BB4] font-[600] text-[14px]">
                            Location Type:{" "}
                          </span>
                          {item.locationType}
                        </p>
                      )}
                    </div>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </div>
      </div>
    </div>
  );
};
export default TimelineComponent;
