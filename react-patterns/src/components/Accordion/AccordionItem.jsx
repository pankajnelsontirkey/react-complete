import { createContext, useContext } from 'react';

const AccordionItemContext = createContext();

export function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);

  if (!ctx) {
    throw new Error(
      'The component must be wrapped with <Accordion.Item> component'
    );
  }

  return ctx;
}

export default function AccordionItem({ id, children, className }) {
  const contextValue = { id };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}
