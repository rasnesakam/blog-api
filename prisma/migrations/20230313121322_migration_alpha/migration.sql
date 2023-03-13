-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL DEFAULT 'Anonymous',
    "surname" VARCHAR(30) NOT NULL DEFAULT 'Anonymous',
    "mail" VARCHAR(50) NOT NULL DEFAULT 'Anonymous',
    "text" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkTree" (
    "id" TEXT NOT NULL,
    "linkName" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "LinkTree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaData" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "postId" TEXT NOT NULL,
    "categoryId" TEXT,
    "areaId" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "featuredImg" TEXT NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "content" TEXT NOT NULL,
    "uri" VARCHAR(30) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MetaDataToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_key" ON "Area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MetaData_postId_key" ON "MetaData"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "MetaData_categoryId_key" ON "MetaData"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "MetaData_areaId_key" ON "MetaData"("areaId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_uri_key" ON "Post"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MetaDataToTag_AB_unique" ON "_MetaDataToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MetaDataToTag_B_index" ON "_MetaDataToTag"("B");

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MetaDataToTag" ADD CONSTRAINT "_MetaDataToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "MetaData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MetaDataToTag" ADD CONSTRAINT "_MetaDataToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
