import {fireEvent, render, screen} from "@testing-library/react";
import NavBar from "@/components/navbar";


describe('NavBar', () => {
    test('renders without crashing', () => {
        render(<NavBar userId={1} />)
    });

    test('toggle nav bar icon works - user logged in', () => {
        render(<NavBar userId={1} />)
        const faIcon = screen.getByRole('button');
        fireEvent.click(faIcon)

        const links = screen.getAllByRole('link')
        expect(links).toHaveLength(6)
    });

    test('user not logged in', () => {
        render(<NavBar userId={null} />)
        const links = screen.getAllByRole('link')
        expect(links).toHaveLength(2)
    });

    test('user not logged in link hrefs correct', () => {
        render(<NavBar userId={null} />)
        const links = screen.getAllByRole('link');
        const hrefLinks = ['/', '/login']
        links.forEach(link => {
            expect(link).toHaveAttribute('href')
            const href = link.getAttribute('href')
            expect(hrefLinks).toContain(href)
        })
    })
});
