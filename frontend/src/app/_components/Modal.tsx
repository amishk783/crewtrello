import ReactDOM from "react-dom";
import { cn } from "../_utils";

export const Modal: React.FC<{
  children: React.ReactNode;
  classname?: string;
}> = ({ children }) => {
  const modalRoot = document.getElementById("myportal") as Element;
  return ReactDOM.createPortal(
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      )}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto p-6">
        {children}
      </div>
    </div>,
    modalRoot
  );
};
