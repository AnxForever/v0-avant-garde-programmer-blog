import { render, screen } from "@testing-library/react"
import { Nav } from "@/components/nav"
import "@testing-library/jest-dom"
import jest from "jest"

// Mock usePathname
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("Nav Component", () => {
  it("renders all navigation links", () => {
    render(<Nav />)

    expect(screen.getByText("首页")).toBeInTheDocument() // Home
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
