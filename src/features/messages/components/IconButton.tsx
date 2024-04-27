import { cn } from "@/lib/utils";

const IconButton = ({
  children,
  disabled,
  onClick,
  ariaLabel,
  rounded = false,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  rounded?: boolean;
  ariaLabel?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "absolute bottom-2 right-2 border border-black bg-black p-2 ",
        "text-white transition-colors enabled:bg-black disabled:text-gray-400",
        "disabled:opacity-10 dark:border-white dark:bg-white dark:hover:bg-white md:right-3",
        rounded ? "rounded-full" : "rounded-lg"
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;
