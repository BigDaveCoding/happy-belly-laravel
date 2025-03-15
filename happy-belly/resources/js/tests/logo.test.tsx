import Logo from "@/components/logo";
import {render, screen} from "@testing-library/react";

describe('Logo', (): void => {
    test('displays correctly', (): void => {
        render(<Logo />)
        expect(screen.getByRole('img')).toBeInTheDocument()
        expect(screen.getByText('HAPPY')).toBeInTheDocument()
        expect(screen.getByText('BELLY')).toBeInTheDocument()
    });

    test('correct fonts', (): void => {
        render(<Logo />)
        expect(screen.getByText('HAPPY')).toHaveClass('font-main-noto')
        expect(screen.getByText('BELLY')).toHaveClass('font-main-fredoka')
    });

    test('correct image path in src', () => {
       render(<Logo />)
       expect(screen.getByRole('img')).toHaveAttribute('src', '/images/logo-avocado-500x300.png')
    });

    test('image contains correct alt text', () => {
       render(<Logo />)
       expect(screen.getByRole('img')).toHaveAttribute('alt', 'smiling avocado lying down pointing finger')
    });
});
