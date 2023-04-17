import { MockUser } from '@/lib/db'

export interface userCardProps {
  className?: string
  userData: MockUser[]
  onDelete?: (id?: number) => void
  onUpdate?: (id?: number) => void
}
