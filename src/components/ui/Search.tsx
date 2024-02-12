"use client";

import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import qs from "query-string";

export const Search = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  const clearHandler = () => setValue("");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value) {
      return;
    }

    const query = qs.stringifyUrl(
      { url: "/search", query: { term: value } },
      { skipEmptyString: true }
    );
    router.push(query);
  };

  return (
    <form
      className="relative w-full lg:w-[400px] flex items-center"
      onSubmit={submitHandler}
    >
      <Input
        value={value}
        onChange={searchChangeHandler}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="absolute top-2.5 right-14 w-5 h-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={clearHandler}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="w-5 h-5 text-muted-foreground" />
      </Button>
    </form>
  );
};
