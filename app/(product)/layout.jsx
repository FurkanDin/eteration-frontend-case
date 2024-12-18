'use client'
import Cart from "../components/Cart";
import Header from "../components/Header";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <main>
        <Header/>
        <div className="flex flex-col md:flex-row">{children}
            <Cart/>
        </div>
      </main>
    </div>
  );
}
