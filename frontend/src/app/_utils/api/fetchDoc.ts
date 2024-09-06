import api from "./axios";

const slugMap: { [key: string]: string } = {
  board: "board",
  task: "task",
  list: "list",
};

export const fetchDoc = async <T>(args: {
  slug: string;
  method?: string;
  params?: { [key: string]: string };
  payload?: { [key: string]: string };
}): Promise<T> => {
  const { slug, payload, params } = args || {};
  let { method } = args;

  method = method || "POST";
  method = method?.toLowerCase();

  if (!slugMap[slug]) throw new Error(`Slug ${slug} not found`);
  let url;
  if (["post", "put", "patch"].includes(method) && params) {
    url = `/${slugMap[slug]}/${params.id}/`;
  } else {
    url = `/${slugMap[slug]}/`;
  }
  
  try {
    const { data } = await api.request<T>({
      method,
      url,
      data: ["post", "put", "patch"].includes(method) ? payload : undefined,
      params: ["post", "put", "patch"].includes(method) ? undefined : params,
    });
    return data;
  } catch (error) {
    console.error(`Error in fetchDoc: ${error}`);
    throw error;
  }
};
