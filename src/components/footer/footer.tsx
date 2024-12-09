import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="w-full border-t bg-[#0F1F1C] py-12 md:py-24">
      <div className="container grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        {/* <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder.svg"
            alt="Prodmast Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <Truck color="white" />
          <span className="text-xl font-semibold text-white">BPMP</span>
        </div>
        <p className="text-sm text-gray-400">
          Our solutions make production faster and cheaper. Contact us for
          more information.
        </p>
      </div> */}
        {/* <div className="grid gap-4">
        <h3 className="font-semibold text-white">Company</h3>
        <nav className="grid gap-2">
          <Link className="text-sm text-gray-400 hover:text-white" href="#">
            About
          </Link>
          <Link className="text-sm text-gray-400 hover:text-white" href="#">
            Customers
          </Link>
          <Link className="text-sm text-gray-400 hover:text-white" href="#">
            Newsroom
          </Link>
          <Link className="text-sm text-gray-400 hover:text-white" href="#">
            Events
          </Link>
        </nav>
      </div> */}
        {/* <div className="grid gap-4">
        <h3 className="font-semibold text-white">Industries</h3>
        <nav className="grid gap-2">
          <Link className="text-sm text-gray-400 hover:text-white" href="#">
            Precision Manufacturing
          </Link>
          <Link className="text-sm text-gray-400 hover:text-white" href="#">
            Industrial Manufacturing
          </Link>
          <Link className="text-sm text-gray-400 hover:text-white" href="#">
            High Tech & Electronics
          </Link>
          <Link className="text-sm text-gray-400 hover:text-white" href="#">
            Aerospace
          </Link>
        </nav>
      </div> */}
        <div className="grid gap-4">
          <h3 className="font-semibold text-white">Get in Touch</h3>
          <div className="flex gap-4">
            <Link className="text-gray-400 hover:text-white" href="#">
              olinick@smu.com
            </Link>
          </div>
          {/* <div className="flex gap-4">
          <Link className="text-gray-400 hover:text-white" href="#">
            LinkedIn
          </Link>
          <Link className="text-gray-400 hover:text-white" href="#">
            YouTube
          </Link>
          <Link className="text-gray-400 hover:text-white" href="#">
            Facebook
          </Link>
        </div> */}
        </div>
      </div>
      {/* <div className="container flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
      <div className="text-sm text-gray-400">
        © 2024 Prodmast. All rights reserved.
      </div>
      <nav className="flex gap-4">
        <Link className="text-sm text-gray-400 hover:text-white" href="#">
          Terms & Conditions
        </Link>
        <Link className="text-sm text-gray-400 hover:text-white" href="#">
          Privacy Policy
        </Link>
      </nav>
    </div> */}
    </footer>
  );
}
