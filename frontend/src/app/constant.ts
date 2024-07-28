import { string } from "zod";

export interface DashboardItemType {
  imageUrl: string;
  text: string;
  pathUrl: string;
}

export const dashboardItems: DashboardItemType[] = [
  {
    imageUrl: "/dashboard/framehome.png",
    text: "Home",
    pathUrl: "/home",
  },
  {
    imageUrl: "/dashboard/frameboard.png",
    text: "Boards",
    pathUrl: "boards",
  },
  {
    imageUrl: "/dashboard/framesettings.png",
    text: "Settings",
    pathUrl: "app/users",
  },
  {
    imageUrl: "/dashboard/frameteam.png",
    text: "Teams",
    pathUrl: "app/budget",
  },
  {
    imageUrl: "/dashboard/frameanalytics.png",
    text: "Analytics",
    pathUrl: "app/projects",
  },
];

export interface CardItemType {
  title: string;
  description: string;
  imageUrl: string;
}

export const cardItems: CardItemType[] = [
  {
    title: "Introducing Tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    imageUrl: "/dashboard/card1.png",
  },
  {
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    imageUrl: "/dashboard/card2.png",
  },
  {
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    imageUrl: "/dashboard/card3.png",
  },
];

interface columnType {
  id: number;
  title: string;
}

export const columnItems: columnType[] = [
  {
    id: 1,
    title: "To Do",
  },
  {
    id: 2,
    title: "In Progress",
  },
  {
    id: 3,
    title: "Under review",
  },
  {
    id: 4,
    title: "Finished",
  },
];
