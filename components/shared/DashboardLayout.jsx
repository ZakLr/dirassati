"use client";

import { useState, useEffect, useCallback } from "react";
import { Layout } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  CreditCardOutlined,
  ExclamationCircleOutlined,
  BookOpen,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  Group,
  Notebook,
  GraduationCap,
} from "lucide-react";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import styled from "styled-components";

const { Content, Footer } = Layout;

// Enhanced styled components matching the main page design
const StyledLayout = styled(Layout)`
  min-height: 100vh;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledSidebar = styled.aside`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const SidebarHeader = styled.div`
  padding: 24px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const LogoText = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.8px;
  font-family: "Inter", "Segoe UI", sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 1px;
    opacity: 0.8;
  }
`;

const CollapsedLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CollapsedLogo = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledNav = styled.nav`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  &.active {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
    color: #667eea;
    font-weight: 600;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StyledMainLayout = styled(Layout)`
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledHeader = styled.header`
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 20;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  position: relative;
  transition: all 0.3s ease;
`;

const StyledInput = styled(Input)`
  padding-left: 40px;
  width: 280px;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  background: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NotificationButton = styled(Button)`
  position: relative;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationBadge = styled(Badge)`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;
  animation: pulse 2s infinite;
`;

const UserMenuButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const StyledContent = styled(Content)`
  margin: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-height: 280px;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border-top: 1px solid #e8e8e8;
  color: #666;
  font-weight: 500;
`;

