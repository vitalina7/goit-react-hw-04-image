import { useState} from "react";
import { SearchbarHeader, SearchForm, SearchFormButton,  SearchFormInput } from "./Searchbar.styled";
import { toast } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';

export const SearchBar = ({handleSubmit}) => {
  const [search, setSearch] = useState('');
  

 const onSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
     return toast.error('Please enter a value');
    }
    handleSubmit(search)
   resetForm();
  };
    
  const handleChange = (e) => {
    setSearch(e.currentTarget.value);
  };

  const resetForm = () => {
    setSearch('');
  }

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={onSubmit}>
          <SearchFormButton type="submit">
            <BiSearch size="20px" />
            Search
          </SearchFormButton>
          <SearchFormInput
            name="search"
            value={search}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
