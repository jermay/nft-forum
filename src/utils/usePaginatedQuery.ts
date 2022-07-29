import { useEffect, useMemo, useState } from "react";
import { useNotification } from "web3uikit";

export type PageCursor = string | null;

export interface Page<T> {
  cursor: PageCursor;
  num: number;
  data: T[];
}

export interface PaginatedQueryParams {
  cursor?: PageCursor;
  pageSize?: number;
}

export interface PaginatedQueryResult<T> {
  cursor?: PageCursor;
  page_size?: number;
  page: number;
  result: T[];
  status?: string;
  total: number;
}

export interface PaginatedQueryOptions {
  skip?: boolean;
  pageSize?: number;
}

export const usePageinatedQuery = <P, T>(
  params: P,
  query: (params: P & PaginatedQueryParams) => Promise<PaginatedQueryResult<T>>,
  options?: PaginatedQueryOptions
) => {
  const dispatchNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<Page<T>>();
  const [pages, setPages] = useState(new Map<number, Page<T>>());
  const [totalResults, setTotalResults] = useState(0);
  const [status, setStatus] = useState("");

  const notifyError = (message: string) => {
    dispatchNotification({
      type: "error",
      title: "",
      message,
      position: "topR",
    });
  };

  const hasNextPage = useMemo(() => {
    return page && page.cursor;
  }, [page]);

  const prevPage = useMemo(
    () => (page && pages ? pages.get(page.num - 1) : undefined),
    [page]
  );

  const hasPrevPage = useMemo(() => !!prevPage?.cursor, [prevPage]);

  const fetchPage = async (cursor: PageCursor): Promise<void> => {
    try {
      setLoading(true);
      
      const args: P & PaginatedQueryParams = {
        ...params,
        pageSize: options?.pageSize || 10,
      };
      if (cursor) args.cursor = cursor;
      const data = await query(args);

      const newPage: Page<T> = {
        num: data.page,
        cursor: data.cursor || null,
        data: data.result,
      };
      pages.set(newPage.num, newPage);
      setPage(newPage);
      setStatus(data.status || "");
      setTotalResults(data.total);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const goToNextPage = async (): Promise<void> => {
    if (!page) return refresh();

    const nextPageNum = page.num + 1;
    if (pages.has(nextPageNum)) return setPage(pages.get(nextPageNum));

    await fetchPage(page.cursor);
  };

  const goToPrevPage = async (): Promise<void> => {
    if (!page) return refresh();
    setPage(prevPage);
  };

  const refresh = async (): Promise<void> => {
    setPage(undefined);
    pages.clear();
    setStatus("");
    setTotalResults(0);
    await fetchPage(null);
  };

  useEffect(() => {
    if (options?.skip || loading || totalResults > 0) return;
    refresh();
  }, [options]);

  return {
    goToNextPage,
    goToPrevPage,
    hasNextPage,
    hasPrevPage,
    loading,
    page,
    refresh,
    status,
    totalResults,
  };
};
