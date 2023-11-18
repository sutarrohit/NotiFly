import { VariantProps, cva } from "class-variance-authority";
import React, { LabelHTMLAttributes, FC, forwardRef } from "react";
import { cn } from "../utils";

const labelVariants = cva(
  `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,

  {
    variants: {},
  },
);

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label: FC<LabelProps> = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref as React.RefObject<HTMLLabelElement>}
      className={cn(labelVariants({ className }))}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Lable";

export default Label;
