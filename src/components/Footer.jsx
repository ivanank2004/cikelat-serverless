'use client';

import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil Desa" },
    { href: "/infografis", label: "Infografis" },
    { href: "/peta", label: "Peta" },
    { href: "/berita", label: "Berita" },
    { href: "/belanja", label: "Belanja" },
  ];

  return (
    <footer className="bg-[#0e7e78] text-white mt-20">
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
        {/* Info Desa */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Desa Cikelat</h3>
          <p>
            Kecamatan Cisolok, Kabupaten Sukabumi
            <br />
            Provinsi Jawa Barat, Indonesia
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Kontak</h3>
          <p>
            Email:{' '}
            <a href="mailto:info@desacikelat.id" className="underline">
              info@desacikelat.id
            </a>
          </p>
          <p>
            Telepon:{' '}
            <a href="tel:+6281234567890" className="underline">
              +62 812-3456-7890
            </a>
          </p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-white/20 text-sm bg-[#0c605b]">
        &copy; 2025 Desa Cikelat. All rights reserved.
      </div>
    </footer>
  );
}
