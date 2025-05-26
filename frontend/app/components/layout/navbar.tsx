import { Globe, ShoppingCart, User, Camera } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFilterProduct } from "~/hooks/useFilterProduct";
import { useRef, useState } from "react";

export default function Navbar() {
  const { filters, setQueryParams } = useFilterProduct();
  const { search, sortBy, sortOrder } = filters;
  const [searchInput, setSearchInput] = useState(search);

  return (
    <header className="border-b shadow-sm bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-orange-500">
          Elecstore.com
        </a>

        {/* Search bar */}
        <div className="flex flex-1 max-w-2xl mx-4 items-center space-x-2">
          <div className="relative flex-1">
            <Input
              value={searchInput}
              type="text"
              placeholder="search.."
              className="pl-10"
              onChange={(e) => {
                setSearchInput((e.target as HTMLInputElement).value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setQueryParams({
                    ...filters,
                    search: (e.target as HTMLInputElement).value,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    page: 1,
                  });
                }
              }}
            />
            <Camera className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button
            onClick={() => {
              if (searchInput !== "") {
                setQueryParams({
                  search: searchInput,
                  sortBy: sortBy,
                  sortOrder: sortOrder,
                  page: 1,
                });
              }
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Search
          </Button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Deliver to:</span>
            <img src="https://flagcdn.com/w40/id.png" alt="ID" className="w-5 h-3 object-cover" />
            <span>ID</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-600 text-sm">
            <Globe className="w-4 h-4" />
            <span>English-USD</span>
          </div>

          <ShoppingCart className="w-5 h-5 text-gray-600" />

          <Button variant="ghost" className="text-sm px-2">
            <User className="w-4 h-4 mr-1" />
            Sign in
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
