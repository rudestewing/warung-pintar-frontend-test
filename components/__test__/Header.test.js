import { render } from '@testing-library/react'
import Header from '../Header';

test('render without crash ', async () => {
    render(<Header />);
});