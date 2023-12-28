export interface INewTask {
  title: string,
  description: string,
  employeeId: number,
  projectId: number
}

export interface IUsersTasks {
  id: number;
  userName: string;
}

export interface IProjectTasks {
  id: number;
  title: string;
}
