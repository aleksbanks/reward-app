export type Task = {
  _id: string
  name: string
  stars: number
  status: 'undone' | 'done'
  createdAt: Date
}
