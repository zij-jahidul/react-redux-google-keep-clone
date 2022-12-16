import React, { useState } from "react";
import { Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CheckIcon from "@mui/icons-material/Check";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getDatabase, ref, set, push } from "firebase/database";
import { useDispatch } from "react-redux";
import { changeState } from "../../features/noteApp/changeSlice";

const NoteCreator = () => {
  let dispatch = useDispatch();

  const db = getDatabase();
  const notesRef = ref(db, "notes");

  const [isExpanded, setIsExpanded] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [errMSg, setErrMSg] = useState("");
  const [isExpandedSuccess, setIsExpandedSuccess] = useState(false);

  const expandCreateArea = () => {
    setIsExpanded(true);
  };

  const minimizeNoteCreator = (e) => {
    e.preventDefault();
    setIsExpanded(false);
    setErrMSg("");
  };

  const handleNoteTitle = (e) => {
    setNoteTitle(e.target.value);
    setErrMSg("");
  };

  const handleNoteBody = (e) => {
    setNoteBody(e.target.value);
    setErrMSg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteTitle === "") {
      setErrMSg(`You must give a title for your note!`);
    } else if (noteTitle.length > 45) {
      setErrMSg(`The title must not exceed 45 characters!`);
    } else if (noteBody === "") {
      setErrMSg(`Your note can't be empty!`);
    } else {
      set(push(notesRef), {
        noteTitle: noteTitle,
        noteBody: noteBody,
      }).then(() => {
        dispatch(changeState());
        setNoteTitle("");
        setNoteBody("");
      });
      setIsExpanded(false);
      setIsExpandedSuccess(true);
    }
  };

  const handleSuccess = () => {
    setIsExpandedSuccess(false);
  };

  return (
    <section
      className={`bg-black/10 ${isExpanded ? "py-10" : "py-8"} font-league`}
    >
      <div className="lg:max-w-container m-auto animate-[popUp_.4s_ease_1] px-5 lg:px-0">
        <div
          className={`${
            noteBody.length > 500 ? "lg:w-3/4" : "lg:w-3/5"
          } text-blackish bg-white m-auto border-2 rounded-2xl relative shadow-lg linear duration-300 lg:px-2`}
        >
          {/* note creating form starts */}
          <form
            className={`flex flex-col gap-1 lg:gap-3 px-4 pt-1 lg:px-6 lg:pt-3 ${
              isExpanded ? "pb-5 lg:pb-10" : "pb-1 lg:pb-3"
            } linear duration-300`}
          >
            {isExpanded && (
              <input
                className="pt-4 text-xl lg:text-[23px] font-semibold outline-none border-none rounded-t-2xl linear duration-300 w-full"
                placeholder="Title"
                value={noteTitle}
                onChange={handleNoteTitle}
              />
            )}

            <textarea
              className={`${
                isExpanded
                  ? `pt-1 pb-6 ${noteBody.length > 500 && "h-96"}`
                  : "py-4 cursor-pointer"
              } text-lg lg:text-[22px] outline-none border-none rounded-b-2xl resize-none linear duration-300 w-full animate-[popUp_.4s_ease_1] text-justify`}
              placeholder="Take a note here"
              rows={isExpanded ? 4 : 1}
              value={isExpanded ? noteBody : ""}
              onChange={handleNoteBody}
              onClick={expandCreateArea}
            />

            {/* error message */}
            {errMSg !== "" && (
              <p className="mt-4 text-base lg:text-xl text-[red] animate-[popUpY_.3s_ease_1]">
                {errMSg}
              </p>
            )}
            {/* error message */}

            {/* note add button */}
            <Zoom in={isExpanded}>
              <button
                className="absolute top-[90%] right-[3%] lg:right-5 bg-primary w-[38px] lg:w-[53px] h-[38px] lg:h-[53px] rounded-full flex items-center justify-center shadow-lg hover:bg-[#c4c4c5] cursor-pointer linear duration-300"
                onClick={handleSubmit}
              >
                <AddIcon className="text-white" sx={{ fontSize: "38px" }} />
              </button>
            </Zoom>
            {/* note add button */}

            {/* note add field minimize button */}
            <Zoom in={isExpanded}>
              <button
                className="absolute top-[87.5%] lg:top-[91.5%] lg:right-[12%] right-[17%] w-[47px] h-[47px] rounded-full flex items-center justify-center shadow-lg bg-[#cdcdcd] hover:bg-[#bebebe] cursor-pointer linear duration-300"
                onClick={minimizeNoteCreator}
              >
                <ExpandLessIcon
                  className="text-white"
                  sx={{ fontSize: "39px" }}
                />
              </button>
            </Zoom>
            {/* note add field minimize button */}
          </form>
          {/* note creating form ends */}
        </div>

        {/* Note Add Success msg modal starts */}
        {isExpandedSuccess && (
          <div
            className={
              "fixed top-0 left-0 h-[120vh] w-full bg-black/20 flex justify-center items-center z-10 backdrop-blur-sm transition linear delay-0"
            }
          >
            <div
              className={
                "w-[36%] fixed h-[16%] mb-48 animate-[popUp_.2s_ease_backwards_1] text-blackish bg-white rounded-xl shadow-md pt-7 px-7 pb-14 break-words"
              }
            >
              <p className={"text-2xl pb-3 linear duration-300 font-semibold"}>
                <TaskAltIcon
                  className="mr-1 mb-[6px]"
                  sx={{
                    fontSize: "34px",
                    color: "green",
                  }}
                />
                Note added successfully!
              </p>

              {/* Close Success msg button */}
              <button
                className={
                  "absolute bottom-[11%] right-[4%] w-[37px] h-[37px] rounded-full flex items-center justify-center shadow-lg bg-[#e3e3e3] hover:bg-[#d5d5d5] cursor-pointer linear duration-300"
                }
                onClick={handleSuccess}
              >
                <CheckIcon
                  className="text-white"
                  sx={{
                    fontSize: "22px",
                    color: "green",
                  }}
                />
              </button>
              {/* Close Success msg button */}
            </div>
          </div>
        )}
        {/* Note Add Success msg modal ends */}
      </div>
    </section>
  );
};

export default NoteCreator;
