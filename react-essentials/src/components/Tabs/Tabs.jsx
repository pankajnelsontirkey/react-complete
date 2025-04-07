export default function Tabs({
  children,
  menuItems,
  MenuContainer = 'menu'
  /* menuContainer */
}) {
  // const MenuContainer = menuContainer;

  return (
    <>
      <MenuContainer>{menuItems}</MenuContainer>
      {children}
    </>
  );
}
