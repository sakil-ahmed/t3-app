import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ProtectedLayout } from "@/app/ProtectedLayout";
import { Provider } from "@/app/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <Provider session={session}>
            <ProtectedLayout>{children}</ProtectedLayout>
          </Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
