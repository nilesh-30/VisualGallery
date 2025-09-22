// Interface and Types
interface VisualType {
    name: string;
    id: string;
    imagePath: string;
    workspacePath?: string;
    description: string;
}

interface VisualsDisplayProps {
    visualItem: VisualType;
    setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
    setEditId: React.Dispatch<React.SetStateAction<string>>;
    setFormData: React.Dispatch<React.SetStateAction<VisualType>>;
    handleDeleteVisual: (id: string) => void;
}

const VisualsDisplay: React.FC<VisualsDisplayProps> = ({ visualItem, setShowEditForm, setEditId, setFormData, handleDeleteVisual }) => {
    return (
        <>
            <div className="visualItem">
                <a title={`${visualItem.description}`} href="#">
                    <img src={`${visualItem.imagePath}`} alt={`${visualItem.name}`} />
                    <hr />
                    <div className="visualItemName">{visualItem.name}</div>
                </a>

                <div className="btn">
                    <button
                        onClick={() => {
                            setEditId(visualItem.id);
                            setFormData(visualItem);
                            setShowEditForm(true);
                        }}
                    >
                        Edit
                    </button>
                    <button onClick={() => handleDeleteVisual(visualItem.id)}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default VisualsDisplay;