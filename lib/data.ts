import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

export const links = [
    {
        name: "Home",
        hash: "#home",
    },
    {
        name: "Cart",
        hash: "#cart",
    },
    {
        name: "Account",
        hash: "#account",
    },
    {
        name: "Products",
        hash: "/Products",
    }

] as const;

export const experiencesData = [
    {
        title: "Shri Shankaracharya Technical Campus",
        location: "Durg, Chhattisgarh",
        description:
            "I earned my Bachelor of Technology in Computer Science, navigating a diverse range of technologies and languages, and crafting enduring memories along the way.",
        icon: React.createElement(LuGraduationCap),
        date: "2019-2023",
    },
    {
        title: "Back-End Developer",
        location: "Work from Home",
        description:
            "I worked as a Backend developer, initially hired as a intern then worked for 2 months as full time emplyoee",
        icon: React.createElement(CgWorkAlt),
        date: "08/2023 - 10/2023",
    },
    {
        title: "Full Stack Developer",
        location: "Work from Home",
        description:
            "Redesigned Company website, Working on multiple products to be deployed to covert incoming traffic into protential clients",
        icon: React.createElement(CgWorkAlt),
        date: "02/2024 - present",
    },
    {
        title: "Seeking Software Role",
        location: "Open to work Anywhere",
        description:
            "I'm now a full-stack developer learning and growing everyday seeking new opportunities,I'm open to full-time, Part-time opportunities.",
        icon: React.createElement(FaReact),
        date: "present",
    },
] as const;

