import { Helmet } from "react-helmet";

export function ReactHelmet(props: PropsType) {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description || props.title} />
    </Helmet>
  );
}

type PropsType = {
  title: string;
  description?: string;
};
