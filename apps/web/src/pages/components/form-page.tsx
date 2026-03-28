import * as React from "react"
import { Button, Input, Textarea, InputLabel, Checkbox, RadioGroup, RadioGroupItem, Switch, Dropdown, DatePicker, TimePicker, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
import type { DropdownOption } from "@repo/ui"
// ─── Shared styles ─────────────────────────────────────
const sectionCard: React.CSSProperties = {
  border: "1px solid var(--grey-40)",
  borderRadius: "var(--radius-12)",
  padding: "var(--space-24)",
}

const fieldGap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-4)",
}

const formGap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-16)",
}

const rowGap: React.CSSProperties = {
  display: "flex",
  gap: "var(--space-16)",
}

// ─── Country options for dropdown ──────────────────────
const countryOptions = [
  { id: "us", label: "United States", value: "us" },
  { id: "uk", label: "United Kingdom", value: "uk" },
  { id: "ca", label: "Canada", value: "ca" },
  { id: "au", label: "Australia", value: "au" },
  { id: "de", label: "Germany", value: "de" },
  { id: "fr", label: "France", value: "fr" },
  { id: "jp", label: "Japan", value: "jp" },
  { id: "in", label: "India", value: "in" },
]

const industryOptions = [
  { id: "tech", label: "Technology", value: "tech" },
  { id: "finance", label: "Finance", value: "finance" },
  { id: "healthcare", label: "Healthcare", value: "healthcare" },
  { id: "education", label: "Education", value: "education" },
  { id: "retail", label: "Retail", value: "retail" },
  { id: "manufacturing", label: "Manufacturing", value: "manufacturing" },
]

const skillOptions = [
  { id: "react", label: "React", value: "react" },
  { id: "typescript", label: "TypeScript", value: "typescript" },
  { id: "node", label: "Node.js", value: "node" },
  { id: "python", label: "Python", value: "python" },
  { id: "go", label: "Go", value: "go" },
  { id: "rust", label: "Rust", value: "rust" },
  { id: "java", label: "Java", value: "java" },
  { id: "sql", label: "SQL", value: "sql" },
]

