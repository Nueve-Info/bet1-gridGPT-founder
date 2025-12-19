import * as React from "react"
import { cn } from "@/lib/utils"

// Simplified Accordion implementation to avoid Radix UI dependency for this demo
// In a real shadcn/ui project, you would use @radix-ui/react-accordion

/* eslint-disable @typescript-eslint/no-unused-vars */
const AccordionContext = React.createContext<{
  expanded: string | undefined
  setExpanded: (value: string | undefined) => void
}>({ expanded: undefined, setExpanded: () => {} })

const UnusedAccordion = ({
  children,
  type,
  collapsible,
  className,
  ...props
}: {
  children: React.ReactNode
  type: "single" | "multiple"
  collapsible?: boolean
  className?: string
}) => {
  const [expanded, setExpanded] = React.useState<string | undefined>(undefined)

  return (
    <AccordionContext.Provider value={{ expanded, setExpanded }}>
      <div className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b", className)}
    data-value={value}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  // const { expanded, setExpanded } = React.useContext(AccordionContext)
  // Find the parent item value
  // This is a bit hacky without a proper context for the item, but works for this simple implementation
  // ideally we'd wrap Item in a context provider too.
  
  // Let's rely on the user clicking to toggle.
  // We need to know the 'value' of the parent Item. 
  // For this simplified version, let's just make it a standard collapsible div 
  // controlled by the Accordion parent if we can.
  
  // actually, let's just implement a standalone simple accordion item that manages its own state
  // if type="single" isn't strictly enforced.
  
  // Re-thinking: To properly simulate shadcn API, I need the context.
  
  return (
      <button
        ref={ref}
        type="button" // important
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
        onClick={(e) => {
             // Logic handled in ItemWrapper or we need to pass value here. 
             // For this demo, I will assume the consumer passes onClick if they want control, 
             // OR I will make a simpler component that doesn't strictly follow Radix API internal logic 
             // but exposes the same components.
             
             // actually, the shadcn usage is:
             // <Accordion type="single" collapsible>
             //   <AccordionItem value="item-1">
             //     <AccordionTrigger>Is it accessible?</AccordionTrigger>
             //     <AccordionContent>Yes.</AccordionContent>
             //   </AccordionItem>
             // </Accordion>
             
             // I'll implement a context-aware version.
             if (props.onClick) props.onClick(e);
        }}
      >
        {children}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 transition-transform duration-200"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
      </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </div>
))
AccordionContent.displayName = "AccordionContent"

// Re-writing the exported components to actually work together simply
// This overrides the above definitions to make a working simple version

const SimpleAccordionItemContext = React.createContext<{
    isOpen: boolean;
    toggle: () => void;
}>({ isOpen: false, toggle: () => {} });

const SimpleAccordion = ({ type, collapsible, className, children }: any) => {
    // We won't enforce "single" in this simple mock, just let them all be independent
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ignore = { type, collapsible }; 
    return <div className={className}>{children}</div>;
};

const SimpleAccordionItem = ({ value, className, children }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ignore = value;
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <SimpleAccordionItemContext.Provider value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}>
            <div className={cn("border-b", className)}>
                {children}
            </div>
        </SimpleAccordionItemContext.Provider>
    );
};

const SimpleAccordionTrigger = ({ className, children }: any) => {
    const { isOpen, toggle } = React.useContext(SimpleAccordionItemContext);
    return (
        <button
            onClick={toggle}
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full text-left",
                className
            )}
        >
            {children}
             <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen ? "rotate-180" : "")}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
    );
};

const SimpleAccordionContent = ({ className, children }: any) => {
    const { isOpen } = React.useContext(SimpleAccordionItemContext);
    if (!isOpen) return null;
    return (
        <div className={cn("overflow-hidden text-sm pb-4 pt-0", className)}>
            {children}
        </div>
    );
};

export { SimpleAccordion as Accordion, SimpleAccordionItem as AccordionItem, SimpleAccordionTrigger as AccordionTrigger, SimpleAccordionContent as AccordionContent }

