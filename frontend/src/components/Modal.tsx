interface BootstrapModalProps {
  isOpen: boolean; // Controls modal visibility
  title?: string; // Optional title
  size: string;
  body: string | React.ReactNode; // Modal body content
  onClose: () => void; // Callback to close the modal
  // onConfirm?: () => void; // Optional callback for confirm action
}

const BootstrapModal: React.FC<BootstrapModalProps> = ({ 
  isOpen, 
  title, 
  size,
  body,
  onClose
}) => {
  return (
    <div 
      className={`modal ${size} fade ${isOpen ? "show d-block" : ""}`} 
      tabIndex={-1} 
      style={{ backgroundColor: isOpen ? "rgba(0, 0, 0, 0.5)" : "transparent" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