export default function FormPage() {
  // ─── Sign Up form state ──────────────────────────────
  const [signUpAgreed, setSignUpAgreed] = React.useState(false)

  // ─── Profile form state ──────────────────────────────
  const [country, setCountry] = React.useState<DropdownOption[]>([])
  const [bio, setBio] = React.useState("")

  // ─── Settings form state ─────────────────────────────
  const [emailNotif, setEmailNotif] = React.useState(true)
  const [pushNotif, setPushNotif] = React.useState(false)
  const [marketingNotif, setMarketingNotif] = React.useState(false)
  const [theme, setTheme] = React.useState("system")

  // ─── Event form state ────────────────────────────────
  const [eventDates, setEventDates] = React.useState<Date[]>([])
  const [eventTime, setEventTime] = React.useState("")

  // ─── Job Application form state ──────────────────────
  const [industry, setIndustry] = React.useState<DropdownOption[]>([])
  const [skills, setSkills] = React.useState<DropdownOption[]>([])
  const [experience, setExperience] = React.useState("")
  const [relocate, setRelocate] = React.useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-heading)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Forms
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Real-life form patterns built with our design system components.
        </p>
      </div>

      {/* ─── 1. Sign Up / Registration ─────────────────── */}
      <div style={sectionCard}>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Sign Up
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Create a new account to get started.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ ...formGap, maxWidth: 480 }}
        >
          <div style={rowGap}>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>First name</InputLabel>
              <Input placeholder="John" />
            </div>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>Last name</InputLabel>
              <Input placeholder="Doe" />
            </div>
          </div>

          <div style={fieldGap}>
            <InputLabel required helperText="We'll send a verification email to this address.">
              Email
            </InputLabel>
            <Input type="email" placeholder="john@example.com" />
          </div>

          <div style={fieldGap}>
            <InputLabel required helperText="Min 8 characters, one uppercase, one number.">
              Password
            </InputLabel>
            <Input type="password" placeholder="Create a password" />
          </div>

          <div style={fieldGap}>
            <InputLabel required>Confirm password</InputLabel>
            <Input type="password" placeholder="Confirm your password" />
          </div>

          <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
            <Checkbox
              id="terms"
              checked={signUpAgreed}
              onCheckedChange={(v) => setSignUpAgreed(v === true)}
            />
            <label
              htmlFor="terms"
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                cursor: "pointer",
              }}
            >
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <div>
            <Button type="submit" size="sm">
              Create account
            </Button>
          </div>
        </form>
      </div>

      {/* ─── 2. Profile / Account Settings ─────────────── */}
      <div style={sectionCard}>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Edit Profile
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Update your personal information and preferences.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ ...formGap, maxWidth: 480 }}
        >
          <div style={rowGap}>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>First name</InputLabel>
              <Input defaultValue="John" />
            </div>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>Last name</InputLabel>
              <Input defaultValue="Doe" />
            </div>
          </div>

          <div style={fieldGap}>
            <InputLabel required>Email</InputLabel>
            <Input type="email" defaultValue="john@example.com" disabled />
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
              }}
            >
              Contact support to change your email.
            </span>
          </div>

          <div style={fieldGap}>
            <InputLabel helperText="A short description about yourself. Max 200 characters.">
              Bio
            </InputLabel>
            <Textarea
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={200}
              rows={3}
            />
            <span
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-2)",
                textAlign: "right",
              }}
            >
              {bio.length}/200
            </span>
          </div>

          <div style={fieldGap}>
            <InputLabel helperText="Used for regional settings.">
              Phone
            </InputLabel>
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <Dropdown
            label="Country"
            helperText="Used for timezone and currency."
            options={countryOptions}
            value={country}
            onChange={setCountry}
            placeholder="Select country"
            searchable
          />

          <div style={{ display: "flex", gap: "var(--space-8)" }}>
            <Button type="submit" size="sm">
              Save changes
            </Button>
            <Button type="button" variant="outline" size="sm">
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* ─── 3. Notification Settings ──────────────────── */}
      <div style={sectionCard}>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Notification Settings
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Choose how you want to be notified.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ ...formGap, maxWidth: 480 }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              padding: "var(--space-12)",
              border: "1px solid var(--grey-40)",
              borderRadius: "var(--radius-8)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: "var(--text-default)",
                }}
              >
                Email notifications
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                }}
              >
                Receive updates about your account activity.
              </div>
            </div>
            <Switch
              checked={emailNotif}
              onCheckedChange={setEmailNotif}
            />
          </div>

          <div
            className="flex items-center justify-between"
            style={{
              padding: "var(--space-12)",
              border: "1px solid var(--grey-40)",
              borderRadius: "var(--radius-8)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: "var(--text-default)",
                }}
              >
                Push notifications
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                }}
              >
                Get notified on your mobile device.
              </div>
            </div>
            <Switch
              checked={pushNotif}
              onCheckedChange={setPushNotif}
            />
          </div>

          <div
            className="flex items-center justify-between"
            style={{
              padding: "var(--space-12)",
              border: "1px solid var(--grey-40)",
              borderRadius: "var(--radius-8)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: "var(--text-default)",
                }}
              >
                Marketing emails
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                }}
              >
                Tips, product updates, and promotions.
              </div>
            </div>
            <Switch
              checked={marketingNotif}
              onCheckedChange={setMarketingNotif}
            />
          </div>

          <div style={fieldGap}>
            <InputLabel>Theme preference</InputLabel>
            <RadioGroup value={theme} onValueChange={setTheme}>
              {[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "system", label: "System" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  className="flex items-center"
                  style={{ gap: "var(--space-8)" }}
                >
                  <RadioGroupItem value={opt.value} id={`theme-${opt.value}`} />
                  <label
                    htmlFor={`theme-${opt.value}`}
                    style={{
                      fontSize: "var(--font-size-m)",
                      color: "var(--text-default)",
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Button type="submit" size="sm">
              Save preferences
            </Button>
          </div>
        </form>
      </div>

      {/* ─── 4. Event / Appointment Booking ────────────── */}
      <div style={sectionCard}>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Schedule Event
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Book a meeting or event with date and time.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ ...formGap, maxWidth: 480 }}
        >
          <div style={fieldGap}>
            <InputLabel required>Event title</InputLabel>
            <Input placeholder="Team standup" />
          </div>

          <div style={fieldGap}>
            <InputLabel helperText="Add any additional context or agenda items.">
              Description
            </InputLabel>
            <Textarea placeholder="What is this event about?" rows={3} />
          </div>

          <DatePicker
            type="single"
            label="Date"
            required
            helperText="Pick the date for your event."
            selectedDates={eventDates}
            onDateChange={setEventDates}
            placeholder="DD/MM/YYYY"
          />

          <TimePicker
            label="Start time"
            required
            helperText="Select the start time."
            value={eventTime}
            onChange={setEventTime}
          />

          <div style={fieldGap}>
            <InputLabel>Duration</InputLabel>
            <Select defaultValue="30">
              <SelectTrigger
                style={{
                  borderRadius: "var(--radius-8)",
                  borderColor: "var(--grey-40)",
                }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
            <Checkbox id="recurring" />
            <label
              htmlFor="recurring"
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                cursor: "pointer",
              }}
            >
              Repeat weekly
            </label>
          </div>

          <div style={{ display: "flex", gap: "var(--space-8)" }}>
            <Button type="submit" size="sm">
              Schedule
            </Button>
            <Button type="button" variant="outline" size="sm">
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* ─── 5. Contact / Support ──────────────────────── */}
      <div style={sectionCard}>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Contact Support
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Have a question or issue? Send us a message.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ ...formGap, maxWidth: 480 }}
        >
          <div style={rowGap}>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>Name</InputLabel>
              <Input placeholder="Your name" />
            </div>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>Email</InputLabel>
              <Input type="email" placeholder="you@example.com" />
            </div>
          </div>

          <div style={fieldGap}>
            <InputLabel required>Subject</InputLabel>
            <Select>
              <SelectTrigger
                style={{
                  borderRadius: "var(--radius-8)",
                  borderColor: "var(--grey-40)",
                }}
              >
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General inquiry</SelectItem>
                <SelectItem value="bug">Bug report</SelectItem>
                <SelectItem value="feature">Feature request</SelectItem>
                <SelectItem value="billing">Billing question</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div style={fieldGap}>
            <InputLabel required helperText="Be as detailed as possible so we can help faster.">
              Message
            </InputLabel>
            <Textarea
              placeholder="Describe your issue or question..."
              rows={5}
            />
          </div>

          <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
            <Checkbox id="copy-email" />
            <label
              htmlFor="copy-email"
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                cursor: "pointer",
              }}
            >
              Send me a copy of this message
            </label>
          </div>

          <div>
            <Button type="submit" size="sm">
              Send message
            </Button>
          </div>
        </form>
      </div>

      {/* ─── 6. Job Application ────────────────────────── */}
      <div style={sectionCard}>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Job Application
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Apply for an open position at our company.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ ...formGap, maxWidth: 480 }}
        >
          <div style={rowGap}>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>First name</InputLabel>
              <Input placeholder="Jane" />
            </div>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>Last name</InputLabel>
              <Input placeholder="Smith" />
            </div>
          </div>

          <div style={fieldGap}>
            <InputLabel required>Email</InputLabel>
            <Input type="email" placeholder="jane.smith@email.com" />
          </div>

          <div style={fieldGap}>
            <InputLabel>Phone</InputLabel>
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <div style={fieldGap}>
            <InputLabel>LinkedIn URL</InputLabel>
            <Input type="url" placeholder="https://linkedin.com/in/janesmith" />
          </div>

          <Dropdown
            label="Industry"
            required
            options={industryOptions}
            value={industry}
            onChange={setIndustry}
            placeholder="Select industry"
          />

          <Dropdown
            label="Skills"
            helperText="Select all that apply."
            options={skillOptions}
            value={skills}
            onChange={setSkills}
            placeholder="Select skills"
            isMultiSelect
            searchable
          />

          <div style={fieldGap}>
            <InputLabel required>Years of experience</InputLabel>
            <RadioGroup value={experience} onValueChange={setExperience}>
              {[
                { value: "0-1", label: "0 - 1 years" },
                { value: "2-4", label: "2 - 4 years" },
                { value: "5-9", label: "5 - 9 years" },
                { value: "10+", label: "10+ years" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  className="flex items-center"
                  style={{ gap: "var(--space-8)" }}
                >
                  <RadioGroupItem value={opt.value} id={`exp-${opt.value}`} />
                  <label
                    htmlFor={`exp-${opt.value}`}
                    style={{
                      fontSize: "var(--font-size-m)",
                      color: "var(--text-default)",
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div style={fieldGap}>
            <InputLabel helperText="Why are you interested in this position?">
              Cover letter
            </InputLabel>
            <Textarea
              placeholder="Tell us why you'd be a great fit..."
              rows={4}
            />
          </div>

          <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
            <Checkbox
              id="relocate"
              checked={relocate}
              onCheckedChange={(v) => setRelocate(v === true)}
            />
            <label
              htmlFor="relocate"
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                cursor: "pointer",
              }}
            >
              Willing to relocate
            </label>
          </div>

          <div style={{ display: "flex", gap: "var(--space-8)" }}>
            <Button type="submit" size="sm">
              Submit application
            </Button>
            <Button type="button" variant="outline" size="sm">
              Save draft
            </Button>
          </div>
        </form>
      </div>

      {/* ─── 7. Payment / Billing ──────────────────────── */}
      <div style={sectionCard}>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-prominent)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Payment Details
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Enter your billing information.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ ...formGap, maxWidth: 480 }}
        >
          <div style={fieldGap}>
            <InputLabel required>Cardholder name</InputLabel>
            <Input placeholder="Name on card" />
          </div>

          <div style={fieldGap}>
            <InputLabel required>Card number</InputLabel>
            <Input placeholder="4242 4242 4242 4242" maxLength={19} />
          </div>

          <div style={rowGap}>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>Expiry date</InputLabel>
              <Input placeholder="MM / YY" maxLength={7} />
            </div>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required helperText="3-digit code on the back of your card.">
                CVC
              </InputLabel>
              <Input placeholder="123" maxLength={4} type="password" />
            </div>
          </div>

          <div style={fieldGap}>
            <InputLabel required>Billing address</InputLabel>
            <Input placeholder="Street address" />
          </div>

          <div style={rowGap}>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>City</InputLabel>
              <Input placeholder="City" />
            </div>
            <div style={{ ...fieldGap, flex: 1 }}>
              <InputLabel required>ZIP / Postal code</InputLabel>
              <Input placeholder="10001" />
            </div>
          </div>

          <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
            <Checkbox id="save-card" defaultChecked />
            <label
              htmlFor="save-card"
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                cursor: "pointer",
              }}
            >
              Save card for future purchases
            </label>
          </div>

          <div>
            <Button type="submit" size="sm">
              Pay now
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
