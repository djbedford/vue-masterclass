import { deleteTaskQuery } from '@/utils/supaQueries'
import type { Task } from '@/utils/supaQueries'

export const useTasksStore = defineStore('tasks-store', () => {
  const task = ref<Task | null>(null)
  const deleteTask = async () => {
    if (!task.value) return

    await deleteTaskQuery(task.value.id)
  }

  return {
    task,
    deleteTask,
  }
})
