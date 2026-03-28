import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui"
export default function InputOTPPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Input OTP</h1>
        <p className="text-muted-foreground mt-2">
          Accessible one-time password component with copy paste functionality.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  )
}
