import api from "./axios";

const slugMap: { [key: string]: string } = {
  board: "board",
  task: "task",
  list: "list",
};

export const fetchDocs = async <T>(args: {
  slug: string;
  method?: string;
  params?: { [key: string]: string };
  payload?: { [key: string]: string };
}): Promise<T[]> => {
  const { slug, params } = args || {};

  let { method } = args;

  method = method || "POST";
  method = method?.toLowerCase();

  if (!slugMap[slug]) throw new Error(`Slug ${slug} not found`);

  const url = `/${slugMap[slug]}/`;
  try {
    const { data } = await api.request<T[]>({
      method,
      url,
      data: ["post", "put", "patch"].includes(method) ? "payload" : undefined,
      params,
    });
    const docs: T[] = data;

    return docs;
  } catch (error) {
    console.error(`Error in fetchDocs: ${error}`);
    throw error;
  }
};
