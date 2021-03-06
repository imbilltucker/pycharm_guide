import { Link } from 'gatsby';
import * as React from 'react';

export interface INavbarSubItemProps {
  label: string;
  href: string;
  accent?: string;
  icon?: string;
  description?: string;
}

const NavbarSubItem: React.FunctionComponent<INavbarSubItemProps> = ({ accent, href, label, icon, description }) => (
  <Link className="navbar-item " to={href}>
    <span>
      <span className={`icon has-text-${accent}`}>
        <i className={`fas fa-${icon}`} />
      </span>
      <strong>{label}</strong>
      {label && (
        <>
          <br />
          <span className="bio-dropdown-description">{description}</span>
        </>
      )}
    </span>
  </Link>
);

export default NavbarSubItem;