const DashboardLayout = ({ children, role = "parent" }) => {
  const user = useSelector((state) => state.userinfo.userProfile);
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
      setIsSearchOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = useCallback(
    debounce((value) => {
      console.log("Searching:", value);
    }, 500),
    []
  );

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen) setSearchQuery("");
  };

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
  };

  // Role-specific menu items
  const getMenuItems = () => {
    switch (role) {
      case "admin":
        return [
          {
            key: "home",
            icon: <HomeOutlined />,
            label: "Home",
            href: "/admin",
          },
          {
            key: "students",
            icon: <TeamOutlined />,
            label: "Students",
            href: "/admin/students",
          },
          {
            key: "unapproved",
            icon: <ExclamationCircleOutlined />,
            label: "Unapproved Students",
            href: "/admin/unapproved",
          },
          {
            key: "parents",
            icon: <UserOutlined />,
            label: "Parents",
            href: "/admin/parents",
          },
          {
            key: "teachers",
            icon: <TeamOutlined />,
            label: "Teachers",
            href: "/admin/teachers",
          },
          {
            key: "archive",
            icon: <TeamOutlined />,
            label: "Archive",
            href: "/admin/archive",
          },
          {
            key: "groups",
            icon: <Group />,
            label: "Groups",
            href: "/admin/groups",
          },
          {
            key: "modules",
            icon: <BookOutlined />,
            label: "Modules",
            href: "/admin/modules",
          },
          {
            key: "schedule",
            icon: <CalendarOutlined />,
            label: "Schedule",
            href: "/admin/schedule",
          },
          {
            key: "payments",
            icon: <CreditCardOutlined />,
            label: "Payments",
            href: "/admin/payments",
          },
        ];
      case "teacher":
        return [
          {
            key: "home",
            icon: <HomeOutlined />,
            label: "Home",
            href: "/teacher",
          },
          {
            key: "chat-parents",
            icon: <TeamOutlined />,
            label: "Chat with Parents",
            href: "/teacher/chatparent",
          },
          {
            key: "chat-students",
            icon: <TeamOutlined />,
            label: "Chat with Students",
            href: "/teacher/chatstudent",
          },
          {
            key: "schedule",
            icon: <CalendarOutlined />,
            label: "Schedule & Attendance",
            href: "/teacher/schedule",
          },
          {
            key: "marks",
            icon: <Notebook />,
            label: "Add Marks",
            href: "/teacher/marks",
          },
          {
            key: "profile",
            icon: <User />,
            label: "Profile",
            href: "/teacher/profile",
          },
        ];
      case "student":
        return [
          {
            key: "home",
            icon: <HomeOutlined />,
            label: "Home",
            href: "/student",
          },
          {
            key: "schedule",
            icon: <CalendarOutlined />,
            label: "Schedule",
            href: "/student/schedule",
          },
          {
            key: "profile",
            icon: <User />,
            label: "Profile",
            href: "/student/profile",
          },
        ];
      default: // parent
        return [
          {
            key: "home",
            icon: <HomeOutlined />,
            label: "Home",
            href: "/parent",
          },
          {
            key: "sons",
            icon: <TeamOutlined />,
            label: "Sons",
            href: "/parent/sons",
          },
          {
            key: "chat",
            icon: <TeamOutlined />,
            label: "Chat",
            href: "/parent/chat",
          },
          {
            key: "schedule",
            icon: <CalendarOutlined />,
            label: "Sons Schedule",
            href: "/parent/schedule",
          },
          {
            key: "payments",
            icon: <Notebook />,
            label: "Payments",
            href: "/parent/payments",
          },
          {
            key: "profile",
            icon: <User />,
            label: "Profile",
            href: "/parent/parentProfile/1",
          },
          {
            key: "addchild",
            icon: <UserOutlined />,
            label: "Add Child",
            href: "/parent/addchild",
          },
        ];
    }
  };

  // Role-specific user display name
  const getUserDisplayName = () => {
    if (!user) return role.charAt(0).toUpperCase() + role.slice(1);

    switch (role) {
      case "admin":
        return user.first_name || "Admin";
      case "teacher":
        return user.first_name || "Teacher";
      case "student":
        return user.first_name || "Student";
      default: // parent
        return user.first_name || "Parent";
    }
  };

  // Role-specific search placeholder
  const getSearchPlaceholder = () => {
    switch (role) {
      case "admin":
        return "Search students, teachers, parents...";
      case "teacher":
        return "Search students, assignments...";
      case "student":
        return "Search assignments, grades...";
      default: // parent
        return "Search children, assignments...";
    }
  };

  const menuItems = getMenuItems();

  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <User className="w-4 h-4" />,
      action: () => console.log("Profile clicked"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      action: () => console.log("Settings clicked"),
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogOut className="w-4 h-4" />,
      action: () => {
        localStorage.clear();
        router.push("/");
      },
    },
  ];

  const getSelectedKey = () => {
    if (pathname === `/${role}`) return "home";
    return pathname.split("/").pop() || "home";
  };

  return (
    <StyledLayout>
      <StyledSidebar
        className={`${collapsed ? "w-16" : "w-64"} fixed h-full z-10`}
      >
        <SidebarHeader>
          {!collapsed && (
            <LogoContainer>
              <LogoIcon>
                <GraduationCap size={20} color="#ffffff" />
              </LogoIcon>
              <LogoText>Dirassati</LogoText>
            </LogoContainer>
          )}
          {collapsed && (
            <CollapsedLogoContainer>
              <CollapsedLogo>D</CollapsedLogo>
            </CollapsedLogoContainer>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-white/20 rounded-lg"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </SidebarHeader>
        <StyledNav>
          {menuItems.map((item) => (
            <Link key={item.key} href={item.href}>
              <NavButton
                variant="ghost"
                className={getSelectedKey() === item.key ? "active" : ""}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </NavButton>
            </Link>
          ))}
        </StyledNav>
      </StyledSidebar>

      <StyledMainLayout className={`${collapsed ? "ml-16" : "ml-64"}`}>
        <StyledHeader>
          <HeaderContent>
            <div className="flex items-center gap-4">
              {isSearchOpen ? (
                <SearchContainer>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <StyledInput
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    placeholder={getSearchPlaceholder()}
                  />
                </SearchContainer>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>
            <HeaderActions>
              <NotificationButton
                variant="ghost"
                size="icon"
                onClick={handleNotificationClick}
                className="text-gray-600 hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                <NotificationBadge content="5" />
              </NotificationButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <UserMenuButton variant="ghost" className="text-gray-700">
                    <Avatar className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium">
                      {getUserDisplayName()}
                    </span>
                  </UserMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 bg-white border border-gray-200 text-gray-700 shadow-lg rounded-lg"
                  align="end"
                >
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.key}
                      onClick={item.action}
                      className="flex items-center gap-2 hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200 px-3 py-2"
                    >
                      {item.icon}
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </HeaderActions>
          </HeaderContent>
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
        <StyledFooter>
          School Dashboard © {new Date().getFullYear()} Created by Your Team
        </StyledFooter>
      </StyledMainLayout>
    </StyledLayout>
  );
};

export default DashboardLayout;
