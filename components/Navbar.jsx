/**
 * @file Navbar.jsx
 * @description Komponen ini berfungsi sebagai navigasi utama (header) untuk seluruh aplikasi.
 * Ditandai sebagai "use client" karena mengandung interaktivitas (hooks, onClick).
 */
"use client";

// === Blok Impor ===
// Mengimpor semua library dan komponen yang dibutuhkan dari React, Next.js, Clerk, dan file lokal.
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  /**
   * === Blok Hooks ===
   * Mengambil state dan fungsi global dari AppContext:
   * - openSignIn: Fungsi untuk membuka pop-up login Clerk.
   * - isSeller: Boolean untuk mengecek status seller.
   * - router: Hook dari Next.js untuk navigasi.
   */
  const { openSignIn, isSeller, router } = useAppContext();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">

      {/* Logo aplikasi, jika diklik akan kembali ke Halaman Utama */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />

      {/**
       * === Blok Navigasi Utama (Desktop) ===
       * Berisi link-link utama seperti Home, Shop, dll.
       * Terdapat juga tombol Seller Dashboard yang hanya muncul jika 'isSeller' bernilai true.
       */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/" className="hover:text-gray-900 transition">Contact</Link>
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
      </div>

      {/**
       * === Blok Akun Pengguna (Desktop) ===
       * Menggunakan komponen Clerk untuk menampilkan UI yang berbeda berdasarkan status login:
       * - <SignedIn>: Menampilkan <UserButton> (ikon profil) jika pengguna sudah login.
       * - <SignedOut>: Menampilkan tombol "Account" untuk login jika pengguna belum login.
       */}
      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4 cursor-pointer" src={assets.search_icon} alt="search icon" />
        <SignedIn>
          <Link href="/cart" className="flex items-center gap-2 text-sm hover:text-gray-900 transition">
            <Image src={assets.cart_icon} alt="Cart" className="w-5 h-5" />
            {/* Teks bisa disembunyikan di mobile jika perlu */}
            <span className="hidden lg:inline">Cart</span>
          </Link>

          <Link href="/my-orders" className="flex items-center gap-2 text-sm hover:text-gray-900 transition">
            <Image src={assets.order_icon} alt="Orders" className="w-5 h-5" />
            <span className="hidden lg:inline">My Orders</span>
          </Link>

          {/* Garis pemisah visual */}
          <div className="w-px h-6 bg-gray-300" />

          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <button onClick={() => openSignIn()} className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        </SignedOut>
      </ul>

      {/* Blok Akun Pengguna (Mobile) */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller
          </button>
        )}

        <SignedIn>
          {/* Cart icon */}
          <Link href="/cart" aria-label="Cart" className="relative">
            <Image
              src={assets.cart_icon}
              alt="Cart"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Link>

          {/* My Orders icon — ditambahkan untuk mobile */}
          <Link href="/my-orders" aria-label="My Orders" className="relative">
            <Image
              src={assets.order_icon}
              alt="My Orders"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Link>

          {/* Profil / avatar */}
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 hover:text-gray-900 transition"
            aria-label="Open account"
          >
            <Image
              src={assets.user_icon}
              alt="user icon"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </SignedOut>
      </div>

    </nav>
  );
};

export default Navbar;