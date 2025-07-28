import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();

    // Data statistik penduduk dan kategori lain
    const statistikQuery = await client.query('SELECT * FROM statistik_penduduk LIMIT 1');
    const kelompokUmurQuery = await client.query('SELECT rentang_umur, jumlah FROM kelompok_umur');
    const dusunQuery = await client.query('SELECT nama_dusun, jumlah FROM dusun');
    const pendidikanQuery = await client.query('SELECT jenjang, jumlah FROM pendidikan_terakhir');
    const perkawinanQuery = await client.query('SELECT status, jumlah FROM status_perkawinan');
    const agamaQuery = await client.query('SELECT nama, jumlah FROM agama');

    // Data APBDes (tahun, pendapatan, belanja)
    const apbdesQuery = await client.query('SELECT tahun, pendapatan, belanja FROM apbdes ORDER BY tahun DESC');

    client.release();

    return NextResponse.json({
      statistik: statistikQuery.rows[0] || {},
      kelompok_umur: kelompokUmurQuery.rows,
      dusun: dusunQuery.rows,
      pendidikan_terakhir: pendidikanQuery.rows,
      status_perkawinan: perkawinanQuery.rows,
      agama: agamaQuery.rows,
      apbdes: apbdesQuery.rows,  // tambahkan data apbdes di sini
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
