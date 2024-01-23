import React from "react";
import { AppLink } from "src/components/AppLink";
import { Header } from "src/components/Header";

export default function Camp() {
  return (
    <main className="flex h-screen flex-col">
      <Header />
      <div className="h-full flex items-center justify-center gap-4 py-16">
        <AppLink to="battle" className="underline">
          explore
        </AppLink>
        <AppLink to="shop" className="underline">
          shop
        </AppLink>
      </div>
    </main>
  );
}
