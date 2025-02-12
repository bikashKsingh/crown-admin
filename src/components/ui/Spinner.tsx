export function Spinner(props: PropsType) {
  return (
    <div
      className="spinner-border spinner-border-sm"
      role="status"
      style={{ width: "1.5rem", height: "1.5rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

type PropsType = {};
