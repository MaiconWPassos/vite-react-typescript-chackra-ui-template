import {
  Navigate,
  useLocation,
  useResolvedPath,
  useMatch,
  Link,
} from "react-router-dom";
import { Outlet } from "react-router-dom";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Collapse,
  useColorMode,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown, FiChevronRight } from "react-icons/fi";

import { BsPalette } from "react-icons/bs";
import { IconType } from "react-icons";
import { ReactText, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import LinkItems, { NavgationitemsProps } from "@/config/menu";

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default function AppLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <RequireAuth>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.800")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4" bg="gray.50" minH="max-content">
          <Outlet />
        </Box>
      </Box>
    </RequireAuth>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("yellow.50", "purple.900")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="white"
        >
          {import.meta.env.VITE_APP_TITLE}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => {
        if (link.items) {
          return (
            <GroupItems
              key={link.name}
              icon={link.icon}
              items={link.items}
              name={link.name}
              to={link.to}
            />
          );
        }
        return (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        );
      })}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  to: string;
}

const GroupItems = ({
  icon,
  name,
  items,
  to,
  ...rest
}: NavgationitemsProps) => {
  const { isOpen, onToggle } = useDisclosure();

  let location = useLocation();

  const [active, setActive] = useState(false);

  useEffect(() => {
    let match = location.pathname.indexOf(to) >= 0;

    setActive(match);
  }, [location]);

  return (
    <>
      <Flex
        onClick={onToggle}
        align="center"
        p="3"
        role="group"
        cursor="pointer"
        color={active ? "cyan.200" : "white"}
        bg={active ? "whiteAlpha.400" : "none"}
        _hover={{
          bg: "whiteAlpha.100",
        }}
        fontFamily="monospace"
        fontSize="md"
        {...rest}
      >
        {icon && <Icon mr="2" fontSize="14" as={icon} />}
        {name}

        <Icon
          ml="auto"
          fontSize="14"
          as={isOpen ? FiChevronRight : FiChevronDown}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box bg="purple.600">
          {items?.map((item) => (
            <NavItem key={item.name} icon={item.icon} to={item.to}>
              {item.name}
            </NavItem>
          ))}
        </Box>
      </Collapse>
    </>
  );
};

const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Flex
        fontFamily="monospace"
        fontSize="md"
        align="center"
        p="3"
        role="group"
        cursor="pointer"
        color={match ? "cyan.200" : "white"}
        bg={match ? "whiteAlpha.400" : "none"}
        _hover={{
          bg: "whiteAlpha.100",
        }}
        {...rest}
      >
        {icon && <Icon mr="2" fontSize="14" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { toggleColorMode } = useColorMode();
  const { logOut } = useAuth();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="14"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {import.meta.env.VITE_APP_TITLE}
      </Text>

      <HStack spacing={{ base: "0", md: "2" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<BsPalette />}
          onClick={toggleColorMode}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
