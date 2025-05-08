import NavItem from '@/components/Navbar/NavItem';

const MobileMenu = ({ navList, activeSection, scrollToSection, handleMenuClose, menuRef }) => (
  <div
    ref={menuRef}
    id="mobile-menu"
    role="menu"
    aria-label="Mobile Navigation"
    className="md:hidden absolute top-16 right-4 left-4 bg-white/90 backdrop-blur-sm border border-green-100 rounded-lg shadow-lg py-4 px-6 flex flex-col items-center animate-fade-in z-20"
  >
    <ul className='flex flex-col gap-4 w-full'>
      {navList.map((item) => (
        <li key={item.href} className="w-full">
          <NavItem
            href={item.href}
            label={item.name}
            isActive={activeSection === item.href}
            onClick={(e) => {
              scrollToSection(e, item.href);
              handleMenuClose();
            }}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default MobileMenu;
