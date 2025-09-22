// Imports
import { useEffect, useState } from "react";
import VisualsDisplay from "./components/VisualsDisplay";
import SearchVisuals from "./components/SearchVisuals";
import AddAndEditForm from "./components/AddAndEditForm";

// Interface and Types
interface VisualType {
    id: string;
    name: string;
    imagePath: string;
    workspacePath?: string;
    description: string;
};

const App: React.FC = () => {

    // Variables
    const [visuals, setVisuals] = useState<VisualType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>("");
    const [formData, setFormData] = useState<VisualType>({
        id: '',
        name: '',
        imagePath: '',
        workspacePath: '',
        description: ''
    });

    const BaseUrl: string = "http://localhost:8000/visuals";
    const filteredVisuals: VisualType[] = search === "" ? visuals : visuals.filter((visualItem) => visualItem.id.includes(search));

    // Functions
    async function fetchVisuals(): Promise<void> {
        const response: Response = await fetch(BaseUrl, {
            method: "GET"
        });
        const data: VisualType[] = await response.json();
        setVisuals(data);
    };

    async function addVisual(payload: VisualType): Promise<void> {
        await fetch(BaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    };

    async function editVisual(id: string, payload: VisualType): Promise<void> {
        await fetch(`${BaseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    };

    async function deleteVisual(id: string): Promise<void> {
        await fetch(`${BaseUrl}/${id}`, {
            method: "DELETE"
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (showAddForm) {
            await addVisual(formData);
            fetchVisuals();
        } else if (showEditForm && editId) {
            await editVisual(editId, formData);
            fetchVisuals();
        }
        setFormData({ 
            name: "", 
            id: "", 
            imagePath: "", 
            workspacePath: "", 
            description: "" 
        });
    };

    const handleDeleteVisual = async (visualId: string): Promise<void> => {
        await deleteVisual(visualId);
        fetchVisuals();
    }

    // UseEffects
    useEffect(() => {
        fetchVisuals();
    }, []);

    return (
        <div className="app">
            <SearchVisuals 
                search={search} 
                setSearch={setSearch} 
                openAddForm={() => setShowAddForm(true)} 
            />

            <section className="container">
                {
                    filteredVisuals.length > 0 ? (
                        filteredVisuals.map((visualItem: VisualType) => (
                            <VisualsDisplay 
                                key={visualItem.id} 
                                visualItem={visualItem} 
                                setShowEditForm={setShowEditForm} 
                                setFormData={setFormData} 
                                setEditId={setEditId} 
                                handleDeleteVisual={handleDeleteVisual} 
                            />
                        ))
                    ) : (
                        <p>No visuals found.</p>
                    )
                }
            </section>

            {(showAddForm || showEditForm) && 
                <AddAndEditForm 
                    showAddForm={showAddForm} 
                    setShowAddForm={setShowAddForm} 
                    setShowEditForm={setShowEditForm} 
                    formData={formData} 
                    setFormData={setFormData} 
                    handleSubmit={handleSubmit} 
                />}
        </div>
    )
}

export default App