import "./SearchResultList.css";
import { SearchResult } from "./SearchResult";

const SearchResultList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <datalist id="results">
        {results.map((op)=><option>{op.recipe_name}</option>)}
    </datalist>
        
      })}
    </div>
  );
};

export default SearchResultList
