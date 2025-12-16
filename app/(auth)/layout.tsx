export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
