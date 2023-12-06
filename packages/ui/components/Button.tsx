import { VariantProps, cva } from "class-variance-authority";
import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";
import { cn } from "../utils";

// Customized button variations
const buttonVariants = cva(
  `inline-flex items-center justify-center duration-300 font-medium rounded-lg bg-c_black text-c_White`,
  {
    variants: {
      variant: {
        primary: "dark:bg-c_White dark:text-c_black hover:bg-c_Litegrey dark:hover:ring-2 ring-c_Litegrey",
        secondary:
          "ring-1 ring-[#64646a] bg-transparent text-c_black dark:text-c_White hover:bg-gray-200 dark:hover:bg-[#24252d]",
      },
      size: {
        small: "py-1 px-6",
        large: "text-xl py-3 px-6",
        thiny: "py-[0.2px] px-4",
      },
    },
    defaultVariants: {
      size: "small",
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = forwardRef(({ size, variant, className, children, ...props }, ref) => {
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={cn(buttonVariants({ className, variant, size }))}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
