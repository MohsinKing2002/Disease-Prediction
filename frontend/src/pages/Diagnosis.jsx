import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { symtomps } from "../apis/symtomps";
import Toast from "../components/Toast";
const base_url = "http://localhost:5000";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [modalopen, setmodalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [SymptomsData, setSymptomsData] = useState(symtomps);
  const [selected, setSelected] = useState(SymptomsData[0]);
  const [selectedData, setSelectedData] = useState([]);
  const [data, setData] = useState();

  const handlePredictionClick = async () => {
    setLoading(true);
    let symptoms = "";
    selectedData.forEach((item) => (symptoms += item + ","));

    try {
      const res = await fetch(`${base_url}/api/disease-predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: symptoms.slice(0, -1) }),
      });
      const result = await res.json();
      console.log("result", result);
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setmodalOpen(true);
      console.log("fetch prediction data error ->", error);
    }
  };

  const formatString = (str) => {
    // Split the string by underscores and capitalize each word
    const words = str
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );

    // Join the capitalized words with spaces
    return words.join(" ");
  };

  const Add_to_selected = (str) => {
    setSymptomsData(SymptomsData.filter((item) => item !== str));
    setSelectedData([...selectedData, str]);
  };

  const Delete_from_selected = (str) => {
    setSelectedData(selectedData.filter((item) => item !== str));
    setSymptomsData([...SymptomsData, str]);
  };

  return (
    <div className="min-h-[80vh]">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="w-4/5 sm:w-1/2 lg:w-5/12 mx-auto py-16">
        {loading && (
          <div className="h-60 absolute top-40 left-1/2">
            <div
              role="status"
              class=" absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <svg
                aria-hidden="true"
                class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                Select Symptoms
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">
                      {formatString(selected)}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {SymptomsData.map((symptom, index) => (
                      <Listbox.Option
                        key={index}
                        onClick={() => Add_to_selected(symptom)}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={symptom}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {formatString(symptom)}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        {selectedData.length > 0 ? (
          <div>
            <label className="pt-8 pb-1.5 block text-sm font-medium leading-6 text-gray-900">
              Selected Symptoms
            </label>
            <div className="flex items-center flex-wrap">
              {selectedData?.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => Delete_from_selected(symptom)}
                  className=" flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm pl-5 pr-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  {formatString(symptom)}

                  <XMarkIcon className="ml-3 h-5 w-5 text-gray-400" />
                </button>
              ))}
            </div>
            <div className="my-4">
              <button
                disabled={loading}
                onClick={handlePredictionClick}
                className={`block w-full rounded-md ${
                  loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
                } px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Get Prediction Report
              </button>
            </div>
          </div>
        ) : (
          <label className="py-8 block text-base font-medium leading-6 text-gray-500">
            No Symptoms Selected !
          </label>
        )}

        {data && (
          <div
            id="toast-success"
            className="w-full mx-auto max-w-sm p-4 mb-4 text-gray-500 border border-gray-200 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                </div>
                <label className="ml-2 text-base font-medium leading-6 text-gray-500">
                  Prediction Report
                </label>
              </div>
              <button
                onClick={() => {
                  setData(null);
                  setSelectedData([]);
                }}
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            <div className="pt-4 px-3 text-base font-normal">
              According to the symptoms, The Model predicts that you might be
              suffering from{" "}
              <label className="text-lg font-medium text-gray-900">
                {data?.final_prediction}
              </label>
              .
            </div>
          </div>
        )}
      </div>

      {modalopen && (
        <Toast
          open={true}
          type="error"
          message="Failed to connect to the server!"
        />
      )}
    </div>
  );
}
