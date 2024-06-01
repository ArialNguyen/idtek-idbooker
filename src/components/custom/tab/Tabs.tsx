'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const TabsContext = createContext<{
  activeTab?: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
  activeTab: undefined,
  setActiveTab: () => undefined,
});

function Tabs({ children }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>();

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      <div className="flex flex-wrap -mb-px text-center border-b border-gray-200 dark:border-gray-700">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export default Tabs;

interface TabsItemProps {
  title: string;
  totals: number
  onTabClick?: () => void;
  render: ReactNode
}

Tabs.Item = function TabsItem({
  title,
  totals,
  onTabClick = () => undefined,
  render
}: TabsItemProps): JSX.Element {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  useEffect(() => {
    setActiveTab((prev) => (!prev ? title : prev));
  }, [title, setActiveTab]);

  const handleClick = () => {
    setActiveTab(title);
    onTabClick();
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center cursor-pointer p-4 text-sm font-medium rounded-t-lg first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-4 focus:ring-emerald-300 focus:outline-none',
      
      )}
      // onClick={handleClick}
    >
      {activeTab === title ?
        <div className='w-full h-full' onClick={handleClick}>{render}</div> :
        <div className="w-full m-2 flex justify-center content-center" onClick={handleClick} >
          <div className="w-12/12 p-1">{title}</div>
        </div>
      }
    </div>
  );
};
