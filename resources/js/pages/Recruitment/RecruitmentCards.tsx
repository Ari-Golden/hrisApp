import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IconChecklist, IconUsers, IconUserPlus, IconBriefcase } from "@tabler/icons-react"

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
      <Card className="h-full min-h-[150px]">
        <CardHeader>
          <CardDescription>Jumlah Pelamar</CardDescription>
          <CardTitle className="text-3xl font-semibold flex gap-2 items-center flex-grow">
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

      <Card className="h-full min-h-[150px]">
        <CardHeader>
          <CardDescription>Kebutuhan per Bagian</CardDescription>
          <CardTitle className="text-3xl font-semibold flex gap-2 items-center flex-grow">
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

      <Card className="h-full min-h-[150px]">
        <CardHeader>
          <CardDescription>Tersorter</CardDescription>
          <CardTitle className="text-3xl font-semibold flex gap-2 items-center flex-grow">
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

      <Card className="h-full min-h-[150px]">
        <CardHeader>
          <CardDescription>Proses Seleksi</CardDescription>
          <CardTitle className="text-xl font-10 px flex-grow">
           <span>Screening: {stats.totalByStage.screening}</span> <br />
           <span>Interview: {stats.totalByStage.interview}</span> <br />
            <span>Offering: {stats.totalByStage.offering}</span> <br />
            <span>Rejected: {stats.totalByStage.rejected}</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Tahapan Seleksi</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Distribusi kandidat per tahapan
        </CardFooter>
      </Card>

      <Card className="h-full min-h-[150px]">
        <CardHeader>
          <CardDescription>Sudah Bergabung</CardDescription>
          <CardTitle className="text-3xl font-semibold flex gap-2 items-center flex-grow">
            <IconUserPlus className="text-muted-foreground" />
            {stats.totalJoined}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Joined</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Kandidat onboarding
        </CardFooter>
      </Card>
    </div>
  )
}
