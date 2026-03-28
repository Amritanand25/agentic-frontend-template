"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ theme = "system", ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--surface-0)",
          "--normal-border": "var(--grey-40)",
          "--normal-text": "var(--text-default)",
          "--success-bg": "var(--success-20)",
          "--success-border": "var(--success-50)",
          "--success-text": "var(--text-default)",
          "--error-bg": "var(--error-20)",
          "--error-border": "var(--error-50)",
          "--error-text": "var(--text-default)",
          "--warning-bg": "var(--warning-20)",
          "--warning-border": "var(--warning-50)",
          "--warning-text": "var(--text-default)",
          "--info-bg": "var(--primary-10)",
          "--info-border": "var(--primary-50)",
          "--info-text": "var(--text-default)",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          backgroundColor: "var(--surface-0)",
          borderColor: "var(--grey-40)",
          color: "var(--text-default)",
          borderRadius: "var(--radius-12)",
          boxShadow: "var(--shadow-medium)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--font-size-m)",
          lineHeight: "var(--line-height-m)",
          padding: "var(--space-12) var(--space-16)",
        },
        classNames: {
          toast: "group toast",
          description: "",
          actionButton: "",
          cancelButton: "",
          success: "",
          error: "",
          warning: "",
          info: "",
        },
        actionButtonStyle: {
          backgroundColor: "var(--primary-50)",
          color: "var(--text-on-primary)",
          borderRadius: "var(--radius-8)",
          fontSize: "var(--font-size-s)",
          fontWeight: "var(--font-weight-prominent)",
          padding: "var(--space-4) var(--space-12)",
        },
        cancelButtonStyle: {
          backgroundColor: "var(--grey-30)",
          color: "var(--text-default)",
          borderRadius: "var(--radius-8)",
          fontSize: "var(--font-size-s)",
          fontWeight: "var(--font-weight-prominent)",
          padding: "var(--space-4) var(--space-12)",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
