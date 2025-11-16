import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const ADMIN_EMAIL = "thestylishman7@gmail.com"
const ADMIN_PASSWORD_HASH = crypto
  .createHash("sha256")
  .update("wb3bjr40ef")
  .digest("hex")

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    }
  )

  const body = await req.json()
  const { email, password } = body

  if (email !== ADMIN_EMAIL || crypto.createHash("sha256").update(password).digest("hex") !== ADMIN_PASSWORD_HASH) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const csvHeaders = ["Order ID", "Date", "Delivery Date", "Customer Email", "Products", "Quantities", "Total", "Status"]
  const csvRows = orders.map((order: any) => [
    order.id,
    new Date(order.created_at).toLocaleString(),
    order.delivery_date,
    order.user_email || "N/A",
    order.product_names || "N/A",
    order.quantities || "N/A",
    order.total,
    order.status,
  ])

  const csvContent = [csvHeaders, ...csvRows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n")

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="nutritham-orders.csv"',
    },
  })
}
