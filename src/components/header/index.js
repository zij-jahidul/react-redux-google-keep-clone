import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";

const Header = () => {
  return (
    <header className="bg-primary py-4 px-2.5 md:pt-8 md:pb-6 text-white font-league">
      <div className="max-w-container m-auto">
        <h1 className="text-4xl lg:text-5xl font-bold">
          <EventNoteIcon fontSize="48px" className="mb-2" /> Google-keep
        </h1>
      </div>
    </header>
  );
};

export default Header;
