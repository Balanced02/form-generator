/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";

/**
 * @param {array} formList
 * @param {func} onValidateSuccess
 * @param {obj} selectLists
 * @param {bool} loading
 * @param {obj} defaultFormValues
 */

const FormGenerator = React.forwardRef(
  (
    {
      formList,
      onValidateSuccess = () => {},
      selectLists = {},
      loading,
      defaultFormValues,
    },
    ref
  ) => {
    let obj = {};
    formList.map((formInput) => (obj[formInput.name] = ""));
    const [state, setState] = useState(obj);
    const [formError, setFormError] = useState(obj);

    const handleInputChange = (e) => {
      let name, value;
      if (e?.type === "custom") {
        [name, value] = [e.name, e.value];
      } else {
        [name, value] = [e.target.name, e.target.value];
      }
      const newState = {
        usernameError: "",
        passwordError: "",
        errorMessage: "",
        [name]: value,
      };
      setState((prevState) => ({
        ...prevState,
        ...newState,
      }));
      setFormError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    };

    const submitForm = (e) => {
      e.preventDefault();
      if (validateForm(state)) {
        return;
      }
      let dataToSubmit = {};
      formList.forEach((form) => {
        if (form.type === "select") {
          if (!form.multiple) {
            dataToSubmit[form.name] = state[form.name].value;
          } else {
            dataToSubmit[form.name] =
              state[form.name] && Array.isArray(state[form.name])
                ? state[form.name].map((dat) => dat.value)
                : null;
          }
        } else {
          dataToSubmit[form.name] = state[form.name];
        }
      });
      onValidateSuccess(dataToSubmit);
    };

    const validateForm = (formData) => {
      let errorMessage = {};
      let isError = false;
      //eslint-disable-next-line
      formList.map((form) => {
        if (form.required && !formData[form.name]) {
          errorMessage[form.name] = `Please provide value for ${form.label}`;
          isError = true;
        }
        if (form.type === "password" && state[form.name]?.length < 6) {
          errorMessage[form.name] = `Password must be greater than 6 letters`;
          isError = true;
        }
        if (
          form.required &&
          form.type === "select" &&
          form.multiple &&
          state[form.name]?.length < 1
        ) {
          errorMessage[form.name] = `Please provide value for ${form.label}`;
          isError = true;
        }
      });
      setFormError(errorMessage);
      return isError;
    };

    useEffect(() => {
      if (defaultFormValues) {
        let newFormState = {};
        // eslint-disable-next-line
        formList.map((formInput) => {
          if (formInput.type !== "select") {
            newFormState[formInput.name] = defaultFormValues[formInput.name];
          } else {
            if (!formInput.multiple) {
              newFormState[formInput.name] = selectLists[formInput.name].filter(
                (list) =>
                  defaultFormValues[formInput.name] &&
                  list.value === defaultFormValues[formInput.name].value
              )[0];
            } else {
              newFormState[formInput.name] =
                defaultFormValues[formInput.name] &&
                Array.isArray(defaultFormValues[formInput.name])
                  ? defaultFormValues[formInput.name].map(
                      (formInp) =>
                        selectLists[formInput.name].filter(
                          (list) =>
                            formInp.value && list.value === formInp.value
                        )[0]
                    )
                  : [];
            }
          }
        });
        setState((prevState) => ({
          ...prevState,
          ...newFormState,
        }));
      } else {
        setState(obj);
      }
    }, [defaultFormValues]);

    const resetForm = () => {
      setState(obj);
    };

    return (
      <form onSubmit={submitForm} ref={ref} onReset={resetForm}>
        <div className="row">
          {formList.map((formInput, index) => (
            <div
              className={`col-md-${formInput.fullWidth ? "12" : "6"}`}
              key={index}
            >
              <Input
                options={selectLists[formInput.name]}
                id={formInput.name}
                label={formInput.label}
                name={formInput.name}
                type={formInput.type}
                value={state[formInput.name]}
                onChange={(e) => {
                  handleInputChange(e);
                  if (
                    formInput.clearFieldsOnChange &&
                    Array.isArray(formInput.clearFieldsOnChange)
                  ) {
                    // eslint-disable-next-line
                    formInput.clearFieldsOnChange.map((field) => {
                      handleInputChange({
                        type: "custom",
                        name: field,
                        value: "",
                      });
                    });
                  }
                  if (formInput.callFunctionOnChange) {
                    formInput.callFunctionOnChange(e);
                  }
                }}
                max={formInput.max}
                errorMessage={formError[formInput.name]}
                disabled={loading}
                allowMultiple={formInput.multiple}
                showOnInput={formInput.showOnInput}
              />
            </div>
          ))}
        </div>
        <div className="clearfix"></div>
        <div className="float-right">
          <Button text="Submit" loading={loading} disabled={loading} />
        </div>
      </form>
    );
  }
);

export default FormGenerator;
