import prismadb from "@/lib/prismadb";

import { ColorForm } from "./components/color-form";
var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  let color;
  if (checkForHexRegExp.test(params.colorId)) {
    color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
  } else {
    color = null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
