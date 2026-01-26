import SectionRow from "./SectionRow";

export default function HotelsSection({ hotels }) {
  return <SectionRow title="Hotels" data={hotels} type="hotel" />;
}
