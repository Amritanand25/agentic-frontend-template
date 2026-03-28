import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/auth-layout";
import { Button, Input, Label, Checkbox } from "@repo/ui";
import {
  useAuthStore,
  validateEmail,
  validatePassword,
} from "@/stores/auth-store";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleBlur = (field: "email" | "password") => {
    if (field === "email" && email) {
      const emailError = validateEmail(email);
      setValidationErrors((prev) => ({
        ...prev,
        email: emailError || undefined,
      }));
    } else if (field === "password" && password) {
      const passwordError = validatePassword(password);
      setValidationErrors((prev) => ({
        ...prev,
        password: passwordError || undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setValidationErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    await signup({
      name,
      email,
      password,
      organizationName,
      acceptedTerms,
    });

    // After signup, auto-select org/tenant and go to app
    const { isAuthenticated, currentOrg, currentTenant } =
      useAuthStore.getState();

    if (isAuthenticated) {
      if (currentOrg && currentTenant) {
        navigate(`/${currentOrg.slug}/${currentTenant.slug}/app/dashboard`);
      } else {
        navigate("/select-org");
      }
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: "var(--text-default)" }}
          >
            Create your account
          </h1>
          <p className="text-sm" style={{ color: "var(--text-subdued-1)" }}>
            Get started with Relio CRM
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div
            className="p-3 rounded-lg text-sm"
            style={{
              backgroundColor: "var(--error-10)",
              color: "var(--error-50)",
              border: "1px solid var(--error-30)",
            }}
          >
            {error}
          </div>
        )}

        {/* Full name field */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationErrors.email) {
                setValidationErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            onBlur={() => handleBlur("email")}
            required
            autoComplete="email"
          />
          {validationErrors.email && (
            <p className="text-xs" style={{ color: "var(--error-50)" }}>
              {validationErrors.email}
            </p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (validationErrors.password) {
                setValidationErrors((prev) => ({
                  ...prev,
                  password: undefined,
                }));
              }
            }}
            onBlur={() => handleBlur("password")}
            required
            autoComplete="new-password"
          />
          {validationErrors.password ? (
            <p className="text-xs" style={{ color: "var(--error-50)" }}>
              {validationErrors.password}
            </p>
          ) : (
            <p className="text-xs" style={{ color: "var(--text-subdued-2)" }}>
              8+ characters, with uppercase, lowercase, and numbers
            </p>
          )}
        </div>

        {/* Organization name field */}
        <div className="space-y-2">
          <Label htmlFor="organization">Organization Name</Label>
          <Input
            id="organization"
            type="text"
            placeholder="Acme Inc"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            required
            autoComplete="organization"
          />
        </div>

        {/* Terms checkbox */}
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          />
          <Label
            htmlFor="terms"
            className="text-sm cursor-pointer"
            style={{ color: "var(--text-subdued-1)" }}
          >
            I agree to the{" "}
            <a
              href="/terms"
              className="underline"
              style={{ color: "var(--primary-50)" }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline"
              style={{ color: "var(--primary-50)" }}
            >
              Privacy Policy
            </a>
          </Label>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !acceptedTerms}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        {/* Login link */}
        <div className="text-center text-sm">
          <span style={{ color: "var(--text-subdued-1)" }}>
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="font-medium hover:underline"
            style={{ color: "var(--primary-50)" }}
          >
            Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
