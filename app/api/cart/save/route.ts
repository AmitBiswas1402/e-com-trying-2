import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cart";

export async function POST(req: Request) {
  try {
    const { userId, items } = await req.json();

    if (!userId) {
      return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    await connectDB();

    const existing = await Cart.findOne({ userId });

    if (existing) {
      existing.items = items;
      await existing.save();
    } else {
      await Cart.create({ userId, items });
    }

    return Response.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return Response.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  }
}
