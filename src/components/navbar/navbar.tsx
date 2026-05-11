"use client"

import * as React from "react"
import { useRef } from "react"
import { useNavigate } from "react-router"
import { useTheme } from "@/contexts/ThemeContext"

// Components
import { Button } from "@/components/ui/button"
import { NavbarActions } from "@/components/navbar/NavbarActions"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

// Simple logo component for the navbar
const Logo = () => {
  return (
    <svg 
      aria-label="Logo"
      role="img"
      fill="none" 
      height="1.5em"
      viewBox="0 0 400.00 400.00" 
      xmlns="http://www.w3.org/2000/svg" 
      transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.8" />
      <g id="SVGRepo_iconCarrier"> 
        <path 
          d="M80.6217 59.1676C116.502 55.4997 339 45.6991 339 63.5823C339 150.887 351.127 311.5 339 325.495C319.5 348 89.0019 353 73.6589 338.949C58.6562 325.21 64.7292 157.8 64.7292 103.154" 
          stroke="#000000" 
          strokeOpacity="0.9" 
          strokeWidth="40" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="dark:stroke-white"
        /> 
      </g>
    </svg>
  )
}

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    aria-label="Menu"
    className={cn("pointer-events-none", className)}
    fill="none"
    height={16}
    role="img"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <path
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
      d="M4 12L20 12"
    />
    <path
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
      d="M4 12H20"
    />
    <path
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
      d="M4 12H20"
    />
  </svg>
)

// Types
export interface NavbarNavLink {
  href: string
  label: string
  active?: boolean
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  logoHref?: string
  navigationLinks?: NavbarNavLink[]
  signInText?: string
  signInHref?: string
  ctaText?: string
  ctaHref?: string
}

// Default navigation links
const defaultNavigationLinks: NavbarNavLink[] = [
  { href: "#", label: "Home", active: true },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
]

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "/",
      navigationLinks = defaultNavigationLinks,
      signInText = "Log In",
      ctaText = "Sign Up",
      ...props
    },
    ref,
  ) => {
    // const [isMobile, setIsMobile] = useState(false)
    const { darkMode, setDarkMode } = useTheme();
    const containerRef = useRef<HTMLElement>(null)
    const navigate = useNavigate()

    const onLogoClick = () => navigate(logoHref)

    // useEffect(() => {
    //   const checkWidth = () => {
    //     if (containerRef.current) {
    //       const width = containerRef.current.offsetWidth
    //       setIsMobile(width < 768) // 768px is md breakpoint
    //     }
    //   }

    //   checkWidth()

    //   const resizeObserver = new ResizeObserver(checkWidth)
    //   if (containerRef.current) {
    //     resizeObserver.observe(containerRef.current)
    //   }

    //   return () => {
    //     resizeObserver.disconnect()
    //   }
    // }, [])

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref],
    )

    return (
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className,
        )}
        ref={combinedRef}
        {...(props as any)}
      >
        <div className="container mx-auto flex h-18 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            {/* {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    size="icon"
                    variant="ghost"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem className="w-full" key={index}>
                          <button
                            type="button"
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                              link.active
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80",
                            )}
                            onClick={e => e.preventDefault()}
                          >
                            {link.label}
                          </button>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )} */}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                onClick={() => onLogoClick()}
              >
                <div className="text-2xl">{logo}</div>
                <span className="hidden font-bold text-2xl sm:inline-block">Rada.</span>
              </button>
              {/* Navigation menu
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <button
                          type="button"
                          className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                            link.active
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80 hover:text-foreground",
                          )}
                          onClick={e => e.preventDefault()}
                        >
                          {link.label}
                        </button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )} */}
            </div>
          </div>
          {/* Right side */}
            <div className="flex items-center gap-2">
              <Button
                className="font-medium h-10 w-10 hover:bg-accent hover:text-accent-foreground duration-100"
                variant="ghost"
                onClick={() => {
                  setDarkMode(!darkMode);
                }}>
                { darkMode ? (
                  <Moon strokeWidth={2} size={24} />
                ) : (
                  <Sun strokeWidth={2} size={24} />
                )}
              </Button>
              <NavbarActions signInText={signInText} ctaText={ctaText} />
            </div>
        </div>
      </header>
    )
  },
)

Navbar.displayName = "Navbar"

export { Logo, HamburgerIcon }
