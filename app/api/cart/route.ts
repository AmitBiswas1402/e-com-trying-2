import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cart";

export async function GET() {
  try {
    await connectDB();

    const carts = await Cart.find();

    return Response.json(
      { success: true, carts },
      { status: 200 }
    );

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
