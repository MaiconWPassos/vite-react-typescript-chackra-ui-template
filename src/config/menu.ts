import { FiEdit2, FiFileText, FiHome, FiShoppingCart } from "react-icons/fi";
import { IconType } from "react-icons/lib";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

export interface NavgationitemsProps {
  name: string;
  icon: IconType;
  to: string;

  items?: Array<LinkItemProps>;
}

const LinkItems: Array<NavgationitemsProps> = [
  { name: "Home", icon: FiHome, to: "/app" },

  {
    name: "Products",
    icon: FiShoppingCart,
    to: "/app/products",

    items: [
      {
        name: "List Product",
        icon: FiFileText,
        to: "/app/products/list",
      },
      {
        name: "New Product",
        icon: FiEdit2,
        to: "/app/products/new",
      },
    ],
  },
];

export default LinkItems;
