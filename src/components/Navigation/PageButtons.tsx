import { Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageButtons = ({
  page,
  count,
  urlPrefix,
}: {
  page: number;
  count: string;
  urlPrefix: string;
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

  return (
    <ButtonGroup colorScheme="blue" size="sm">
      {page !== 1 && (
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(`/${urlPrefix}?page=${page - 1}`);
          }}
          aria-label="Previous Page"
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
              navigate(`/${urlPrefix}?page=${pageNumber}`);
            }}
            aria-label={`Page ${pageNumber}`}
            outline={page === pageNumber ? "2px solid red" : "none"}
            key={pageNumber}
          >
            {pageNumber}
          </Button>
        );
      })}
      {page !== Math.ceil(Number(count) / 20) && (
        <Button
          onClick={() => {
            if (page === 3) {
              return;
            }
            window.scrollTo(0, 0);
            navigate(`/${urlPrefix}?page=${page + 1}`);
          }}
          aria-label="Previous Page"
        >
          &gt;
        </Button>
      )}
    </ButtonGroup>
  );
};

export default PageButtons;
