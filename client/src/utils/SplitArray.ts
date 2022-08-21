export type diaries = { _id: string; createdAt: string };

export const itemsPerPage = 3;

export const SplitArray = (array: diaries[], pages: number) => {
  const newItems = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    const tempItems = array.slice(start, start + itemsPerPage);
    return tempItems;
  });
  return newItems;
};
