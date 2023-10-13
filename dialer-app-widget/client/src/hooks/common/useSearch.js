const useSearch = (list = [], key = null, keyword = "") => {
  if (!key) {
    return list;
  }

  return list&&list.length>0&& list?.filter((item) =>
    item[key]?.toLowerCase().includes(keyword?.toLowerCase())
  );
};

export default useSearch;
