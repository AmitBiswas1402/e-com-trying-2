import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cart";

export async function GET(req: Request, {params}: {params: Promise<{userId: string}>}){
    try {
        await connectDB();

        const { userId } = await params;
        const cart = await Cart.findOne({ userId });
        return Response.json(cart || {item: []})
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