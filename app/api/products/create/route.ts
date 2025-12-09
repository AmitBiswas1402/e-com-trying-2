import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await connectDB();

    const newProduct = await Product.create(data);

    return Response.json(
      { success: true, product: newProduct },
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

