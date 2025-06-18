"use client";
import { useGetAllblog, useGetAllExperience, useGetAllProject, useGetAllSuggestion } from "@/hooks";
import { createContext, useContext } from "react";

export const Global = createContext();

export const GlobalContext = ({ children }) => {
    const {
        data: blogAllData,
        isLoading: isBlogLoading,
        setData: setBlogAllData,
    } = useGetAllblog();
    const {
        data: projectAllData,
        isLoading: isProjectLoading,
        setData: setProjectAllData,
    } = useGetAllProject();
    const {
        data: suggestionAllData,
        isLoading: isSuggestionLoading,
        setData: setSuggestionAllData,
    } = useGetAllSuggestion();
    const {
        data: experienceAllData,
        isloading: isExperienceLoading,
        setData: setExperienceAllData,
    } = useGetAllExperience();

    return (
        <Global.Provider
            value={{
                blogAllData,
                setBlogAllData,
                isBlogLoading,
                experienceAllData,
                setExperienceAllData,
                isExperienceLoading,
                projectAllData,
                isProjectLoading,
                setProjectAllData,
                suggestionAllData,
                isSuggestionLoading,
                setSuggestionAllData,
            }}
        >
            {children}
        </Global.Provider>
    );
};
export const useGlobalContext = () => {
    return useContext(Global);
};
