import IconGrid from "@/public/icons/IconGrid";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconCheck from "@/public/icons/iconCheck";
import IconStopwatch from "@/public/icons/IconStopwatch"


export const navItems = [
  {
    icon: <IconGrid />,
    title: "All",
    link: "/",
  },
  {
    icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
    title: "Completed",
    link: "/completed",
  },
  {
    icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
    title: "Pending",
    link: "/pending",
  },
  {
    icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
    title: "Overdue",
    link: "/overdue",
  },
];
