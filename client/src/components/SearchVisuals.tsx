// Interface and Types
interface VisualType {
    name: string;
    id: string;
    imagePath: string;
    workspacePath?: string;
    description: string;
}

interface SearchVisualsProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    openAddForm: () => void;
}

const SearchVisuals: React.FC<SearchVisualsProps> = ({ search, setSearch, openAddForm }) => {

    return (
        <header className="search-container">
            <h1>Power BI Custom Visuals Gallery</h1>
            <div>
                <input 
                    id="search" 
                    type="text" 
                    placeholder="Search Visual"
                    value={search}
                    onChange={(e) => {setSearch(e.target.value)}} 
                />
                <button id="add-button" onClick={openAddForm}>Add</button>
            </div>
        </header>
    )
}

export default SearchVisuals