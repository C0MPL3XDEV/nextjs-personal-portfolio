
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HeroSection from '@/app/(home)/components/HeroSection'

// Mock interactions or specific next/link behavior if needed
jest.mock("next/link", () => {
    return ({ children }: { children: React.ReactNode }) => {
        return children;
    }
});

describe('HeroSection', () => {
    it('renders the main heading', () => {
        render(<HeroSection />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/Building digital/i)
    })

    it('renders the contact button', () => {
        render(<HeroSection />)

        const button = screen.getByText(/Contact Me/i)
        expect(button).toBeInTheDocument()
    })
})
