import Hello from "@/components/Hello";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>       React Next.js 1 Application </h2>
      <Hello />
      <Hello  message="Hi" color="blue"/>
      <Hello  message="Hello" color="red"/>
    </div>
  );
}
