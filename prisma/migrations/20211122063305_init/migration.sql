-- CreateTable
CREATE TABLE "Publisher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Authors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tittle" TEXT NOT NULL,
    "total_pages" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "book_path" TEXT NOT NULL,
    "published_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publisher_id" INTEGER NOT NULL,
    CONSTRAINT "Books_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genres" (
    "genre" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Book_authors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" INTEGER NOT NULL,
    CONSTRAINT "Book_authors_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Book_genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" INTEGER NOT NULL,
    "genre_id" TEXT NOT NULL,
    CONSTRAINT "Book_genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("genre") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Books_tittle_key" ON "Books"("tittle");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_genre_key" ON "Genres"("genre");

-- CreateIndex
CREATE UNIQUE INDEX "Book_authors_book_id_key" ON "Book_authors"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_genres_book_id_key" ON "Book_genres"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_genres_genre_id_key" ON "Book_genres"("genre_id");
