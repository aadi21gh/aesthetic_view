import { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="sm:hidden p-2 bg-[#5A3E2B] text-white rounded" onClick={()=>setOpen(!open)}>
        ☰
      </button>
      {open && (
        <div className="sm:hidden absolute top-0 left-0 w-full h-full bg-[#F5EEDC] p-5 z-50">
          <Link to="/states" className="block py-2" onClick={()=>setOpen(false)}>States</Link>
          <Link to="/festivals" className="block py-2" onClick={()=>setOpen(false)}>Festivals</Link>
          <Link to="/hotels" className="block py-2" onClick={()=>setOpen(false)}>Hotels</Link>
          <Link to="/guides" className="block py-2" onClick={()=>setOpen(false)}>Guides</Link>
        </div>
      )}
    </>
  );
}
