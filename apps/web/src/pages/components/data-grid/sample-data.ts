export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  department: string
  role: string
  status: "active" | "idle" | "error"
  salary: number
  progress: number
  startDate: string
  country: string
  city: string
}

const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack"]
const lastNames = ["Smith", "Jones", "Brown", "Wilson", "Taylor", "Davis", "Clark", "Hall", "Lewis", "Young"]
const departments = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Support", "Product", "Legal", "Operations"]
const roles = ["Manager", "Senior", "Lead", "Junior", "Intern", "Director", "VP", "Analyst", "Specialist", "Coordinator"]
const statuses: Employee["status"][] = ["active", "idle", "error"]
const countries = ["United States", "United Kingdom", "Germany", "France", "Canada"]
const cities: Record<string, string[]> = {
  "United States": ["New York", "San Francisco", "Chicago", "Austin", "Seattle"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Leeds", "Edinburgh"],
  "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
  "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
  "Canada": ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
}

export function generateRows(count: number = 50): Employee[] {
  return Array.from({ length: count }, (_, i) => {
    const country = countries[i % countries.length]
    const citiesForCountry = cities[country]
    return {
      id: i + 1,
      firstName: firstNames[i % firstNames.length],
      lastName: lastNames[Math.floor(i / firstNames.length) % lastNames.length],
      email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[Math.floor(i / firstNames.length) % lastNames.length].toLowerCase()}@company.com`,
      department: departments[i % departments.length],
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      salary: 45000 + Math.floor(Math.random() * 80000),
      progress: Math.floor(Math.random() * 100),
      startDate: `202${Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      country,
      city: citiesForCountry[i % citiesForCountry.length],
    }
  })
}

export const sampleRows = generateRows(50)
