import clsx from "clsx";

export default function TailwindCSS() {
  return (
    <div>
      <ul className="[&>li]:bg-white [&>li]:text-red-500 items-center">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  );
}
