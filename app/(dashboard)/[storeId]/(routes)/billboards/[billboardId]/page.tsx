import prismadb from "@/lib/prismadb";

import { BillboardForm } from "./components/billboard-form";
var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  let billboard;
  if (checkForHexRegExp.test(params.billboardId)) {
    billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
  } else {
    billboard = null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
