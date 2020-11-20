import Layout from '../components/Layout/index';
import '../styles/main.scss';

function MyApp({ Component, pageProps }) {
	const layoutName = Component.layout || 'default';
	
	return (
		<Layout name={layoutName}>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
