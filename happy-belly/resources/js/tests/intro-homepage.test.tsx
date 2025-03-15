import IntroHomepage from "@/components/intro-homepage";
import {render, screen} from "@testing-library/react";

describe('IntroHomepage', () => {
    test('renders without crashing', () => {
        render(<IntroHomepage />)
    });

   test('correct slogan and company name', () => {
       render(<IntroHomepage />)
       expect(screen.getByText('Eat Better, Feel Better!')).toBeInTheDocument();
       expect(screen.getByText('Happy Belly')).toBeInTheDocument();
   });

   test('correct font', () => {
      const { container } = render(<IntroHomepage />)
      const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('font-main-fredoka')
   });

   test('slogan styling', () => {
       const { container } = render(<IntroHomepage />)
       const image = container.querySelector('img')
       expect(screen.getByText('Eat Better, Feel Better!')).toHaveClass('bg-primary-color/30')
       expect(image).toHaveClass('absolute opacity-10')
       expect(image).toHaveAttribute('src', '/images/geometric-bg-one-1000x1000.png')
       expect(image).toHaveAttribute('alt', '')
   });

   test("all text elements are accessible", () => {
       render(<IntroHomepage />);

        expect(screen.getByText("Eat Better, Feel Better!")).toBeInTheDocument();
        expect(screen.getByText("Happy Belly", { exact: false })).toBeInTheDocument();
        expect(screen.getByText(/personalised recipes/i)).toBeInTheDocument();
    });

});
