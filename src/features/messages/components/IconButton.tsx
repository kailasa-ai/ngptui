import { cn } from "@/lib/utils";

const IconButton = ({
  children,
  disabled,
  onClick,
  ariaLabel,
  rounded = false,
  className,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  rounded?: boolean;
  ariaLabel?: string;
  className?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 right-2 border border-black bg-black p-2 ",
        "text-white transition-colors enabled:bg-black disabled:text-gray-400",
        "disabled:opacity-10 dark:border-white dark:bg-white dark:hover:bg-white md:right-3",
        rounded ? "rounded-full" : "rounded-lg",
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;
