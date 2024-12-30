import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

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

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Close the modal if the click is outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className={`modal ${size} fade ${isOpen ? "show d-block" : ""}`} 
      tabIndex={-1} 
      style={{ backgroundColor: isOpen ? "rgba(0, 0, 0, 0.5)" : "transparent" }}
    >
      <div className="modal-dialog" ref={modalRef}>
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
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BootstrapModal;
