import "./Modal.css";

interface ModalProps {
  title: string;
  canCancel?: boolean;
  canConfirm?: boolean;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  canCancel,
  canConfirm,
  confirmText,
  onCancel,
  onConfirm,
  children,
}) => (
  <div className="modal">
    <header className="modal__header">
      <h1>{title}</h1>
    </header>
    <section className="modal__content">{children}</section>
    <section className="modal__actions">
      {canCancel && (
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
      )}
      {canConfirm && (
        <button className="btn" onClick={onConfirm}>
          {confirmText}
        </button>
      )}
    </section>
  </div>
);

export default Modal;
