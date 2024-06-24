'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

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
      <div className="flex flex-wrap -mb-px text-center border-b border-yellow-200 dark:border-gray-700">
      {children}
      </div>
    </TabsContext.Provider>
  );
}

export default Tabs;

interface TabsItemProps {
  title: string;
  totals: number
  active?: boolean
  onTabClick?: () => void;
  render: ReactNode
}

Tabs.Item = function TabsItem({
  title,
  totals,
  active,
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
  if (active && !activeTab) setActiveTab(title) 
  return (
    <div
      className={cn(
        'flex items-center justify-center cursor-pointer text-sm font-medium rounded-t-lg first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-4 focus:ring-emerald-300 focus:outline-none',

      )}
      // onClick={handleClick}
    >
      
      {activeTab === title ?
        <div className='h-full' onClick={handleClick}>{render}</div> :
        <div className="flex gap-x-2 text-slate-500 justify-center content-center" onClick={handleClick} >
          <div className="p-1 m-2">{title}</div>
        </div>
      }
    </div>
  );
};
