const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="sticky top-0 left-0 mt-10">
      &copy; {year} | All rights reserved
    </footer>
  );
};

export default Footer;
