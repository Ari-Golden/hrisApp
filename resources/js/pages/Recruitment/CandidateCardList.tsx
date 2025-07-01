import { Badge } from "@/components/ui/badge"
import { IconUserSearch } from "@tabler/icons-react"

type Candidate = {
  id: number
  name: string
  position: string
  status: "interview" | "shortlisted" | "pending" | "rejected"
  appliedAt: string
}

const statusColor: Record<Candidate["status"], string> = {
  interview: "bg-blue-100 text-blue-700",
  shortlisted: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-700",
}

export function CandidateTableList({ candidates }: { candidates: Candidate[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr className="text-left">
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Posisi</th>
            <th className="px-4 py-2">Tanggal Lamaran</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="border-t">
              <td className="px-4 py-2 flex items-center gap-2">
                <IconUserSearch className="size-4 text-muted-foreground" />
                <span>{candidate.name}</span>
              </td>
              <td className="px-4 py-2">{candidate.position}</td>
              <td className="px-4 py-2">
                {new Date(candidate.appliedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <Badge className={statusColor[candidate.status]}>
                  {candidate.status.toUpperCase()}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
