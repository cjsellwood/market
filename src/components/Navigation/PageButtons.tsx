import { Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageButtons = ({
  page,
  count,
  urlPrefix,
  query,
  category,
}: {
  page: number;
  count: string;
  urlPrefix: string;
  query?: string;
  category?: string;
}) => {
  const navigate = useNavigate();

  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  // Create page navigation numbers on count change
  useEffect(() => {
    const pages: number[] = [];
    for (let i = 1; i < Math.ceil((Number(count) + 20) / 20); i++) {
      pages.push(i);
    }

    setPageNumbers(pages);
  }, [count]);

  // Don't show if no results to be shown on page
  if (count === "0" || Number(count) + 20 < page * 20) {
    return null;
  }

  return (
    <ButtonGroup>
      {page !== 1 && (
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            if (page - 1 === 1) {
              navigate(
                `/${urlPrefix}${query ? `?q=${query}` : ""}${
                  category ? `&category=${category}` : ""
                }`
              );
            } else {
              navigate(
                `/${urlPrefix}?page=${page - 1}${query ? `&q=${query}` : ""}${
                  category ? `&category=${category}` : ""
                }`
              );
            }
          }}
          aria-label="Previous Page"
          bg="transparent"
          borderBottomWidth="3px"
          borderColor="transparent"
          borderRadius="0"
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
        >
          &lt;
        </Button>
      )}
      {pageNumbers.map((pageNumber) => {
        return (
          <Button
            onClick={() => {
              if (page === pageNumber) {
                return;
              }
              window.scrollTo(0, 0);

              if (pageNumber === 1) {
                navigate(
                  `/${urlPrefix}${query ? `?q=${query}` : ""}${
                    category ? `&category=${category}` : ""
                  }`
                );
              } else {
                navigate(
                  `/${urlPrefix}?page=${pageNumber}${
                    query ? `&q=${query}` : ""
                  }${category ? `&category=${category}` : ""}`
                );
              }
            }}
            aria-label={`Page ${pageNumber}`}
            key={pageNumber}
            borderBottomWidth="3px"
            fontWeight="500"
            borderColor={page === pageNumber ? "#e5067d" : "transparent"}
            borderRadius="0"
            bg="transparent"
            _active={{ bg: "transparent" }}
            _hover={{ bg: "transparent" }}
          >
            {pageNumber}
          </Button>
        );
      })}
      {page !== Math.ceil(Number(count) / 20) && (
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(
              `/${urlPrefix}?page=${page + 1}${query ? `&q=${query}` : ""}${
                category ? `&category=${category}` : ""
              }`
            );
          }}
          aria-label="Next Page"
          bg="transparent"
          borderBottomWidth="3px"
          borderColor="transparent"
          borderRadius="0"
          _active={{ bg: "transparent" }}
          _hover={{ bg: "transparent" }}
        >
          &gt;
        </Button>
      )}
    </ButtonGroup>
  );
};

export default PageButtons;
