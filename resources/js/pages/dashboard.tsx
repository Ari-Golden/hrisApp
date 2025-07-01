import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePage } from "@inertiajs/react"
import { EmployeeTable } from "./Employees/EmployeeTable"

export default function Page() {
  const { props } = usePage<{
    totalEmployee: number
    totalMaleEmployee: number
    totalFemaleEmployee: number
    newEmployee: number
    terminatedEmployee: number
    leaveEmployee: number
    employees : []
  }>()

  const data = [
    { label: "Total Employee", value: props.totalEmployee },
    { label: "Male Employee", value: props.totalMaleEmployee },
    { label: "Female Employee", value: props.totalFemaleEmployee },
    { label: "New This Month", value: props.newEmployee },
    { label: "Terminated", value: props.terminatedEmployee },
    { label: "On Leave", value: props.leaveEmployee },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <EmployeeTable data={props.employees} />

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
