import { Copyright, ExternalLink } from "lucide-react";

const Links = () => {
  return (
    <div className="flex flex-col gap-3 py-4 select-none sticky bottom-0 bg-sidebar-surface">
      <a
        href="https://ecitizen.kailasamailer.com/pages/nithyananda-gpt-feedback"
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center gap-3 hover:underline"
      >
        <span>Feedback</span>
        <ExternalLink size={16} />
      </a>
      <a
        href="https://ecitizen.kailasamailer.com/pages/nithyananda-gpt-volunteer"
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center gap-3 hover:underline"
      >
        <span>Volunteer</span>
        <ExternalLink size={16} />
      </a>
      <div className="text-xs">
        <p className="flex items-center gap-1">
          <Copyright size={14} />
          <span>{new Date().getFullYear()} Sri Nithyananda Paramashivam</span>
        </p>
        <p className="text-left">All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Links;
