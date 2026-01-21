import { render, screen } from "@testing-library/react"
import { Nav } from "@/components/nav"
import "@testing-library/jest-dom"

// Mock usePathname
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("Nav Component", () => {
  it("renders all navigation links", () => {
    render(<Nav />)

    // Check for the logo/home link
    expect(screen.getByText("DEV_AVANT_GARDE")).toBeInTheDocument()
    
    // Check for navigation links
    expect(screen.getByText("作品")).toBeInTheDocument() // Work
    expect(screen.getByText("关于")).toBeInTheDocument() // About
    expect(screen.getByText("博客")).toBeInTheDocument() // Blog
    expect(screen.getByText("实验室")).toBeInTheDocument() // Lab
    expect(screen.getByText("联系")).toBeInTheDocument() // Contact
  })

  it("renders the command palette trigger", () => {
    render(<Nav />)
    expect(screen.getByRole("button", { name: /cmd\+k/i })).toBeInTheDocument()
  })
})
