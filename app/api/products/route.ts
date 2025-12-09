import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();
    return Response.json(products);
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
