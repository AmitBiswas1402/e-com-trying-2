import jwt from "jsonwebtoken";

export function verifyToken(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
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
