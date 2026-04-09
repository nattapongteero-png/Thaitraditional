import VisitClient from "./VisitClient";

export function generateStaticParams() {
  return [
    { id: "P001" }, { id: "P002" }, { id: "P003" }, { id: "P004" },
    { id: "P005" }, { id: "P006" }, { id: "P007" }, { id: "P008" },
    { id: "1" }, { id: "2" }, { id: "3" },
  ];
}

export default function Page() {
  return <VisitClient />;
}
