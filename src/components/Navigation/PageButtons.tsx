import { Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageButtons = ({ page, count }: { page: number; count: string }) => {
  const navigate = useNavigate();

  const [pageButtons, setPageButtons] = useState<number[]>([]);
  // Create page navigation buttons on count change
  useEffect(() => {
    // console.log(count);
    const pages: number[] = [];
    for (let i = 1; i < Math.ceil((Number(count) + 20) / 20); i++) {
      pages.push(i);
    }

    setPageButtons(pages);
    console.log(pages);
  }, [count]);

  return (
    <ButtonGroup colorScheme="blue" size="sm">
      <Button
        onClick={() => {
          if (page === 1) {
            return;
          }
          window.scrollTo(0, 0);
          navigate(`/products?page=${page - 1}`);
        }}
        aria-label="Previous Page"
      >
        &lt;
      </Button>
      <Button
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/products");
        }}
        aria-label="Page 1"
        outline={page === 1 ? "2px solid red" : "none"}
      >
        1
      </Button>
      <Button
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/products?page=2");
        }}
        aria-label="Page 2"
        outline={page === 2 ? "2px solid red" : "none"}
      >
        2
      </Button>
      <Button
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/products?page=3");
        }}
        aria-label="Page 3"
        outline={page === 3 ? "2px solid red" : "none"}
      >
        3
      </Button>
      <Button
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/products?page=4");
        }}
        aria-label="Page 4"
        outline={page === 4 ? "2px solid red" : "none"}
      >
        4
      </Button>
      <Button
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/products?page=5");
        }}
        aria-label="Page 5"
        outline={page === 5 ? "2px solid red" : "none"}
      >
        5
      </Button>
      <Button
        onClick={() => {
          if (page === 3) {
            return;
          }
          window.scrollTo(0, 0);
          navigate(`/products?page=${page + 1}`);
        }}
        aria-label="Previous Page"
      >
        &gt;
      </Button>
    </ButtonGroup>
  );
};

export default PageButtons;
