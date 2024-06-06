import { useState } from 'react';

function useTaskTab() {
  const [task, setTask] = useState<string | undefined>(undefined);

  const openTaskTab = (action: "Update" | "AddWithColumn" | "AddNew") => setTask(action);
  const closeTaskTab = () => setTask(undefined);

  return {
    task,
    openTaskTab,
    closeTaskTab,
  };
}

export default useTaskTab;
