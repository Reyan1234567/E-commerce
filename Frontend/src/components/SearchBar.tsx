import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Auth/axios";
// import { useForm } from 'react-hook-form';

const SearchBar = () => {
  const [seacrchVal, setSearchVal] = useState("");
  const onSubmit = (data: string) => {
    useEffect(() => {
      const filter = async () => {
        if (!seacrchVal) {
          api.get(`/home&filter=${seacrchVal}`);
        }
        else{
          api.get(`/home`);
        }
      };

      filter();
    });
  };
  return (
    <form>
      <label className="input">
        <input
          type="search"
          value={seacrchVal}
          className="grow"
          placeholder="Search"
          onChange={(e) => onSubmit(e.target.value)}
        />
        <button
          className="bg-transparent border-none p-0 cursor-pointer"
          type="submit"
        >
          <Search size={16} />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
