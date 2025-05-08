import NavItem from '@/components/Navbar/NavItem';

const NavList = ({ navList, activeSection, scrollToSection }) => (
  <ul className='flex gap-4 text-sm'>
    {navList.map((item) => (
      <li key={item.href}>
        <NavItem
          href={item.href}
          label={item.name}
          isActive={activeSection === item.href}
          onClick={(e) => scrollToSection(e, item.href)}
        />
      </li>
    ))}
  </ul>
);

export default NavList;
