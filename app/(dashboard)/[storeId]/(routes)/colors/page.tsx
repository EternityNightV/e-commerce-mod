import { format } from "date-fns";

import prismadb from "@/lib/db";

import { ColorColomn } from "./components/columns"
import { Colorslient } from "./components/client";


const ColorsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColomn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Colorslient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;