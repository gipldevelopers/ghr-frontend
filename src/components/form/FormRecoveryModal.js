// src/components/form/FormRecoveryModal.js
"use client";
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

export default function FormRecoveryModal({ isOpen, onRecover, onDiscard }) {
  const [hasSavedData, setHasSavedData] = useState(false);

  useEffect(() => {
    const checkSavedData = () => {
      const saved = localStorage.getItem('hrms_employee_form_data');
      setHasSavedData(!!saved);
    };
    
    checkSavedData();
  }, []);

  if (!hasSavedData) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                    Recover Form Data
                  </Dialog.Title>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We found previously saved form data. Would you like to recover it?
                  </p>
                </div>

                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    onClick={onDiscard}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <X className="w-4 h-4 mr-2 inline" />
                    Discard
                  </button>
                  <button
                    onClick={onRecover}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    <RotateCcw className="w-4 h-4 mr-2 inline" />
                    Recover Data
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}