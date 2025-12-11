import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cart";

interface ParamsProps {
  params: Promise<{ userId: string; productId: string }>;
}

export async function GET(req: Request, { params }: ParamsProps) {
  try {
    const { userId } = await params; // ✅ Turbopack fix

    await connectDB();

    const cart = await Cart.findOne({ userId });

    return Response.json(
      { success: true, cart: cart || { items: [] } },
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

export async function DELETE(req: Request, { params }: ParamsProps) {
  try {
    const { userId, productId } = await params;

    await connectDB();

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: Number(productId) } } },
      { new: true }
    );

    if (!updatedCart) {
      return Response.json(
        { success: false, message: "Cart or item not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Item removed from cart",
        cart: updatedCart,
      },
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
