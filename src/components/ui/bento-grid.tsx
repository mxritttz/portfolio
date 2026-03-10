// components/ui/bento-grid.tsx
import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:gap-6 bg-transparent auto-rows-[12rem] sm:auto-rows-[16rem] md:auto-rows-[20rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  containerClassName,
  headerClassName,
  contentClassName,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden sm:overflow-visible pb-2 sm:pb-4",
        "transition-all duration-600 ease-out",
        "hover:-translate-y-3 sm:hover:-translate-y-6 hover:shadow-4xl",  
        className
      )}
    >
      <div className="relative w-full h-full rounded-2xl">
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={100}
          glow={true}
          disabled={false}
          variant={"default"}
          proximity={380}
          inactiveZone={0.01}
          className="rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        />


        <div
          className={cn(
            "group/bento relative h-full w-full rounded-2xl",
            "bg-white/95 dark:bg-black backdrop-blur-sm",
            "border-4 border-neutral-200/50 dark:border-white/10",
            "p-4 sm:p-6 shadow-xl",
            "flex flex-col justify-between",
            containerClassName
          )}
        >
          {header && <div className={cn("mb-6", headerClassName)}>{header}</div>}

          <div
            className={cn(
              "transition-transform duration-500 group-hover/bento:translate-x-3",
              contentClassName
            )}
          >
            {icon && <div className="mb-4">{icon}</div>}
            <h3 className="mb-2 text-xl font-bold text-neutral-800 dark:text-neutral-50">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
