import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

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
  const { user_id, items, total, shipping_address, user_email } = body

  if (!user_id || !user_email || !items || !total) {
    return NextResponse.json(
      { error: 'Missing required fields: user_id, user_email, items, total' },
      { status: 400 }
    )
  }

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)

  const productNames = items.map((item: any) => item.product_name).join(", ")
  const quantities = items.map((item: any) => `${item.quantity}${item.size || ''}`).join(", ")

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id,
        total,
        status: "pending",
        shipping_address: shipping_address || '',
        user_email,
        product_names: productNames,
        quantities: quantities,
        delivery_date: deliveryDate.toISOString().split("T")[0],
      },
    ])
    .select()
    .single()

  if (orderError) {
    console.error("[v0] Order insert error:", orderError)
    return NextResponse.json({ error: orderError.message }, { status: 400 })
  }

  const orderItems = items.map((item: any) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    console.error("[v0] Order items insert error:", itemsError)
    return NextResponse.json({ error: itemsError.message }, { status: 400 })
  }

  return NextResponse.json({ order }, { status: 201 })
}
