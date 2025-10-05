import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 w-full py-4 px-6 bg-white border-b border-gray-200 flex items-center space-x-4 justify-between">
      <Link href="/" className="font-bold text-xl">
        Stole My Bike
      </Link>
      <div>
        <Link href="/report" className="px-4 py-2 font-semibold">
          Report a Theft
        </Link>
        <Link href="/bike-found" className="px-4 py-2 font-semibold">
          I Found Bike
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
