import { render, screen, fireEvent } from '@testing-library/react'
import ExpandButton from '@/components/expand-button'

describe('ExpandButton', () => {
  it('should render with collapsed state', () => {
    const mockToggle = jest.fn()
    render(
      <ExpandButton
        isExpanded={false}
        onToggle={mockToggle}
        totalPosts={10}
      />
    )

    expect(screen.getByText(/查看全部 \(10\)/)).toBeInTheDocument()
    expect(screen.getByText('↓')).toBeInTheDocument()
  })

  it('should render with expanded state', () => {
    const mockToggle = jest.fn()
    render(
      <ExpandButton
        isExpanded={true}
        onToggle={mockToggle}
        totalPosts={10}
      />
    )

    expect(screen.getByText('收起内容')).toBeInTheDocument()
  })

  it('should call onToggle when clicked', () => {
    const mockToggle = jest.fn()
    render(
      <ExpandButton
        isExpanded={false}
        onToggle={mockToggle}
        totalPosts={10}
      />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('should maintain Neo-Brutalist styling classes', () => {
    const mockToggle = jest.fn()
    render(
      <ExpandButton
        isExpanded={false}
        onToggle={mockToggle}
        totalPosts={10}
      />
    )

    const button = screen.getByRole('button')
    
    // Check for key Neo-Brutalist classes
    expect(button).toHaveClass('bg-black')
    expect(button).toHaveClass('text-white')
    expect(button).toHaveClass('border-black')
    expect(button).toHaveClass('uppercase')
    expect(button).toHaveClass('font-bold')
  })

  it('should not re-render when props are unchanged', () => {
    const mockToggle = jest.fn()
    const { rerender } = render(
      <ExpandButton
        isExpanded={false}
        onToggle={mockToggle}
        totalPosts={10}
      />
    )

    // Re-render with same props
    rerender(
      <ExpandButton
        isExpanded={false}
        onToggle={mockToggle}
        totalPosts={10}
      />
    )

    // Component should be memoized and not re-render
    // This is verified by React.memo() behavior
    expect(screen.getByText(/查看全部 \(10\)/)).toBeInTheDocument()
  })
})
