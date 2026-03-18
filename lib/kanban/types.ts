// Kanban board types

export type TicketStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'

export type TicketPriority = 'low' | 'medium' | 'high'

export type TeamRole = 'lead-dev' | 'ux-ui' | 'qa'

export type WorkState = 'idle' | 'starting' | 'working' | 'done' | 'failed'

export interface KanbanTicket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  assigneeId: string | null   // agent id from agents.json
  assigneeRole: TeamRole | null
  workState: WorkState
  workStartedAt: number | null
  workError: string | null
  workResult: string | null
  createdAt: number
  updatedAt: number
}

export interface KanbanColumn {
  id: TicketStatus
  title: string
}

export const COLUMNS: KanbanColumn[] = [
  { id: 'backlog', title: '待处理' },
  { id: 'todo', title: '待办' },
  { id: 'in-progress', title: '进行中' },
  { id: 'review', title: '审核中' },
  { id: 'done', title: '已完成' },
]

export const PRIORITY_COLORS: Record<TicketPriority, string> = {
  low: 'var(--system-green)',
  medium: 'var(--system-orange)',
  high: 'var(--system-red)',
}

export const ROLE_LABELS: Record<TeamRole, string> = {
  'lead-dev': '技术负责人',
  'ux-ui': 'UI/UX 设计',
  'qa': '测试',
}
