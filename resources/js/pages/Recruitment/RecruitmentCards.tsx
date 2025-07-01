import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IconChecklist, IconUsers, IconUserPlus, IconUserSearch, IconBriefcase } from "@tabler/icons-react"

type RecruitmentStats = {
  totalApplicants: number
  totalPositions: number
  totalSorted: number
  totalByStage: {
    screening: number
    interview: number
    offering: number
    rejected: number
  }
  totalJoined: number
}

export function RecruitmentCards({ stats }: { stats: RecruitmentStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 @4xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardDescription>Jumlah Pelamar</CardDescription>
          <CardTitle className="text-3xl font-semibold flex gap-2 items-center">
            <IconUsers className="text-muted-foreground" />
            {stats.totalApplicants}
          </CardTitle>
          <CardAction>
            <Badge variant="secondary">Semua pelamar</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Termasuk lamaran online & walk-in
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Kebutuhan per Bagian</CardDescription>
          <CardTitle className="text-3xl font-semibold flex gap-2 items-center">
            <IconBriefcase className="text-muted-foreground" />
            {stats.totalPositions}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Posisi dibuka</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Jumlah posisi aktif dari semua divisi
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Tersorter</CardDescription>
          <CardTitle className="text-3xl font-semibold flex gap-2 items-center">
            <IconChecklist className="text-muted-foreground" />
            {stats.totalSorted}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Screened</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Lamaran yang sudah tersaring awal
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Proses Seleksi</CardDescription>
          <CardTitle className="text-2xl font-medium">
            Screening: {stats.totalByStage.screening} | Interview: {stats.totalByStage.interview}
          </CardTitle>
          <CardTitle className="text-2xl font-medium">
            Offering: {stats.totalByStage.offering} | Rejected: {stats.totalByStage.rejected}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Tahapan Seleksi</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Distribusi kandidat per tahapan
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Sudah Bergabung</CardDescription>
          <CardTitle className="text-3xl font-semibold flex gap-2 items-center">
            <IconUserPlus className="text-muted-foreground" />
            {stats.totalJoined}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Joined</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Kandidat sudah onboarding
        </CardFooter>
      </Card>
    </div>
  )
}
