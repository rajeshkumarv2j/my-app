import Counter from "./Counter"
import {render, screen} from '@testing-library/react'

test("mount counter", () => {
    render(<Counter count={(5)}/>)
    const text = screen.getByText(/Count:\s*5/);
    expect(text).toBeInTheDocument();
})