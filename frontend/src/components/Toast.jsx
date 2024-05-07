import React, { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const Toast = ({ open = true, message = "", type = "success" }) => {
  const [modalopen, setmodalOpen] = useState(open);
  return (
    <>
      {modalopen ? (
        <div
          id="toast-success"
          className="absolute bottom-4 right-8 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 border border-gray-200 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            {type === "success" ? (
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-500" />
            )}
          </div>
          <div className="ms-3 text-sm font-normal">{message}</div>
          <button
            onClick={() => setmodalOpen(false)}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Toast;
