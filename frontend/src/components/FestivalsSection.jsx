import SectionRow from "./SectionRow";

export default function FestivalsSection({ festivals }) {
  return (
    <SectionRow title="Festivals" data={festivals} type="festival" />
  );
}
