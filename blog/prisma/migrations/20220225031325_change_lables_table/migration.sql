/*
  Warnings:

  - You are about to drop the `LabelsOnPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LabelsOnPosts" DROP CONSTRAINT "LabelsOnPosts_labelId_fkey";

-- DropForeignKey
ALTER TABLE "LabelsOnPosts" DROP CONSTRAINT "LabelsOnPosts_postId_fkey";

-- DropTable
DROP TABLE "LabelsOnPosts";

-- CreateTable
CREATE TABLE "_LabelToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LabelToPost_AB_unique" ON "_LabelToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LabelToPost_B_index" ON "_LabelToPost"("B");

-- AddForeignKey
ALTER TABLE "_LabelToPost" ADD FOREIGN KEY ("A") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabelToPost" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
