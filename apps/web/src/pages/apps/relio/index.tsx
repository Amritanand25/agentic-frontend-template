import { Button, Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { useNavigate } from "react-router-dom";

export default function RelioHomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--surface-10)", padding: "var(--space-16)" }}
    >
      <Card style={{ maxWidth: 480, width: "100%" }}>
        <CardHeader>
          <CardTitle>Relio CRM</CardTitle>
        </CardHeader>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-12)",
          }}
        >
          <p style={{ color: "var(--text-subdued-1)" }}>
            Relio is a CRM module currently under development. Check back soon.
          </p>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
