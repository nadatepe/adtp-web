import { sql } from "./db";

export type Job = {
  id: string;
  yukleme_yeri: string;
  sevk_yeri: string;
  arac_tipi: string;
  yuk_nevi: string;
  navlun: string;
  aciklama: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type JobInput = {
  yukleme_yeri: string;
  sevk_yeri: string;
  arac_tipi: string;
  yuk_nevi: string;
  navlun: string;
  aciklama: string;
  published?: boolean;
};

function normalize(input: JobInput): Required<JobInput> {
  return {
    yukleme_yeri: input.yukleme_yeri.trim(),
    sevk_yeri: input.sevk_yeri.trim(),
    arac_tipi: input.arac_tipi.trim(),
    yuk_nevi: input.yuk_nevi.trim(),
    navlun: input.navlun.trim(),
    aciklama: input.aciklama.trim(),
    published: Boolean(input.published),
  };
}

export async function listPublishedJobs(): Promise<Job[]> {
  return sql<Job>(
    `select * from jobs where published = true order by updated_at desc`,
  );
}

export async function listAllJobs(): Promise<Job[]> {
  return sql<Job>(`select * from jobs order by updated_at desc`);
}

export async function getJob(id: string): Promise<Job | null> {
  const rows = await sql<Job>(`select * from jobs where id = $1`, [id]);
  return rows[0] ?? null;
}

export async function createJob(input: JobInput): Promise<Job> {
  const data = normalize(input);
  const id = crypto.randomUUID();
  const rows = await sql<Job>(
    `insert into jobs (
      id, yukleme_yeri, sevk_yeri, arac_tipi, yuk_nevi, navlun, aciklama, published
    ) values ($1, $2, $3, $4, $5, $6, $7, $8)
    returning *`,
    [
      id,
      data.yukleme_yeri,
      data.sevk_yeri,
      data.arac_tipi,
      data.yuk_nevi,
      data.navlun,
      data.aciklama,
      data.published,
    ],
  );
  return rows[0];
}

export async function updateJob(
  id: string,
  input: JobInput,
): Promise<Job | null> {
  const data = normalize(input);
  const rows = await sql<Job>(
    `update jobs set
      yukleme_yeri = $2,
      sevk_yeri = $3,
      arac_tipi = $4,
      yuk_nevi = $5,
      navlun = $6,
      aciklama = $7,
      published = $8,
      updated_at = now()
    where id = $1
    returning *`,
    [
      id,
      data.yukleme_yeri,
      data.sevk_yeri,
      data.arac_tipi,
      data.yuk_nevi,
      data.navlun,
      data.aciklama,
      data.published,
    ],
  );
  return rows[0] ?? null;
}

export async function setJobPublished(
  id: string,
  published: boolean,
): Promise<Job | null> {
  const rows = await sql<Job>(
    `update jobs set published = $2, updated_at = now() where id = $1 returning *`,
    [id, published],
  );
  return rows[0] ?? null;
}

export async function deleteJob(id: string): Promise<boolean> {
  const rows = await sql<{ id: string }>(
    `delete from jobs where id = $1 returning id`,
    [id],
  );
  return rows.length > 0;
}

export function jobSummary(job: Pick<
  Job,
  "yukleme_yeri" | "sevk_yeri" | "arac_tipi" | "yuk_nevi" | "navlun"
>): string {
  return [
    `Yükleme: ${job.yukleme_yeri || "—"}`,
    `Sevk: ${job.sevk_yeri || "—"}`,
    `Araç: ${job.arac_tipi || "—"}`,
    `Yük: ${job.yuk_nevi || "—"}`,
    `Navlun: ${job.navlun || "—"}`,
  ].join(" | ");
}
