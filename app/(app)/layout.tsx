import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { ClerkProvider } from "@clerk/nextjs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        <ChatStoreProvider>
          <main>{children}</main>
        </ChatStoreProvider>
      </CartStoreProvider>
    </ClerkProvider>
  );
};
export default layout;
