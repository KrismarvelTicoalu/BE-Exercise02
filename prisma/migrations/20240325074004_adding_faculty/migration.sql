-- CreateTable
CREATE TABLE "students" (
    "nama" VARCHAR(50),
    "alamat" VARCHAR(100),
    "nim" VARCHAR(15) NOT NULL,
    "jurusan" VARCHAR(30),

    CONSTRAINT "students_pkey" PRIMARY KEY ("nim")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);
