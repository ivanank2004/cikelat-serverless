export async function getHomeData() {
  const resHome = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home-data`, {
    next: { revalidate: 0 },
  });
  const resBerita = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/berita`, {
    next: { revalidate: 0 },
  });
  const resProduk = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/produk`, {
    next: { revalidate: 0 },
  });
  const resPengumuman = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pengumuman`, {
    next: { revalidate: 0 },
  });

  const [homeData, beritaDataRaw, produkData, pengumumanDataRaw] = await Promise.all([
    resHome.json(),
    resBerita.json(),
    resProduk.json(),
    resPengumuman.json(),
  ]);

  const beritaSorted = beritaDataRaw.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  const pengumumanSorted = pengumumanDataRaw.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  return {
    ...homeData,
    berita: beritaSorted.slice(0, 6),
    produk: produkData.slice(0, 6),
    pengumuman: pengumumanSorted.slice(0, 6),
  };
}
