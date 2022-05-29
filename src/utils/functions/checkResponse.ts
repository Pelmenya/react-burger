export const checkResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  const data: any = await res.json();
  if (data?.message)   
    return Promise.reject(`Bad request: ${res.status} : ${data.message}`);
  return Promise.reject(`Bad request: ${res.status}`);
};
