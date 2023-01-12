import React, { useContext } from "react";
import API from "../api/api";
import { AppState } from "../AppContext";
import ReactDOM from "react-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

interface ModalProps {
  children: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required(),
  dueDate: Yup.date().required(),
});

const Modal: React.FunctionComponent<{
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
}> = ({ closeModal, status }) => {
  const { token, setRerender } = useContext(AppState);
  const formik = useFormik({
    initialValues: {
      description: "",
      dueDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let config = {
        headers: {
          Authorization: "Bearer " + token!.token,
        },
      };
      const data: {
        description: string;
        userId: string | undefined;
        status: string;
        dueDate: string;
      } = {
        ...values,
        userId: token?.user._id,
        status: status,
      };

      API.post("tasks", data, config).then((res) => {
        if (res.data.status === "success") {
          setRerender(res.data);
          closeModal(false);
        }
      });
    },
  });
  return (
    <Portal>
      <div
        onClick={() => closeModal(false)}
        className="overlay w-full h-full  absolute  inset-0 bg-opacity-20 bg-black "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-auto mt-5 flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
        >
          <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Enter Task Details
          </div>
          <div className="mt-8">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <textarea
                    name="description"
                    className=" rounded flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    rows={5}
                  />
                </div>
                {formik.touched.description && formik.errors.description ? (
                  <span className="error text-white">
                    {formik.errors.description}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <input
                    type="date"
                    name="dueDate"
                    className=" rounded flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your password"
                    onChange={formik.handleChange}
                    value={formik.values.dueDate}
                  />
                </div>
                {formik.touched.dueDate && formik.errors.dueDate ? (
                  <div className="error text-white ">
                    {formik.errors.dueDate}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center mb-6 -mt-4"></div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Portal>
  );
};

const Portal = (props: ModalProps) => {
  return ReactDOM.createPortal(
    props.children,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
