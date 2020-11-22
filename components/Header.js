import Link from 'next/link';

export default function Header() {
    return (
        <div className="bg-white shadow-md text-center flex items-center justify-center" style={{height: '60px'}}>
            <Link href="/">
                <a className="inline-block">
                    <img src="/pokeball-logo.png" alt="" className="h-10 w-10"/>
                </a>
            </Link>
        </div>
    )
}