import { VariantProps, cva } from "class-variance-authority";
import React, { InputHTMLAttributes, FC, forwardRef } from "react";
import { cn } from "../utils";

// Customized button variations
const inputVariants = cva(
  `inline-flex items-center justify-center bg-transparent border rounded-lg border-c_Litegrey`,
  {
    variants: {
      variant: {
        primary: "",
        secondary: "bg-yellow-500",
      },
      size: {
        small: "py-1 px-6",
        large: "text-xl py-3 px-6",
      },
    },
    defaultVariants: {
      size: "small",
      variant: "primary",
    },
  },
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const InputBox: FC<InputProps> = forwardRef(({ size, variant, className, children, ...props }, ref) => {
  return (
    <input
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      className={cn(inputVariants({ className, variant, size }))}
      {...props}
    />
  );
});

InputBox.displayName = "InputBox";

export default InputBox;
