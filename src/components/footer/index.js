import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import CodeIcon from "@mui/icons-material/Code";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer className="bg-black/10 pt-8 pb-4 font-league">
      <div className="max-w-container m-auto text-center text-black/60">
        <p>Copyright ⓒ Google-keep {year}</p>
        <p className="text-[15px] mt-1">
          Developed & maintained by
          <span className="font-semibold ml-1">Zij</span>
        </p>
        <p className="text-[15px] mt-1">
          Follow me on -
          <a href="https://github.com/zij-jahidul">
            <GitHubIcon
              className="text- mb-[3px] ml-1 text-black/70"
              sx={{
                fontSize: "20px",
              }}
            />
          </a>
          <a href="https://www.facebook.com/safzij/">
            <FacebookIcon
              className="text- mb-[3px] ml-1 text-black/70"
              sx={{
                fontSize: "20px",
              }}
            />
          </a>
          <a href="https://www.fiverr.com/zij__jiku?up_rollout=true">
            <CodeIcon
              className="text- mb-[3px] ml-1 text-black/70"
              sx={{
                fontSize: "20px",
              }}
            />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
