import React from "react";

interface TabItem{
  header: string,
  body: JSX.Element
}

interface TabsProps{
  items: [TabItem]
}

export function Tabs({items}: TabsProps) {
  return (
    <div className='flex flex-row gap-4 border-b border-highlight'>
      {items.map(x => (<span>{x.header}</span>))}
      <span className='bg-base-light'>Stars</span>
      <span>Planets</span>
    </div>
  );
}
