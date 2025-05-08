import Link from 'next/link';

const NavItem = ({ href, label, isActive, onClick }) => (
  <div className="relative group">
    <Link
      href={href}
      onClick={onClick}
      className={`text-md font-medium tracking-wide cursor-pointer transition-all duration-300 ${isActive ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
        }`}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 ${isActive ? 'w-full' : 'group-hover:w-full'
          }`}
      />
    </Link>
  </div>
);

export default NavItem;
