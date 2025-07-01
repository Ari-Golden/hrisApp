import React, { forwardRef } from "react"

interface ExportablePDFAreaProps {
  children: React.ReactNode
}

const ExportablePDFArea = forwardRef<HTMLDivElement, ExportablePDFAreaProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "#ffffff", // hindari oklch
          color: "#000000",           // teks aman
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {children}
      </div>
    )
  }
)

ExportablePDFArea.displayName = "ExportablePDFArea"

export default ExportablePDFArea
