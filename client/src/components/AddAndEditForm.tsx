// Interface and Types
interface VisualType {
    id: string;
    name: string;
    imagePath: string;
    workspacePath?: string;
    description: string;
}

interface AddAndEditFormProps {
    showAddForm: boolean;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
    formData: VisualType;
    setFormData: React.Dispatch<React.SetStateAction<VisualType>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AddAndEditForm: React.FC<AddAndEditFormProps> = ({ showAddForm, setShowAddForm, setShowEditForm, formData, setFormData, handleSubmit }) => {
    return (
        <form className="visual-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                required
            />
            <input
                type="text"
                name="id"
                placeholder="ID"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
            />
            <input
                type="text"
                name="imagePath"
                placeholder="Image Path"
                value={formData.imagePath}
                onChange={(e) =>
                    setFormData({ ...formData, imagePath: e.target.value })
                }
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
                required
            />

            <button type="submit">
                {showAddForm ? "Add Visual" : "Update Visual"}
            </button>
            
            <button
                type="button"
                onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    setFormData({ 
                        name: "", 
                        id: "", 
                        imagePath: "", 
                        workspacePath: "",
                        description: "" 
                    });
                }}
            >
                Cancel
            </button>
        </form>
    )
}

export default AddAndEditForm;