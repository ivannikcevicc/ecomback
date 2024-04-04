import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";
var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  let category;
  if (checkForHexRegExp.test(params.categoryId)) {
    category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
  } else {
    category = null;
  }

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
