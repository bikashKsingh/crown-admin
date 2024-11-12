import Select from "react-select";

export function CustomSelect(props: PropsType) {
  return (
    <>
      <label htmlFor={props.name} className="">
        {props.label}
        {props.required ? <span className="text-danger"> *</span> : null}
      </label>

      <Select
        placeholder={props.placeholder}
        options={props.options}
        styles={{
          placeholder: (styles) => ({
            ...styles,
            paddingLeft: "0px",
            fontSize: "13px",
          }),
          input: (styles) => ({
            ...styles,

            padding: "10px 0",
            fontSize: "13px",
          }),
          option: (styles) => ({
            ...styles,
            paddingLeft: "20px",
            fontSize: "13px",
          }),
          valueContainer: (styles) => ({
            ...styles,
            paddingLeft: "20px",
            fontSize: "13px",
          }),
        }}
        onChange={(value: any) => {
          props.handleChange(value);
        }}
        onBlur={() => {
          props.handleBlur(true);
        }}
        value={props.value}
        isMulti={props.isMulti}
      />

      {props.error && props.touched ? (
        <p className="custom-form-error text-danger">{props.error}</p>
      ) : null}
    </>
  );
}

type Option = {
  label: string;
  value: any;
};

type PropsType = {
  label: string;
  placeholder?: string;
  name: string;
  value: Option | Option[] | null;
  required?: boolean;
  error?: string;
  touched?: boolean;
  handleChange: (value: Option) => void;
  handleBlur: (value: boolean) => void;
  options: Option[];
  isMulti?: boolean;
};
