import { AppShell } from "@/components/app/LandingPage/AppShell";
import { Header } from "@/components/app/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import { CartSheet } from "@/components/app/CartSheet";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        <ChatStoreProvider>
          <AppShell>
            <Header />
            <main>{children}</main>
          </AppShell>
          <CartSheet />
          <Toaster position="bottom-right" />
          <SanityLive />
        </ChatStoreProvider>
      </CartStoreProvider>
    </ClerkProvider>
  );
};
export default layout;
