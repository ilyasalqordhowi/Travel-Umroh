CREATE Table "kabupaten_kota"(
 "id" SERIAL PRIMARY KEY,
 "provinsi_id" int references "provinsi"("id"),
 "name" VARCHAR(255)
)